import React, { useRef, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { styled } from "nativewind";
import "../../assets/styles.css";
import { ExternalLink } from "../../components/ExternalLink";
import * as Sentry from "@sentry/react-native";
import * as ImageManipulator from "expo-image-manipulator";

Sentry.init({
  dsn: "https://76a422d770ec8a00ccb6574759fde33a@o4507235509731328.ingest.us.sentry.io/4507237860507648",
});

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

export default function TabTwoScreen() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [isReadyToUpload, setIsReadyToUpload] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // const PureCanvas = React.forwardRef((props, ref) => (
  //   <canvas width={imageWidth} height={imageHeight} ref={ref} />
  // ));
  // const canvasRef = useRef();
  const router = useRouter();
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    fetch("https://photopulse.kxci.us/record_usage/", {
      method: "POST",
      body: JSON.stringify({
        interaction: `new_upload_a_picture_user`,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }, []);

  const handleSelectImages = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (pickerResult.canceled === true) {
      return;
    }

    setImages([...images, ...pickerResult.assets]);
    setIsReadyToUpload(true);
  };

  const handleUploadImages = async () => {
    if (!images || images.length === 0) {
      console.error("Images array is empty or undefined");
      return;
    }

    setIsUploading(true);

    const uploadPromises = images.map((image) => {
      const resize =
        image.width > image.height ? { width: 900 } : { height: 900 };
      return ImageManipulator.manipulateAsync(image.uri, [{ resize: resize }], {
        compress: 0.5,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      })
        .then(async (res) => {
          if (!res.uri) {
            console.error("Manipulated image URI is undefined");
            return;
          }

          const encodedImage = res.uri;
          return fetch("https://photopulse.kxci.us/upload_image/", {
            method: "POST",
            body: JSON.stringify({
              image: encodedImage,
              email: "",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .catch((error) => {
              console.error("Error uploading image:", error);
              setError("There was an error uploading your picture.");
              Sentry.captureException(error);
            });
        })
        .catch((error) => {
          console.error("Error manipulating image:", error);
        });
    });

    const results = await Promise.allSettled(uploadPromises);
    const imageUrls = results.reduce((urls, result) => {
      if (result.status === "fulfilled") {
        urls.push(result.value.image_uuid);
      } else {
        console.error("Image upload failed:", result.reason);
      }
      return urls;
    }, []);
    setIsUploading(false);

    console.log(imageUrls);
    router.push({
      pathname: `AI`,
      params: {
        json: JSON.stringify({ UUID: imageUrls[0] }),
      },
    });
  };

  const startOver = () => {
    return (
      <StyledView className="items-center">
        <Link href="https://search.kxci.us/upload_a_picture" asChild>
          <Pressable className="p-4 bg-purple-700 hover:bg-purple-900  text-white rounded-full font-bold py-2 px-4 inline-flex items-center">
            <Text className="m-4 text-white text-xl font-bold text-center">
              Start Over
            </Text>
          </Pressable>
        </Link>
      </StyledView>
    );
  };

  if (hasGalleryPermission === false) {
    return (
      <View>
        <Text style={{ padding: 20 }}>No access to photo gallery.</Text>
        {startOver()}
      </View>
    );
  }

  const presetImage = (height) => {
    if (height == 667) {
      router.push({
        pathname: "AI",
        params: {
          json: JSON.stringify({
            height: 667,
          }),
        },
      });
    }
    if (height == 750) {
      router.push({
        pathname: "AI",
        params: {
          json: JSON.stringify({
            height: 750,
          }),
        },
      });
    }
    if (height == 281) {
      router.push({
        pathname: `AI`,
        params: {
          json: JSON.stringify({
            height: 281,
          }),
        },
      });
    }
    if (height == 306) {
      router.push({
        pathname: "AI",
        params: {
          json: JSON.stringify({
            height: 306,
          }),
        },
      });
    }
    if (height == 500) {
      router.push({
        pathname: "AI",
        params: {
          json: JSON.stringify({
            height: 500,
          }),
        },
      });
    }
  };

  return (
    <StyledScrollView
      horizontal={false}
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white flex-1 content-center"
    >
      {
        <StyledView
          style={{
            marginLeft: 10,
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          className="mt-7"
        >
          <StyledView style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
              onPress={
                isReadyToUpload ? handleUploadImages : handleSelectImages
              }
              className=" mr-4 bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full inline-flex items-center"
            >
              <Text className="text-xl font-bold text-white p-6">
                {isReadyToUpload ? "Upload" : "Select a Picture"}
              </Text>
            </Pressable>

            {images && images.length !== 0 && (
              <TouchableOpacity
                onPress={() => {
                  setIsReadyToUpload(false);
                  setImages([]);
                  return false;
                }}
                className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full inline-flex items-center"
              >
                <Text className="text-xl font-bold text-white p-6">X</Text>
              </TouchableOpacity>
            )}
          </StyledView>

          {images && images.length !== 0 && (
            <Text className="text-lg text-center m-8">
              {images.length} {images.length === 1 ? "picture" : "pictures"}{" "}
              selected.{" "}{images.length === 1 ? "" : "Right now, we only support one picture, but we allow uploading multiple pictures. We will use the first picture you selected."}
            </Text>
          )}
          {isUploading && <ActivityIndicator size="small" color="purple" />}
        </StyledView>
      }

      {images && (
        <StyledScrollView>
          <StyledView className="items-center">
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.uri }}
                style={{
                  margin: 50,
                  width: Math.min(500, windowWidth - 40),
                  height:
                    (image.height / image.width) *
                    Math.min(500, windowWidth - 40),
                }}
              />
            ))}
          </StyledView>
        </StyledScrollView>
      )}

      {!isReadyToUpload && (
        <View style={{ marginLeft: 10, marginRight: 10, alignItems: "center" }}>
          <Text
            style={{ margin: "auto", padding: 20 }}
            className="text-2xl text-center"
          >
            Or check out one of these:
          </Text>

          <ScrollView>
            <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => presetImage(667)}
              >
                <Image
                  source={require('../../assets/images/store.webp')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => presetImage(750)}
              >
                <Image
                  source={require('../../assets/images/avocado-sandwich.jpg')}
                />
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity onPress={() => presetImage(281)}>
              <Image
                style={{
                  margin: "auto",
                  width: 500,
                  height: 281,
                  maxWidth: "100%",
                  maxHeight: 281,
                }}
                source={require('../../assets/images/otter-and-baby.webp')}
              />
            </TouchableOpacity>

            <ScrollView horizontal={true} className="flex-row	 mb-1 ">
              <TouchableOpacity
                onPress={() => presetImage(500)}
              >
                <Image
                  source={require('../../assets/images/books.jpg')}

                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => presetImage(306)}
              >
                <Image
                  source={require('../../assets/images/the-bible.webp')}
                />
              </TouchableOpacity>
            </ScrollView>
          </ScrollView>

          <ExternalLink href="https://search.kxci.us/privacy%20policy">
            <Pressable>
              <StyledText className="text-base font-bold text-blue-600 mt-8 mb-8">
                Privacy Policy
              </StyledText>
            </Pressable>
          </ExternalLink>
        </View>
      )}
      {error && (
        <StyledView className="m-4">
          <StyledText className="m-4 text-base text-center">{error}</StyledText>
          {startOver()}
        </StyledView>
      )}
      {!error && image && (
        <StyledView className="m-4">
          <ActivityIndicator size="large" color="#660099" />
        </StyledView>
      )}
    </StyledScrollView>
  );
}
