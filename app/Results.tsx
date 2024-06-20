import { useState, useEffect, useRef } from "react";
import { styled } from "nativewind";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
  Pressable,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { useRouter, useLocalSearchParams } from "expo-router";
import Markdown from "react-native-markdown-display";
import * as Sentry from "@sentry/react-native";
import ScreenShot from "../components/ScreenShot";
import IconRow from "../components/IconRow";

Sentry.init({
  dsn: "https://76a422d770ec8a00ccb6574759fde33a@o4507235509731328.ingest.us.sentry.io/4507237860507648",
});

import "../assets/styles.css";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

export default function ResultsScreen() {
  const viewRef = useRef(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const [hits, setHits] = useState(null);
  const [gpt, setGpt] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);

  const query = params.query;
  const windowWidth = Dimensions.get("window").width;

  const API_KEY = "42783926-86613f05b75912c1f31b90c53";
  const Pixabay =
    "https://pixabay.com/api/?key=" +
    API_KEY +
    "&q=" +
    encodeURIComponent(query);

  const GPT_URL = "https://ai-services.kxci.us/ai-knowledge-boxes-service";
  const GPT_SEARCH_URL =
    "https://ai-services.kxci.us/ai-query-searches-service";

  useEffect(() => {
    fetch("https://photopulse.kxci.us/record_usage/", {
      method: "POST",
      body: JSON.stringify({
        interaction: `new_Results_user`,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }, []);

  useEffect(() => {
    fetch(Pixabay, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        if (data.totalHits > 0) {
          setHits(data.hits.slice(0, 4));
        }
      })
      .catch((error) => {
        Sentry.captureException(error);
        console.error("Error fetching Pixabay data:", error);
      });

    fetch(GPT_URL, {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        const json = JSON.parse(text);
        setGpt(json["body"]);
      })
      .catch((error) => {
        setError(true);

        Sentry.captureException(error);
        console.error("Error fetching GPT data:", error);
      });

    fetch(GPT_SEARCH_URL, {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((text) => {
        try {
          const json = JSON.parse(text["body"]);
          setResults(json);
        } catch (error) {
          setError(true);
          console.error("Failed to parse JSON:", error);
          Sentry.captureException(error);
        }
      })
      .catch((error) => {
        setError(true);
        console.error("Error fetching GPT Search data:", error);

        Sentry.captureException(error);
      });
  }, []);
  function returnArrayIfPresent(obj) {
    // Check if obj is an array
    if (Array.isArray(obj)) {
      return obj;
    }
    // If obj is an object (dictionary)
    else if (typeof obj === "object" && obj !== null) {
      // Iterate over the object's values
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          // If one of the values is an array, return it
          if (Array.isArray(obj[key])) {
            return obj[key];
          }
        }
      }
    }
    // Return null if no array is found
    return null;
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
  return (
    <StyledScrollView className="flex bg-white content-start">
      <StyledText className="p-4 mb-4 text-xl self-center items-center">
        {query}
      </StyledText>
      {hits && (
        <StyledView className="items-center">
          {hits.map((picture, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => Linking.openURL(picture.pageURL)}
            >
              <Image
                style={{
                  margin: 20,
                  width: Math.min(1000, windowWidth - 40),
                  height:
                    (picture.imageHeight / picture.imageWidth) *
                    Math.min(1000, windowWidth - 40),
                }}
                source={{ uri: picture.webformatURL }}
              />
              <StyledText className="text-base text-center mb-7">
                {picture.tags}
              </StyledText>
            </TouchableOpacity>
          ))}
        </StyledView>
      )}
      {hits && (
        <StyledText className="self-center text-sm">
          Pictures for {query} from{" "}
          <TouchableOpacity
            className="text-blue-600"
            onPress={() => Linking.openURL("https://pixabay.com")}
          >
            Pixabay
          </TouchableOpacity>
        </StyledText>
      )}
      <StyledView className="m-4">
        {gpt && (
          <StyledView className="m-4 flex-col justify-center items-center">
            <Text
              ref={viewRef}
              className="text-lg md:ml-10 md:mr-10 lg:ml-20 lg:mr-20 font-bold p-10"
            >
              <Markdown>{gpt}</Markdown>
              <StyledView className="flex-col">
                <IconRow color={"#7E22CE"} markDownResult={gpt} />
                <ScreenShot viewRef={viewRef} />
              </StyledView>
            </Text>
          </StyledView>
        )}
        <StyledText className="m-8 pt-8 lg:mt-16 text-xl font-extrabold text-center text-gray-900 md:text-2xl">
          Search Results
        </StyledText>
        {!error && (!gpt || !results) && (
          <ActivityIndicator
            className="pl-4 pr-4 mb-4 mt-4"
            size="large"
            color="purple"
          />
        )}

        {results &&
          results.websites &&
          results.websites.map((website, index) => (
            <TouchableOpacity
              key={index}
              onPress={async () => {
                await fetch("https://photopulse.kxci.us/record_usage/", {
                  method: "POST",
                  body: JSON.stringify({
                    interaction: "Results_link",
                  }),
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                });
                Linking.openURL(website.url); // Open the website URL
              }}
              className="p-4 m-8 border-l-2 rounded-l-2xl mb-2 border-purple-700 lg:mr-20 lg:ml-20" // Apply Tailwind CSS classes
            >
              <StyledText className="font-bold text-lg">
                {website.title}
              </StyledText>
              <StyledText>{website.snippet}</StyledText>
            </TouchableOpacity>
          ))}
        {results &&
          results.results &&
          results.results.map((website, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // Handle press action (e.g., navigate to the website)
                Linking.openURL(website.url); // Open the website URL
              }}
              className="p-4 m-8 border-l-2 rounded-l-2xl mb-2 border-purple-700 lg:mr-20 lg:ml-20" // Apply Tailwind CSS classes
            >
              <StyledText className="font-bold text-lg">
                {website.title}
              </StyledText>
              <StyledText>{website.snippet}</StyledText>
            </TouchableOpacity>
          ))}
        <StyledText className="m-5 text-center text-lg font-bold">
          Do you want to restart?
        </StyledText>
        {startOver()}
      </StyledView>
    </StyledScrollView>
  );
}
