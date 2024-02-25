import React, { useState } from "react";

import { ScrollView, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

import { styled } from "nativewind";
import "../../assets/styles.css";
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

export default function TabOneScreen() {
  return (
    <StyledScrollView
      horizontal={false}
      className="flex-2 items-center bg-white"
    >
      <StyledView className="justify-center">
        <StyledText className="text-3xl m-12">
          Find what you’re looking for with just an image.
        </StyledText>
      </StyledView>

      <StyledView className="items-center">
        <Link className="w-24 h-24" href="/camera" asChild>
          <Pressable className="mt-10 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center">
            {/* <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg> */}
            <Text className="text-xl font-bold tracking-wider text-white pt-6">
              Start
            </Text>
          </Pressable>
        </Link>
        <StyledText className="text-l p-4">
          Upload an image to begin your Search!
        </StyledText>
        <StyledText className="leading-loose text-l font-bold text-black-600 mt-20">
          How It Works?
        </StyledText>

        <StyledView className="items-start">
          <StyledView className="flex justify-between m-5">
            <StyledText className="text-sm m-2">
              Click the 'Start' button to upload an image.
            </StyledText>
          </StyledView>
          <StyledView className="flex justify-between m-5">
            <StyledText className="text-sm m-2">
              Browse with Search Intents based on the image.
            </StyledText>
          </StyledView>
          <StyledView className="flex justify-between m-5">
            <StyledText className="text-sm m-2">
              Powered by GPT Vision.
            </StyledText>
          </StyledView>
        </StyledView>

        <Link href="https://websearch-via-camera.com/privacy%20policy" asChild>
          <Pressable>
            <StyledText className="text-small font-bold text-blue-600 mt-8 mb-8">
              Privacy Policy
            </StyledText>
          </Pressable>
        </Link>
        <Link href="https://websearch-via-camera.com/result.html" asChild>
          <Pressable>
            <StyledText className="text-small font-bold text-blue-600 mt-8 mb-8">
              Sitemap
            </StyledText>
          </Pressable>
        </Link>
      </StyledView>
    </StyledScrollView>
  );
}
