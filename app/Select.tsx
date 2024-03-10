import React, { useState, useRef, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import {
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { FlashList } from "@shopify/flash-list"; // Import FlashList
import { useRouter, useLocalSearchParams } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import { styled } from "nativewind";
import "../assets/styles.css";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

const productsList = [
  {
    id: "1",
    title: "Product A",
    price: "$12.99",
    image: "https://m.media-amazon.com/images/I/7164eFzyjrL._SL1338_.jpg",
    keywords: "the quran",
  },
  {
    id: "2",
    title: "Snapple Peach Tea",
    price: "$10.99",
    image: "https://m.media-amazon.com/images/I/81CjXZYTngL._SL1500_.jpg",
    keywords: "Bottled beverage",
    url: "https://amzn.to/42SmMyY",
  },
  {
    id: "3",
    title: "Ice Purple Variety Pack",
    price: "$10.43",
    image: "https://m.media-amazon.com/images/I/81BU+xe4jcL._SL1500_.jpg",
    keywords: "Bottled beverage",
    url: "https://amzn.to/3SOp0uy",
  },
  {
    id: "4",
    title: "Jif Creamy Peanut Butter",
    price: "$9.36",
    image: "https://m.media-amazon.com/images/I/71iTSdDUkOL._SL1500_.jpg",
    keywords: "Jif",
    url: "https://amzn.to/48FhKY0",
  },
  {
    id: "5",
    title: "REESE'S Milk Chocolate",
    price: "$9.07",
    image: "https://m.media-amazon.com/images/I/71IZF9dzcDL._SL1500_.jpg",
    keywords: "Peanut Butter Cups",
    url: "https://amzn.to/3uFXac2",
  },
  {
    id: "6",
    title: "REESE'S PIECES",
    price: "$15.48",
    image: "https://m.media-amazon.com/images/I/716Gw-VFhLL._SL1500_.jpg",
    keywords: "Reese",
    url: "https://amzn.to/48we7Dq",
  },
  {
    id: "7",
    title: "Marshmallow Fluff",
    price: "$6.10",
    image: "https://m.media-amazon.com/images/I/61guZpnkxvL._SL1500_.jpg",
    keywords: "Marshmallow",
    url: "https://amzn.to/3SM6xyM",
  },
  {
    id: "8",
    title: "Nerds Rope Candy",
    price: "$18.99",
    image: "https://m.media-amazon.com/images/I/81fSz3NwAbL._SL1500_.jpg",
    keywords: "Nerds",
    url: "https://amzn.to/3V0K1Ff",
  },
  {
    id: "9",
    title: "Assorted Fruit Original",
    price: "$6.65",
    image: "https://m.media-amazon.com/images/I/91tPzLAi9IL._SL1500_.jpg",
    keywords: "Mike",
    url: "https://amzn.to/49OKbUd",
  },
  {
    id: "10",
    title: "Assorted Milk Chocolate",
    price: "$19.12",
    image: "https://m.media-amazon.com/images/I/71RerViY9aL._SL1500_.jpg",
    keywords: "Chocolate",
    url: "https://amzn.to/3OWLyIt",
  },
  {
    id: "11",
    title: "Tootsie Roll",
    price: "$5.50",
    image: "https://m.media-amazon.com/images/I/61VKgfJJ4iL._SL1000_.jpg",
    keywords: "Tootsie",
    url: "https://amzn.to/48yWqTV",
  },
  {
    id: "12",
    title: "Pop Tarts Variety Pack",
    price: "$23.99",
    image: "https://m.media-amazon.com/images/I/91OKwCJoi6L._SL1500_.jpg",
    keywords: "Pop-Tarts",
    url: "https://amzn.to/42SwyRu",
  },
  {
    id: "13",
    title: "Herr's Potato Chips",
    price: "$11.99",
    image: "https://m.media-amazon.com/images/I/51oQY97OVuL.jpg",
    keywords: "Herr",
    url: "https://amzn.to/3SUFbGT",
  },
];

const getTabBarIcon = (props) => {
  const { route } = props;

  if (route.key === "general") {
    return <FontAwesome name="search" size={20} />;
  } else if (route.key === "specifics") {
    return <FontAwesome name="object-ungroup" size={20} />;
  } else {
    return <FontAwesome name="heart" size={20} />;
  }
};

function product(query) {
  let listOfProductsWQuery = [];
  for (const product of productsList) {
    const keys = product.keywords.split(",");
    for (const key of keys) {
      if (query.includes(key)) {
        listOfProductsWQuery.push(product);
        continue;
      }
    }
  }
  const productsSet = new Set(listOfProductsWQuery);
  return [...productsSet];
}

const ProductRow = ({ item }) => {
  return (
    <View className="m-5 flex-row items-center">
      <Pressable>
        <Link href={item.url} asChild>
          <Image source={item.image} className="w-24 h-28 rounded-md mr-4" />
        </Link>
      </Pressable>
      <View>
        <Text className="text-lg font-semibold mb-2">{item.title}</Text>
        <Text className="text-gray-600">{item.price}</Text>
      </View>
    </View>
  );
};

export default function Intent() {
  const [noResult, setNoResult] = useState(true);

  const [statusMessage, setStatusMessage] = useState(
    "Your picture is being uploaded now and then GPT will take a minute or two. Please wait!"
  );
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  const router = useRouter();
  const params = useLocalSearchParams();
  const image = params.id;
  const imageWidth = params.width;
  const imageHeight = params.height;
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "general", title: "General", icon: "camera" },
    { key: "specifics", title: "Specifics", icon: "albums" },
    { key: "creative", title: "Creative", icon: "camera" },
  ]);
  useEffect(() => {
    if (!image)
      return () => {
        console.log("no image");
      };
    const ctx = canvasRef.current.getContext("2d");
    //console.log(ctx);
    var img = new window.Image();

    img.onload = function () {
      canvasRef.current.width = imageWidth;
      canvasRef.current.height = imageHeight;
      ctx.drawImage(this, 0, 0, imageWidth, imageHeight);

      upload(image);
    };
    img.src = image;
    return () => {};
  }, [image]);

  function makeButton(data) {
    if (decodeURIComponent(data).includes("(")) {
      data = data.split("(")[0];
    }
    const websearch = "https://result.websearch-via-camera.com/en/".concat(
      data
    );
    return (
      <StyledView className="w-2/3 mt-5 mb-5">
        <Pressable
          onPress={() =>
            router.push({
              pathname: "Results",
              params: {
                query: data,
              },
            })
          }
          className="p-4 bg-purple-700 hover:bg-purple-900 text-white rounded-full font-bold py-2 px-4 inline-flex items-center"
        >
          <Text className="text-white">{data}</Text>
        </Pressable>
      </StyledView>
    );
  }
  function _makeButton(data) {
    if (decodeURIComponent(data).includes("(")) {
      data = data.split("(")[0];
    }
    const websearch = "https://result.websearch-via-camera.com/en/".concat(
      data
    );
    return (
      <StyledView className="w-2/3 mt-5 mb-5">
        <Pressable className="p-4 bg-purple-700 hover:bg-purple-900  text-white rounded-full font-bold py-2 px-4 inline-flex items-center">
          <Link href={websearch} asChild>
            <Text className="text-white">{data}</Text>
          </Link>
        </Pressable>
        <View>
          <FlashList
            data={product(data)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductRow item={item} />}
            horizontal
            estimatedItemSize={10}
          />
        </View>
      </StyledView>
    );
  }

  const startOver = () => {
    return (
      <StyledView className="items-center">
        <Link href="https://websearch-via-camera.com/camera" asChild>
          <Pressable className="w-2/3 mt-5 mb-5 p-4 bg-blue-500 hover:bg-blue-700 text-white rounded-full font-bold py-2 px-4 inline-flex items-center">
            <Text className="text-white">Start Over</Text>
          </Pressable>
        </Link>
      </StyledView>
    );
  };

  function upload(image) {
    // let resized = resize();
    const url = `https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doVision`;
    const url3 = `https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doVision2`;
    const url2 = `https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doVisionProduct`;
    const url4 = `https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doVisionName`;
    const url5 = `https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doVisionBook`;

    Promise.all([
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          base64: `${image}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json()),
      fetch(url2, {
        method: "POST",
        body: JSON.stringify({
          base64: `${image}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json()),
      fetch(url3, {
        method: "POST",
        body: JSON.stringify({
          base64: `${image}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json()),
      fetch(url4, {
        method: "POST",
        body: JSON.stringify({
          base64: `${image}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json()),
      fetch(url5, {
        method: "POST",
        body: JSON.stringify({
          base64: `${image}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json()),
    ])
      .then((data) => {
        // File uploaded successfully
        // console.log(data);
        console.log("search intent");
        console.log(data[0]);
        console.log("objects in the photo");
        console.log(data[1]);
        console.log("products");
        console.log(data[2]);
        console.log("name");
        console.log(data[3]);
        console.log("books");
        console.log(data[4]);
        router.push({
          pathname: "Select",
          params: {
            queries: data[0],
            queriesTwo: data[1],
            queriesThree: data[2],
            queriesFour: data[3],
            queriesFive: data[4],
          },
        });
        setSpinnerVisible(false);
        setNoResult(false);
      })
      .catch((error) => {
        setStatusMessage(
          "Error uploading this file. Try with a different picture!"
        );
        // console.error("Error uploading the file:", error);
      });
  }

  if (
    params.queries ||
    params.queriesTwo ||
    params.queriesThree ||
    params.queriesFour ||
    params.queriesFive
  ) {
    let queries = null;
    if (params.queries) queries = params.queries.split(",");
    let queriesTwo = null;
    if (params.queriesTwo) queriesTwo = params.queriesTwo.split(",");
    let queriesThree = null;
    if (params.queriesThree) queriesThree = params.queriesThree.split(",");
    let queriesFour = null;
    if (params.queriesFour) queriesFour = params.queriesFour.split(",");
    let queriesFive = null;
    if (params.queriesFive) queriesFive = params.queriesFive.split(",");

    var toRemoveSet = new Set(queriesThree);
    if (queries) queries = queries.filter((x) => !toRemoveSet.has(x));
    if (queriesTwo) queriesTwo = queriesTwo.filter((x) => !toRemoveSet.has(x));
    if (queriesFive) {
      toRemoveSet = new Set(queriesFive);
      if (queries) queries = queries.filter((x) => !toRemoveSet.has(x));
      if (queriesTwo)
        queriesTwo = queriesTwo.filter((x) => !toRemoveSet.has(x));
      if (queriesThree)
        queriesThree = queriesThree.filter((x) => !toRemoveSet.has(x));
      if (queriesFour)
        queriesFour = queriesFour.filter((x) => !toRemoveSet.has(x));
    }

    const GeneralRoute = () => (
      <StyledScrollView horizontal={false} className="flex-1 bg-white">
        {Array.isArray(queries) && queries.length > 0 && (
          <StyledText className="m-5 text-2xl font-bold">
            Search Intents:
          </StyledText>
        )}
        {Array.isArray(queries) && queries.length > 0 && (
          <StyledView className="items-center">
            {queries.map(makeButton, this)}
          </StyledView>
        )}

        {Array.isArray(queries) && queries.length > 0 && (
          <StyledText className="m-5 text-l font-bold">
            Want to restart?
          </StyledText>
        )}
        {Array.isArray(queries) && queries.length > 0 && startOver()}
        {!queries && (
          <View>
            <StyledText className="p-5">
              No results for this picture.{" "}
            </StyledText>
            {startOver()}
          </View>
        )}
      </StyledScrollView>
    );

    const SpecificsRoute = () => (
      <StyledScrollView horizontal={false} className="flex-1 bg-white">
        {Array.isArray(queriesFive) && queriesFive.length > 0 && (
          <StyledText className="m-5 text-2xl font-bold">
            Books in the picture:
          </StyledText>
        )}
        {Array.isArray(queriesFive) && queriesFive.length > 0 && (
          <StyledView className="items-center">
            {queriesFive.map(makeButton, this)}
          </StyledView>
        )}

        {Array.isArray(queriesThree) && queriesThree.length > 0 && (
          <StyledText className="m-5 text-2xl font-bold">
            Products in the picture:
          </StyledText>
        )}
        {Array.isArray(queriesThree) && queriesThree.length > 0 && (
          <StyledView className="items-center">
            {queriesThree.map(_makeButton, this)}
          </StyledView>
        )}
        {Array.isArray(queriesTwo) && queriesTwo.length > 0 && (
          <StyledText className="m-5 text-2xl font-bold">
            Objects in the picture:
          </StyledText>
        )}
        {Array.isArray(queriesTwo) && queriesTwo.length > 0 && (
          <StyledView className="items-center">
            {queriesTwo.map(makeButton, this)}
          </StyledView>
        )}

        {((Array.isArray(queriesTwo) && queriesTwo.length > 0) ||
          (Array.isArray(queriesThree) && queriesThree.length > 0)) && (
          <StyledText className="m-5 text-l font-bold">
            Want to restart?
          </StyledText>
        )}
        {((Array.isArray(queriesTwo) && queriesTwo.length > 0) ||
          (Array.isArray(queriesThree) && queriesThree.length > 0)) &&
          startOver()}
        {!Array.isArray(queriesTwo) && !Array.isArray(queriesThree) && (
          <View>
            <StyledText className="p-5">
              No results for this picture.{" "}
            </StyledText>
            {startOver()}
          </View>
        )}
      </StyledScrollView>
    );

    const CreativeRoute = () => (
      <StyledScrollView horizontal={false} className="flex-1 bg-white">
        {Array.isArray(queriesFour) && queriesFour.length > 0 && (
          <StyledText className="m-5 text-2xl font-bold">
            Creative names for this picture:
          </StyledText>
        )}
        {Array.isArray(queriesFour) && queriesFour.length > 0 && (
          <StyledView className="items-center">
            {queriesFour.map(makeButton, this)}
          </StyledView>
        )}

        {Array.isArray(queriesFour) && queriesFour.length > 0 && (
          <StyledText className="m-5 text-l font-bold">
            Want to restart?
          </StyledText>
        )}
        {Array.isArray(queriesFour) && queriesFour.length > 0 && startOver()}
        {!Array.isArray(queriesFour) && (
          <View>
            <StyledText className="p-5">
              No creative results for this picture.{" "}
            </StyledText>
            {startOver()}
          </View>
        )}
      </StyledScrollView>
    );

    const renderScene = SceneMap({
      general: GeneralRoute,
      specifics: SpecificsRoute,
      creative: CreativeRoute,
    });
    const renderTabBar = (props) => {
      return (
        <TabBar
          {...props}
          renderLabel={({ focused, route }) => {
            return <Text>{route.title}</Text>;
          }}
          renderIcon={(props) => getTabBarIcon(props)}
          style={{ backgroundColor: "#ffffff" }}
          indicatorStyle={{ backgroundColor: "rgb(126, 34, 206)" }}
        />
      );
    };

    return (
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    );
  }
  console.log(params.queries);
  const PureCanvas = React.forwardRef((props, ref) => <canvas ref={ref} />);
  const canvasRef = useRef();
  return (
    <View>
      {image && noResult && (
        <View>
          <Spinner color={"purple"} visible={spinnerVisible} />
          <StyledText className="p-5">{statusMessage} </StyledText>
          <PureCanvas ref={canvasRef} />
        </View>
      )}
      {image && !noResult && <View>{startOver()}</View>}
    </View>
  );
}
