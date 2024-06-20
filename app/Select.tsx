import React, { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import {
  ActivityIndicator,
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
import { styled } from "nativewind";
import "../assets/styles.css";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://76a422d770ec8a00ccb6574759fde33a@o4507235509731328.ingest.us.sentry.io/4507237860507648",
});

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

const productsList = [
  {
    id: "2",
    title: "Snapple Peach Tea",
    price: "$10.99",
    image: "https://storage.kxci.us/81CjXZYTngL._SL1500_.jpg",
    keywords: "Bottled beverage",
    url: "#",
  },
  {
    id: "3",
    title: "Ice Purple Variety Pack",
    price: "$10.43",
    image: "https://storage.kxci.us/81BU+xe4jcL._SL1500_.jpg",
    keywords: "Bottled beverage",
    url: "#",
  },
  {
    id: "4",
    title: "Jif Creamy Peanut Butter",
    price: "$9.36",
    image: "https://storage.kxci.us/71iTSdDUkOL._SL1500_.jpg",
    keywords: "Jif",
    url: "#",
  },
  {
    id: "5",
    title: "REESE'S Milk Chocolate",
    price: "$9.07",
    image: "https://storage.kxci.us/71IZF9dzcDL._SL1500_.jpg",
    keywords: "Peanut Butter Cups",
    url: "#",
  },
  {
    id: "6",
    title: "REESE'S PIECES",
    price: "$15.48",
    image: "https://storage.kxci.us/716Gw-VFhLL._SL1500_.jpg",
    keywords: "Reese",
    url: "#",
  },
  {
    id: "7",
    title: "Marshmallow Fluff",
    price: "$6.10",
    image: "https://storage.kxci.us/61guZpnkxvL._SL1500_.jpg",
    keywords: "Marshmallow",
    url: "#",
  },
  {
    id: "8",
    title: "Nerds Rope Candy",
    price: "$18.99",
    image: "https://storage.kxci.us/81fSz3NwAbL._SL1500_.jpg",
    keywords: "Nerds",
    url: "#",
  },
  {
    id: "9",
    title: "Assorted Fruit Original",
    price: "$6.65",
    image: "https://storage.kxci.us/91tPzLAi9IL._SL1500_.jpg",
    keywords: "Mike",
    url: "#",
  },
  {
    id: "10",
    title: "Assorted Milk Chocolate",
    price: "$19.12",
    image: "https://storage.kxci.us/71RerViY9aL._SL1500_.jpg",
    keywords: "Chocolate",
    url: "#",
  },
  {
    id: "11",
    title: "Tootsie Roll",
    price: "$5.50",
    image: "https://storage.kxci.us/61VKgfJJ4iL._SL1000_.jpg",
    keywords: "Tootsie",
    url: "#",
  },
  {
    id: "12",
    title: "Pop Tarts Variety Pack",
    price: "$23.99",
    image: "https://storage.kxci.us/91OKwCJoi6L._SL1500_.jpg",
    keywords: "Pop-Tarts",
    url: "#",
  },
  {
    id: "13",
    title: "Herr's Potato Chips",
    price: "$11.99",
    image: "https://storage.kxci.us/51oQY97OVuL.jpeg",
    keywords: "Herr",
    url: "#",
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
  const [statusMessage, setStatusMessage] = useState("");
  const [queries, setQueries] = useState([]);
  const [queriesThree, setQueriesThree] = useState([]);
  const [queriesFive, setQueriesFive] = useState([]);
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  const router = useRouter();
  let params0 = useLocalSearchParams();
  let params = {};
  try {
    params = JSON.parse(params0.json);
  } catch (error) {
    console.error("Failed to parse JSON", error);
    Sentry.captureException(error);
  }
  const image_uuid = params.UUID;
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "general", title: "Intents", icon: "camera" },
    { key: "specifics", title: "Specifics", icon: "albums" },
  ]);

  const height = params.height;

  useEffect(() => {
    fetch("https://photopulse.kxci.us/record_usage/", {
      method: "POST",
      body: JSON.stringify({
        interaction: `new_Select_user`,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }, []);

  useEffect(() => {
    if (height) {
      fetch("https://photopulse.kxci.us/record_usage/", {
        method: "POST",
        body: JSON.stringify({
          interaction: `new_Select_Sample_user`,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
    if (height == "667") {
      console.log("shop");
      setQueries([
        "Candy%20aisle%20in%20a%20grocery%20store",
        "%20candy%20brands",
        "American%20candy%20selection",
        "International%20candies%20in%20a%20store",
        "Variety%20of%20sweets%20in%20retail",
        "Sweet%20snacks%20available%20for%20purchase",
      ]);
      setQueriesThree([
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
      ]);
    }
    if (height == "750") {
      console.log("Avocado");
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
      setQueriesThree([
        "Slices of bread with avocado spread",
        "A half of an avocado with the pit still inside",
        "Two halves of a boiled egg with pepper sprinkled on top",
        "Fresh cherry tomatoes",
        "Wooden cutting board",
        "Sprinkle of pepper and spices around the board",
        "Springs of dill",
      ]);
    }
    if (height == "281") {
      setQueries([
        "Sea otter with pup",
        "Mother sea otter with baby",
        "Sea otter habitat and lifestyle",
        "Cute sea otter family",
        "Sea otter conservation status",
      ]);
      setQueriesThree([
        "An adult sea otter",
        "A baby sea otter",
        "Water with ripples",
      ]);
    }
    if (height == "306") {
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
      setQueriesFive(["The Bible"]);
    }
    if (height == "500") {
      console.log("Three Books");
      setQueries([
        "Interior%20design%20book%20display",
        "Minimalist%20book%20arrangement",
        "Inspirational%20book%20titles",
        "Modern%20book%20cover%20designs",
        "Book%20photography%20ideas",
        "White%20and%20blue%20color%20scheme%20in%20decor",
      ]);
      setQueriesThree([
        "A%20book%20with%20the%20title%20%22Less%20is%20More.%22",
        "A%20book%20with%20the%20title%20%22Be%20True.%20Be%20You.%22",
        "A%20book%20with%20the%20title%20%22Promise%20To%20Keep.%22",
        "A%20glass%20object%20with%20a%20spiral%20design.",
        "A%20white%20bedside%20table%20or%20stand.",
      ]);
      setQueriesFive([
        "%22LESS%20IS%20MORE%22",
        "%22BE%20TRUE.%20BE%20YOU.%22",
      ]);
    }
  }, [params.height]);

  useEffect(() => {
    if (!image_uuid) {
      setSpinnerVisible(false);
      return () => {
        console.log("no image");
      };
    }
    upload(image_uuid);
    return () => {};
  }, [image_uuid]);

  function makeButton(data) {
    if (decodeURIComponent(data).includes("(")) {
      data = data.split("(")[0];
    }

    return (
      <StyledView className="w-2/3 mt-5 mb-5">
        <Pressable
          onPress={() => {
            router.push({
              pathname: "Results",
              params: {
                query: data,
              },
            });
            return;
          }}
          className="p-4 bg-purple-700 hover:bg-purple-900 text-white rounded-full font-bold py-2 px-4 inline-flex items-center"
        >
          <Text className="p-4 m-4 text-white text-xl font-bold text-center">
            {decodeURI(data)}
          </Text>
          {/* <FlashList
            data={[data, data]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text>{item}</Text> }
            horizontal
            estimatedItemSize={10}
          /> */}
          {/* <Image className="m-4 w-20 h-20" source={{
          uri:"https://storage.kxci.us/51oQY97OVuL.jpg"}}></Image> */}
        </Pressable>
      </StyledView>
    );
  }
  function _makeButton(data) {
    if (decodeURIComponent(data).includes("(")) {
      data = data.split("(")[0];
    }

    return (
      <StyledView className="w-2/3 mt-5 mb-5">
        <Pressable
          onPress={() => {
            router.push({
              pathname: "Results",
              params: {
                query: data,
              },
            });
            return;
          }}
          className="p-4 bg-purple-700 hover:bg-purple-900 text-white rounded-full font-bold py-2 px-4 inline-flex items-center"
        >
          <Text className="m-4 text-white text-xl font-bold text-center">
            {decodeURI(data)}
          </Text>
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
      <StyledView className="mt-4 items-center">
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

  function upload(image) {
    const filteredUrls = [
      `https://ai-services.kxci.us/ai-search-intents-service`,
      `https://ai-services.kxci.us/ai-products-service`,
      `https://ai-services.kxci.us/ai-books-service`,
    ];

    const fetchPromises = filteredUrls.map((url) =>
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ image_uuid: image }),
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        return response.text();
      })
      .then((text) => {  
        console.log(text);      
        const json = JSON.parse(text);
        console.log(json);
        return json["body"];
      })
        .catch((error) => {
          Sentry.captureException(error);
          return { error }; // Return an object with error property
        })
    );
    Promise.allSettled(fetchPromises)
      .then((res) => {
        const responseData = res.map((result) =>
          result.status === "fulfilled" ? result.value : []
        );
        setQueries(Array.isArray(responseData[0]) ? responseData[0] : []);
        setQueriesThree(Array.isArray(responseData[1]) ? responseData[1] : []);
        setQueriesFive(Array.isArray(responseData[2]) ? responseData[2] : []);

        setSpinnerVisible(false);
      })
      .catch((error) => {
        Sentry.captureException(error);
        setStatusMessage(
          "Error processing the data. Try with a different picture!"
        );
      });
  }

  const GeneralRoute = () => (
    <StyledScrollView horizontal={false} className="flex-1 bg-white">
      {spinnerVisible ? (
        <StyledView className="m-4">
          <ActivityIndicator size="large" color="purple" />
        </StyledView>
      ) : (
        <>
          {statusMessage && (
            <StyledText className="m-5 text-2xl text-center font-bold">
              {statusMessage}
            </StyledText>
          )}
          {Array.isArray(queries) && queries.length > 0 && (
            <>
              <StyledText className="m-5 text-2xl text-center font-bold">
                Search Intents
              </StyledText>
              <StyledView className="items-center">
                {queries.map(makeButton)}
              </StyledView>
            </>
          )}
          {Array.isArray(queries) && queries.length > 0 && (
            <View>
              <StyledText className="text-lg text-center p-5">
                Do you want to start over?
              </StyledText>
              {startOver()}
            </View>
          )}
          {Array.isArray(queries) && queries.length === 0 && (
            <View>
              <StyledText className="text-lg text-center p-5">
                No results for this picture.
              </StyledText>
              {startOver()}
            </View>
          )}
        </>
      )}
    </StyledScrollView>
  );

  const SpecificsRoute = () => (
    <StyledScrollView horizontal={false} className="flex-1 bg-white">
      {Array.isArray(queriesFive) && queriesFive.length > 0 && (
        <StyledText className="m-5 text-center text-2xl font-bold">
          Books in the picture
        </StyledText>
      )}
      {Array.isArray(queriesFive) && queriesFive.length > 0 && (
        <StyledView className="items-center">
          {queriesFive.map(makeButton, this)}
        </StyledView>
      )}

      {Array.isArray(queriesThree) && queriesThree.length > 0 && (
        <StyledText className="m-5 text-center text-2xl font-bold">
          In the Picture
        </StyledText>
      )}
      {Array.isArray(queriesThree) && queriesThree.length > 0 && (
        <StyledView className="items-center">
          {queriesThree.map(_makeButton, this)}
        </StyledView>
      )}

      {Array.isArray(queriesThree) && queriesThree.length > 0 && (
        <StyledText className="m-5 text-center text-lg font-bold">
          Do you want to start over?
        </StyledText>
      )}
      {Array.isArray(queriesThree) && queriesThree.length > 0 && startOver()}
      {!Array.isArray(queriesThree) && (
        <View>
          <StyledText className="text-lg text-center p-5">
            No results for this picture.{" "}
          </StyledText>
          {startOver()}
        </View>
      )}
    </StyledScrollView>
  );

  const renderScene = SceneMap({
    general: GeneralRoute,
    specifics: SpecificsRoute,
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
