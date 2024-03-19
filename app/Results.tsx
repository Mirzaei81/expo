import { useState, useEffect } from "react";
import { styled } from "nativewind";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View,
  Pressable,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Markdown from "react-native-markdown-display";
// import ReactPlaceholder from 'react-placeholder';
// import "react-placeholder/lib/reactPlaceholder.css";

import "../assets/styles.css";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledPressable = styled(Pressable);

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [hits, setHits] = useState(null);
  const [gpt, setGpt] = useState(null);
  const [results, setResults] = useState(null);

  const query = params.query;

  const API_KEY = "42783926-86613f05b75912c1f31b90c53";
  const Pixabay =
    "https://pixabay.com/api/?key=" +
    API_KEY +
    "&q=" +
    encodeURIComponent(query);

  const GPT_URL =
    "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doGPT";
  const GPT_SEARCH_URL =
    "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doGptSearch";
  useEffect(() => {
    // console.log("set hits to null and uncomment this");
    fetch(Pixabay, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.totalHits > 0) {
          setHits(data.hits.slice(0, 4));
        }
      });

    fetch(GPT_URL, {
      method: "POST",
      body: JSON.stringify({
        query: query,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((text) => setGpt(text));

    fetch(GPT_SEARCH_URL, {
      method: "POST",
      body: JSON.stringify({
        query: query,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(data);
      });
  }, []);

  return (
    <StyledScrollView className="flex bg-white content-start">
      <StyledText className="p-4 mb-4 text-xl self-center">{query}</StyledText>
      {hits &&
        hits.map((picture, index) => (
          <TouchableOpacity onPress={() => Linking.openURL(picture.pageURL)}>
            <Image
              style={{
                margin: "auto",
                width: picture.webformatWidth,
                height: picture.webformatHeight,
                maxWidth: "100%",
                maxHeight: picture.webformatHeight,
              }}
              source={{
                uri: picture.webformatURL,
              }}
            />
          </TouchableOpacity>
        ))}
      {hits && (
        <StyledText className="self-center text-sm">
          Pictures for {query} from{" "}
          <TouchableOpacity
            className=" text-blue-600"
            onPress={() => Linking.openURL("https://pixabay.com")}
          >
            Pixabay
          </TouchableOpacity>
        </StyledText>
      )}

      {!gpt && (
        <ActivityIndicator
          className="pl-4 pr-4 mb-4 mt-4"
          size="large"
          color="purple"
        />
      )}

      {gpt && (
        <StyledText className="pl-4 pr-4 mb-4 mt-4 text-sm self-center border-l-2 border-r-2 rounded-l-2xl mb-2 border-purple-700">
          <Markdown>{gpt}</Markdown>
        </StyledText>
      )}

      {results &&
        results.websites &&
        results.websites.map((website, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // Handle press action (e.g., navigate to the website)
              Linking.openURL(website.url); // Open the website URL
            }}
            className="p-4 border-l-2 border-r-2 rounded-l-2xl mb-2 border-purple-700" // Apply Tailwind CSS classes
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
            className="p-4 border-l-2 border-r-2 rounded-l-2xl mb-2 border-purple-700" // Apply Tailwind CSS classes
          >
            <StyledText className="font-bold text-lg">
              {website.title}
            </StyledText>
            <StyledText>{website.snippet}</StyledText>
          </TouchableOpacity>
        ))}
    </StyledScrollView>
  );
}
