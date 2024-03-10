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
import { useRouter } from "expo-router";
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
          pathname: "Select",
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
    if (height == 667) {
      router.push({
        pathname: "Select",
        params: {
          queries: [
            "Candy%20aisle%20in%20a%20grocery%20store",
            "%20candy%20brands",
            "American%20candy%20selection",
            "International%20candies%20in%20a%20store",
            "Variety%20of%20sweets%20in%20retail",
            "Sweet%20snacks%20available%20for%20purchase",
          ],
          queriesTwo: [
            "Reese%27s%20Peanut%20Butter%20Cups",
            "Two%20jars%20of%20Jif%20Peanut%20Butter",
            "A%20pack%20of%20Mike%20and%20Ike",
            "Hostess%20Twinkies",
            "Tootsie%20Roll",
            "Pop-Tarts%20in%20multiple%20flavors",
            "Almond%20Joy",
            "Junior%20Mints",
            "Packs%20of%20Spree%20candy",
          ],
          queriesThree: [
            "Bottled%20beverages%20%28Various%20flavors%29",
            "Reese%27s%20Peanut%20Butter%20Cups",
            "Reese%27s%20Pieces",
            "Jif%20Peanut%20Butter",
            "Marshmallow%20fluff%20spread",
            "Nerds%20Candy%20%28Various%20flavors%29",
            "Mike%20and%20Ike%20Candy",
            "Chocolate%20bars%20%28Various%20brands%29",
            "Tootsie%20Roll",
            "Pop-Tarts",
            "Herr%27s%20flavored%20snacks",
          ],
          queriesFour: [
            "Snack%20Haven",
            "The%20Treat%20Treasury",
            "Confection%20Collection",
            "Sweets%20and%20Sips%20Emporium",
            "Candy%20Lane%20Pantry",
            "Munchables%20Market",
            "Gourmet%20Goodies%20Gallery",
            "Nibbles%20and%20Nectar%20Nook",
            "Choco-Corner",
            "The%20Sugar%20Shelf",
            "Delightful%20Bites%20Boutique",
            "Flavor%20Fest%20Fiesta",
            "Luscious%20Layers%20Alcove",
            "Craving%20Curator",
            "Yummy%20Yard",
            "Sugar%20Rush%20Shelves",
            "Delectable%20Delights%20Display",
            "Munchie%20Maze",
            "The%20Happiness%20Hub",
          ],
        },
      });
    }
    if (height == 750) {
      router.push({
        pathname: "Select",
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
            "Springs of dill",
          ],
          queriesFour: [
            "%22Avocado%20Toast%20Elegance%22",
            "%22Morning%20Delight%20with%20Avocado%22",
            "%22Brunch%20Bliss%20Board%22",
            "%22Avocado%20Symphony%20with%20a%20Side%20of%20Eggs%22",
            "%22Garden%20Fresh%20Avocado%20Encounter%22",
            "%22The%20Avo-Egg%20Toast%20Experience%22",
            "%22Rustic%20Avocado%20Charm%22",
            "%22Sunny%20Avocado%20Creation%22",
            "%22Tomato-Topped%20Avocado%20Dreams%22",
            "%22The%20Green%20Smash%20Delicacy%22",
            "%22Pepper-Sprinkled%20Avocado%20Rhapsody%22",
            "%22Egg%20%26%20Avocado%20Artistry%22",
            "%22Fresh%20Fare%20on%20Wooden%20Flair%22",
            "%22Avocado%20Toast%20Temptations%22",
            "%22Wholesome%20Avo-Toast%20Indulgence%22",
            "%22The%20Avocado%20Brunch%20Palette%22",
            "%22Cherry%20Tomato%20Kissed%20Avocado%22",
            "%22Hearty%20Avocado%20%26%20Egg%20Canvas%22",
            "%22A%20Sprinkle%20of%20Delight%20with%20Avocado%22",
            "%22From%20the%20Kitchen%20Garden%3A%20Avocado%20%26%20Egg%20Toast%22",
          ],
        },
      });
    }
    if (height == 281) {
      router.push({
        pathname: "Select",
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
          queriesFour: [
            "Tranquil%20Waters%3A%20The%20Otter%20Embrace",
            "Whiskered%20Lullaby",
            "The%20Floating%20Snuggle",
            "Aquatic%20Affection",
            "Sea%20Otter%20Serenity",
            "Nautical%20Naptime",
            "Marine%20Maternity",
            "Harbor%20Hug",
            "Otters%27%20Oasis",
            "The%20Fur-Floater%20Duo%20",
            "Kelp%20Cradle%20Lullaby",
            "Buoyant%20Bonding",
            "Curled%20in%20Comfort",
            "The%20Cozy%20Current",
            "Tender%20Tides",
            "Saltwater%20Siesta",
            "Algae%20Ascot%20Slumber",
            "Gentle%20Gaze%20upon%20the%20Waves",
            "Otterly%20Adorable",
          ],
        },
      });
    }
    if (height == 306) {
      router.push({
        pathname: "Select",
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
          queriesFive: ["The Bible"],
        },
      });
    }
    if (height == 500) {
      router.push({
        pathname: "Select",
        params: {
          queries: [
            "Interior%20design%20book%20display",
            "Minimalist%20book%20arrangement",
            "Inspirational%20book%20titles",
            "Modern%20book%20cover%20designs",
            "Book%20photography%20ideas",
            "White%20and%20blue%20color%20scheme%20in%20decor",
          ],
          queriesTwo: [
            "Three%20books%20stacked%20on%20top%20of%20each%20other.",
            "A%20portion%20of%20a%20blue%20wall%20in%20the%20background.",
            "A%20white%20tabletop%20or%20shelf%20on%20which%20the%20books%20are%20placed.",
            "A%20part%20of%20a%20decorative%20object%20to%20the%20left%20of%20the%20books%2C%20which%20appears%20to%20be%20a%20glass%20or%20transparent%20lamp%20with%20a%20spherical%20section%20visible.",
          ],
          queriesThree: [
            "%22Less%20is%20More%22%20by%20Ludwig%20Mies%20van%20der%20Rohe",
            "%22Be%20True.%20Be%20You.%22",
          ],
          queriesFour: [
            "%22The%20Minimalist%20Motto%22",
            "%22Simplicity%20and%20Self%22",
            "%22Promises%20on%20the%20Shelf%22",
            "%22Essence%20of%20Identity%22",
            "%22A%20Trio%20of%20Truths%22",
            "%22Decluttering%20the%20Soul%22",
            "%22Chapters%20of%20Clarity%22",
            "%22Narratives%20of%20Nuance%22",
            "%22Books%20of%20Being%22",
            "%22Lifelong%20Learning%20Stack%22",
            "%22The%20Subtle%20Art%20of%20Being%22",
            "%22Literary%20Layers%20of%20Self%22",
            "%22Stacked%20Wisdom%22",
            "%22White%20Spine%20Wisdom%22",
          ],
          queriesFive: [
            "%22Less%20Is%20More%22",
            "%22Be%20True.%20Be%20You.%22",
            "%22Promise%20To%20Keep%22",
          ],
        },
      });
    }
  };

  return (
    <ScrollView
      horizontal={false}
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white flex-1 content-center"
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
            <Text className="text-white">Pick A Picture From Gallery</Text>
          </Pressable>

          <Text style={{ margin: "auto", padding: 20 }} className="text-2xl">
            Pick a picture from the gallery or try one of these:
          </Text>
          <ScrollView>
            <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
              <TouchableOpacity
                className="w-1/2"
                onPress={() => presetImage(667)}
              >
                <Image
                  className="w-64 h-full	"
                  source={{
                    uri: "https://websearch-via-camera.com/camera/store.jpeg",
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                className="w-1/2"
                onPress={() => presetImage(750)}
              >
                <Image
                  className="w-64 h-96"
                  source={{
                    uri:
                      "https://websearch-via-camera.com/camera/mlkua19iskzugi1u27ch.jpeg",
                  }}
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
                source={{
                  uri:
                    "https://websearch-via-camera.com/camera/bcubjmsofu123pvzdyjn.jpeg",
                }}
              />
            </TouchableOpacity>

            <ScrollView horizontal={true} className="flex-row	 mb-1 ">
              <TouchableOpacity
                className="w-1/2"
                onPress={() => presetImage(500)}
              >
                <Image
                  className="w-64 h-64"
                  source={{
                    uri: "https://websearch-via-camera.com/camera/books.jpeg",
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                className="w-1/2"
                onPress={() => presetImage(306)}
              >
                <Image
                  className="w-64 h-64"
                  source={{
                    uri:
                      "https://websearch-via-camera.com/camera/ebj8nlazyhgz3ucs6e6n.jpeg",
                  }}
                />
              </TouchableOpacity>
            </ScrollView>
          </ScrollView>
        </View>
      )}
      {image && <PureCanvas ref={canvasRef} />}
    </ScrollView>
  );
}
