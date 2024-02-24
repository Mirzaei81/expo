import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
// import { Camera } from 'expo-camera';
import * as ImagePicker from "expo-image-picker";
import Spinner from "react-native-loading-spinner-overlay";
import { FlashList } from "@shopify/flash-list";
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
  const [statusMessage, setStatusMessage] = useState(
    "Your picture is being uploaded now and then GPT will take a minute or two. Please wait!"
  );
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  // const [type, setType] = useState(Camera.Constants.Type.back);
  const [queries, setQueries] = useState(null);
  const [queriesTwo, setQueriesTwo] = useState(null);

  // Image.prefetch("https://res.cloudinary.com/doic0dzx7/image/upload/w_500/r_100/v1708130148/bcubjmsofu123pvzdyjn.jpg");

  function makeButton(data) {
    const websearch = "https://result.websearch-via-camera.com/en/".concat(
      data
    );
    return (
      // <TouchableOpacity
      //   style={{ marginTop: 20, marginBottom: 20 }}
      //   href={websearch}
      // >
      //   <Button title={data}></Button>
      // </TouchableOpacity>
      <Link href={websearch} asChild>
        <Pressable className="w-2/3 mt-5 mb-5 p-4 bg-blue-500 hover:bg-blue-700 text-white rounded-full font-bold py-2 px-4 inline-flex items-center">
          <Text className="text-white">{data}</Text>
        </Pressable>
      </Link>
    );
  }

  function _makeButton(item) {
    const websearch = "https://result.websearch-via-camera.com/en/".concat(
      item
    );
    return (
      <Link href={websearch} asChild>
        <Pressable className="w-2/3 mt-5 mb-5 p-4 bg-blue-500 hover:bg-blue-700 text-white rounded-full font-bold py-2 px-4 inline-flex items-center">
          <Text className="text-white">{item}</Text>
        </Pressable>
      </Link>
      // <TouchableOpacity
      //   style={{ marginTop: 20, marginBottom: 20 }}
      //   href={websearch}
      // >
      //   <Button title={item.item.value}></Button>
      // </TouchableOpacity>
    );
  }

  const PureCanvas = React.forwardRef((props, ref) => (
    <canvas width={imageWidth} height={imageHeight} ref={ref} />
  ));
  const canvasRef = useRef();

  useEffect(() => {
    if (!image) return () => {};
    const ctx = canvasRef.current.getContext("2d");

    var img = new window.Image();
    if (resized) {
      img.onload = function () {
        canvasRef.current.width = imageWidth;
        canvasRef.current.height = imageHeight;
        ctx.drawImage(this, 0, 0, imageWidth, imageHeight);
        upload();
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

  function upload() {
    // let resized = resize();
    const url = `https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doVision`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        base64: `${image}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // File uploaded successfully
        // console.log(data);
        setQueries(data);
        setSpinnerVisible(false);
      })
      .catch((error) => {
        setStatusMessage(
          "Error uploading this file. Try with a different image!"
        );
        setSpinnerVisible(false);
        console.error("Error uploading the file:", error);
      });

    const url2 = `https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doVision2`;

    fetch(url2, {
      method: "POST",
      body: JSON.stringify({
        base64: `${image}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // File uploaded successfully
        // console.log(data);
        setQueriesTwo(data);
        setSpinnerVisible(false);
      })
      .catch((error) => {
        setStatusMessage(
          "Error uploading this file. Try with a different image!"
        );
        setSpinnerVisible(false);
        console.error("Error uploading the file:", error);
      });
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    setImage(result.uri);
    setImageWidth(result.width);
    setImageHeight(result.height);
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
      setQueries([
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
      ]);
      setQueriesTwo([
        "Slices of bread with avocado spread",
        "A half of an avocado with the pit still inside",
        "Two halves of a boiled egg with pepper sprinkled on top",
        "Fresh cherry tomatoes",
        "Wooden cutting board",
        "Sprinkle of pepper and spices around the board",
        "Sprigs of dill",
      ]);
    }
    if (height == 281) {
      setQueries([
        "Sea otter with pup",
        "Mother sea otter with baby",
        "Sea otter habitat and lifestyle",
        "Cute sea otter family",
        "Sea otter conservation status",
      ]);
      setQueriesTwo([
        "An adult sea otter",
        "A baby sea otter (pup)",
        "Water with ripples",
      ]);
    }
    if (height == 306) {
      setQueries([
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
      ]);
      setQueriesTwo([
        "A printed page from bible.",
        "Text, specifically what appears to be a numbered list of the Ten Commandments from the Bible.",
      ]);
    }
  };

  return (
    <ScrollView
      horizontal={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}
    >
      {/* {!queries && !image && <Text style={{padding:20}}>GPT Vision can recognize general objects, scenes, colors, and shapes in the images. It can also answer questions about the content, context, and attributes of the images. For example, you can ask it what color a car is or what some ideas for dinner might be based on what is in your fridge.</Text>} */}
      {/* {!queries && !image && 
      <View style={{marginLeft:10, marginRight:10}}>
        <Button
        title="Flip Camera"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}>
      </Button>
      </View>
      } */}
      {/* {!queries && !image && <View style={{margin:10}}><Button title="Take Picture" onPress={() => takePicture()} /></View>} */}
      {!queries && !image && (
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

      {/* {!queries && !image && 
      <View style={styles.cameraContainer}>
        <Camera 
          ref={ref => setCamera(ref)} 
          style={styles.camera} 
          type={type} 
          ratio={'1:1'} 
        />
      </View>
      } */}

      {!queries && image && (
        <View>
          <Spinner visible={spinnerVisible} />
          <Text style={{ padding: 20 }}>{statusMessage} </Text>
          {startOver()}
          <PureCanvas ref={canvasRef} />
        </View>
      )}
      {/* {!queries && image && <Button title="Reset" onPress={() => removeImage()} />} */}
      {queries && queries.length > 0 && (
        <Text style={{ margin: "20px", fontSize: "large", fontWeight: "bold" }}>
          Search Intents:
        </Text>
      )}
      {queries && queries.length > 0 && (
        <StyledView className="items-center">
          {queries.map(_makeButton, this)}
        </StyledView>
      )}

      {queriesTwo && queriesTwo.length > 0 && (
        <Text style={{ margin: "20px", fontSize: "large", fontWeight: "bold" }}>
          Objects in the photo:
        </Text>
      )}
      {queriesTwo && queriesTwo.length > 0 && (
        <StyledView className="items-center">
          {queriesTwo.map(makeButton, this)}
        </StyledView>
      )}
      {(queriesTwo || queries) && (
        <Text style={{ margin: "20px", fontSize: "large", fontWeight: "bold" }}>
          Want to restart?
        </Text>
      )}
      {(queriesTwo || queries) && startOver()}
      {queries && queries.length == 0 && queriesTwo && queriesTwo.length == 0 && (
        <View>
          <Text style={{ padding: 20 }}>No results for this image. </Text>
          {startOver()}
        </View>
      )}
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
