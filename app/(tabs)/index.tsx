import React, { useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { styled } from "nativewind";
import "../../assets/styles.css";
import Svg, { Rect, G, Defs, Polygon, Polyline, Path } from "react-native-svg";
import { ExternalLink } from "../../components/ExternalLink";
import Tools from "../../components/Tools";
import * as Linking from "expo-linking";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

export default function TabOneScreen() {
  useEffect(() => {
    fetch("https://photopulse.kxci.us/record_usage/", {
      method: "POST",
      body: JSON.stringify({
        interaction: `new_search_user`,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }, []);

  return (
    <StyledScrollView horizontal={false} className="flex-2  bg-white">
      <StyledView className="items-center">
        <StyledText className="text-3xl m-12">
          Find what you are looking for with just a picture.
        </StyledText>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://search.kxci.us/upload_a_picture")
          }
          accessibilityLabel="Upload a picture"
        >
          <Svg
            xmlns="https://www.w3.org/2000/svg"
            xmlnsXlink="https://www.w3.org/1999/xlink"
            id="websearch"
            viewBox="0 0 41.92 38.7"
            enableBackground="new 0 0 214.6279 198.1416"
            xmlSpace="preserve"
            width={100}
            height={100}
          >
            <G>
              <Path
                fill="#5CB0FF"
                d="M33.545 27.797c0 -3.015 -2.454 -5.469 -5.469 -5.469s-5.469 2.454 -5.469 5.469 2.454 5.469 5.469 5.469 5.469 -2.454 5.469 -5.469"
              />
              <Path
                fill="#1C71DA"
                d="M18.701 32.484v-14.844h8.396c0.003 0.154 0.014 0.304 0.014 0.459 0 0.432 0.349 0.781 0.781 0.781s0.781 -0.349 0.781 -0.781c0 -0.155 -0.012 -0.305 -0.015 -0.459h6.448c0 -9.046 -7.36 -16.406 -16.406 -16.406h-1.563v0.079c-8.315 0.79 -14.844 7.808 -14.844 16.327 0 9.046 7.36 16.406 16.406 16.406 0.432 0 0.781 -0.349 0.781 -0.781s-0.349 -0.781 -0.781 -0.781m-1.563 -0.259C13.246 30.968 10.291 25.117 10.291 18.1c0 -0.155 0.011 -0.305 0.014 -0.459h6.834zM10.384 16.078c0.505 -6.095 3.244 -10.969 6.754 -12.103v12.103zm8.317 0V3.716c4.235 0 7.739 5.387 8.317 12.362zm14.76 0H28.584c-0.467 -5.855 -2.922 -10.721 -6.25 -12.813 5.941 1.503 10.471 6.582 11.127 12.813M15.068 3.265c-3.328 2.092 -5.783 6.957 -6.25 12.813H3.941c0.655 -6.231 5.186 -11.309 11.127 -12.813M3.857 17.64h4.886c-0.003 0.154 -0.015 0.304 -0.015 0.459 0 5.573 1.8 10.48 4.516 13.332 -5.49 -2.18 -9.388 -7.534 -9.388 -13.791"
              />
              <Path
                fill="#1C71DA"
                d="m37.405 36.021 -3.841 -3.841c0.963 -1.203 1.543 -2.726 1.543 -4.384 0 -3.877 -3.154 -7.031 -7.031 -7.031s-7.031 3.154 -7.031 7.031 3.154 7.031 7.031 7.031c1.657 0 3.18 -0.58 4.383 -1.543l3.841 3.841zm-14.798 -8.225c0 -3.015 2.454 -5.469 5.469 -5.469s5.469 2.454 5.469 5.469 -2.454 5.469 -5.469 5.469 -5.469 -2.454 -5.469 -5.469"
              />
            </G>
            <Path
              fill="#FF5D5D"
              d="M0.781 4.325a0.781 0.781 0 0 1 -0.552 -1.334L2.991 0.229a0.781 0.781 0 0 1 1.105 0 0.781 0.781 0 0 1 0 1.105L1.334 4.096A0.779 0.779 0 0 1 0.781 4.325"
            />
            <Path
              fill="#FF5D5D"
              d="M3.544 4.325a0.779 0.779 0 0 1 -0.552 -0.229L0.229 1.334a0.781 0.781 0 0 1 0 -1.105 0.781 0.781 0 0 1 1.105 0l2.762 2.762a0.781 0.781 0 0 1 -0.552 1.334"
            />
            <Path
              fill="#00D40B"
              d="M2.734 38.7c-1.508 0 -2.734 -1.227 -2.734 -2.734s1.227 -2.734 2.734 -2.734 2.734 1.227 2.734 2.734 -1.227 2.734 -2.734 2.734m0 -3.906c-0.646 0 -1.172 0.526 -1.172 1.172s0.526 1.172 1.172 1.172 1.172 -0.526 1.172 -1.172 -0.526 -1.172 -1.172 -1.172"
            />
            <Path
              fill="#FFC504"
              d="M38.929 11.088a0.781 0.781 0 0 1 -0.553 -0.229l-2.21 -2.21a0.781 0.781 0 0 1 0 -1.105l2.21 -2.21a0.781 0.781 0 0 1 1.105 0l2.21 2.21a0.781 0.781 0 0 1 0 1.105l-2.21 2.21a0.781 0.781 0 0 1 -0.552 0.229m-1.105 -2.991 1.105 1.105 1.105 -1.105 -1.105 -1.105z"
            />
          </Svg>
        </TouchableOpacity>
      </StyledView>

      <StyledView className="items-center">
        <StyledText className="leading-loose text-lg font-bold text-black-600 mt-20">
          How It Works?
        </StyledText>

        <StyledView className="items-start">
          <StyledView className="flex justify-between m-5">
            <ExternalLink
              href="https://search.kxci.us/upload_a_picture"
              asChild
            >
              <StyledText className="text-lg underline m-2">
                Upload a picture.
              </StyledText>
            </ExternalLink>
          </StyledView>
          <StyledView className="flex justify-between m-5">
            <StyledText className="text-lg m-2">
              Learn actionable knowledge!
            </StyledText>
          </StyledView>
          <StyledView className="flex justify-between m-5">
            <StyledText className="text-lg m-2">
              Explore the web with Search Intents based on the picture.
            </StyledText>
          </StyledView>
        </StyledView>

        <Pressable
          onPress={() =>
            Linking.openURL("https://search.kxci.us/upload_a_picture")
          }
          className=" m-10  bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full inline-flex items-center"
        >
          <Text className="text-xl font-bold   text-white p-6">
            Upload A Picture
          </Text>
        </Pressable>
        <View className="mt-10 items-center">
          <ExternalLink href="https://search.kxci.us/privacy%20policy">
            <Text className="mt-40 text-base font-bold text-blue-600 mt-8 mb-8 underline">
              Privacy Policy
            </Text>
          </ExternalLink>
        </View>

        <Tools skipTool="search"></Tools>
      </StyledView>
    </StyledScrollView>
  );
}
