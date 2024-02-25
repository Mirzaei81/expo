import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
// import { Camera } from 'expo-camera';
import * as ImagePicker from "expo-image-picker";
import Spinner from "react-native-loading-spinner-overlay";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";
import { styled } from "nativewind";
import "../../assets/styles.css";
const StyledView = styled(View);

export default function TabTwoScreen() {
  // const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  // const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const [resized, setResized] = useState(false);

  const PureCanvas = React.forwardRef((props, ref) => (
    <canvas width={imageWidth} height={imageHeight} ref={ref} />
  ));
  const canvasRef = useRef();
  const router = useRouter();

  useEffect(() => {
    if (!image)
      return () => {
        console.log("no image");
      };
    const ctx = canvasRef.current.getContext("2d");
    //console.log(ctx);
    var img = new window.Image();
    if (resized) {
      img.onload = function () {
        canvasRef.current.width = imageWidth;
        canvasRef.current.height = imageHeight;
        ctx.drawImage(this, 0, 0, imageWidth, imageHeight);
        setImage(null);
        router.push({
          pathname: "intent",
          params: { id: image, width: imageWidth, height: imageHeight },
        });
        //upload();
      };
    } else {
      img.onload = function () {
        let newImageWidth = imageWidth;
        let newImageHeight = imageHeight;
        let ratio = 1;
        if (imageWidth > imageHeight) ratio = 500 / imageWidth;
        if (imageWidth <= imageHeight) ratio = 500 / imageHeight;

        newImageHeight = imageHeight * ratio;
        newImageWidth = imageWidth * ratio;

        canvasRef.current.width = newImageWidth;
        canvasRef.current.height = newImageHeight;
        setImageWidth(newImageWidth);
        setImageHeight(newImageHeight);
        ctx.drawImage(this, 0, 0, newImageWidth, newImageHeight);
        setImage(canvasRef.current.toDataURL("image/png"));
        setResized(true);
      };
    }
    img.src = image;
    return () => {};
  }, [image]);

  useEffect(() => {
    (async () => {
      // const  cameraStatus  = await Camera.requestCameraPermissionsAsync();
      // setHasCameraPermission(cameraStatus.status === 'granted');
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
      //setHasGalleryPermission(True);
    })();
  }, []);
  // const takePicture = async () => {
  //     if(camera){
  //       const data = await camera.takePictureAsync(null);
  //       //console.log(data.uri)
  //       setImage(data.uri)

  //     }
  //   }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      base64: true,
    });
    //console.log(result.assets[0].uri);
    setImage(result.assets[0].uri);
    setImageWidth(result.assets[0].width);
    setImageHeight(result.assets[0].height);
  };

  const startOver = () => {
    return (
      <StyledView className="items-center">
        <Link href="https://websearch-via-camera.com" asChild>
          <Pressable className="w-2/3 mt-5 mb-5 p-4 bg-blue-500 hover:bg-blue-700 text-white rounded-full font-bold py-2 px-4 inline-flex items-center">
            <Text className="text-white">Start Over</Text>
          </Pressable>
        </Link>
      </StyledView>
    );
  };

  if (hasGalleryPermission === false) {
    return (
      <View>
        <Text style={{ padding: 20 }}>No access to photo gallery. </Text>
        {startOver()}
      </View>
    );
  }

  // if (hasCameraPermission === false || hasGalleryPermission === false) {
  //     return <View ><Text style={{padding:20}}>No access to camera. </Text><TouchableOpacity href="https://websearch-via-camera.com"><Button title="Start over"></Button></TouchableOpacity></View>;
  // }

  const presetImage = (height) => {
    if (height == 750) {
      router.push({
        pathname: "intent",
        params: {
          queries: [
            "Avocado toast recipe",
            "How to make avocado spread for bread",
            "Healthy breakfast ideas",
            "Egg and avocado toast",
            "Avocado toast with boiled eggs",
            "Simple avocado breakfast",
            "Vegetarian breakfast recipes",
            "Avocado and tomato on toast",
            "Avocado toast variations",
            "Nutritious breakfast with avocado and eggs",
          ],
          queriesTwo: [
            "Slices of bread with avocado spread",
            "A half of an avocado with the pit still inside",
            "Two halves of a boiled egg with pepper sprinkled on top",
            "Fresh cherry tomatoes",
            "Wooden cutting board",
            "Sprinkle of pepper and spices around the board",
            "Sprigs of dill",
          ],
        },
      });
    }
    if (height == 281) {
      router.push({
        pathname: "intent",
        params: {
          queries: [
            "Sea otter with pup",
            "Mother sea otter with baby",
            "Sea otter habitat and lifestyle",
            "Cute sea otter family",
            "Sea otter conservation status",
          ],
          queriesTwo: [
            "An adult sea otter",
            "A baby sea otter",
            "Water with ripples",
          ],
        },
      });
    }
    if (height == 306) {
      router.push({
        pathname: "intent",
        params: {
          queries: [
            "Ten Commandments in the Bible",
            "Bible verses about not killing",
            "Thou shalt not steal verse",
            "Exodus 20 commandments text",
            "Biblical text Thou shalt not bear false witness",
            "Scripture on not committing adultery",
            "Holy Bible commandments passage",
            "Christian ethical teachings in Bible",
            "Old Testament rules and commandments",
            "Decalogue text in Christianity",
          ],
          queriesTwo: [
            "A printed page from bible.",
            "Text, specifically what appears to be a numbered list of the Ten Commandments from the Bible.",
          ],
        },
      });
    }
  };

  return (
    <ScrollView
      horizontal={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}
    >
      {!image && (
        <View
          style={{ marginLeft: 10, marginRight: 10, alignItems: "center" }}
          className="mt-7"
        >
          <Pressable
            onPress={() => pickImage()}
            className="w-2/3 bg-blue-500 hover:bg-blue-700 text-white rounded-full font-bold py-2 px-4 inline-flex items-center"
          >
            <Text className="text-white">Pick An Image From Gallery</Text>
          </Pressable>

          <Text style={{ margin: "auto", padding: 20 }} className="text-2xl">
            Pick an image from the gallery or try one of these:
          </Text>
          <ScrollView>
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={() => presetImage(281)}
            >
              <Image
                style={{
                  margin: "auto",
                  width: 500,
                  height: 281,
                  maxWidth: "100%",
                  maxHeight: 281,
                }}
                source={{
                  uri:
                    "https://websearch-via-camera.com/camera/bcubjmsofu123pvzdyjn.jpeg",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={() => presetImage(306)}
            >
              <Image
                style={{
                  margin: "auto",
                  width: 500,
                  height: 306,
                  maxWidth: "100%",
                  maxHeight: 306,
                }}
                source={{
                  uri:
                    "https://websearch-via-camera.com/camera/ebj8nlazyhgz3ucs6e6n.jpeg",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={() => presetImage(750)}
            >
              <Image
                style={{
                  margin: "auto",
                  width: 500,
                  height: 750,
                  maxWidth: "100%",
                  maxHeight: 750,
                }}
                source={{
                  uri:
                    "https://websearch-via-camera.com/camera/mlkua19iskzugi1u27ch.jpeg",
                }}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
      {image && <PureCanvas ref={canvasRef} />}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
  },
  button: {
    flex: 1,
  },
});
