import React, { useState } from "react";

import { ScrollView, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { ExternalLink } from "../../components/ExternalLink";
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
          Find what you’re looking for with just a picture.
        </StyledText>
      </StyledView>

      <StyledView className="items-center">
        <Link className="w-24 h-24" href="/upload_a_picture" asChild>
          <Pressable className="mt-10 bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full inline-flex items-center">
            <Text className="text-xl font-bold tracking-wider text-white pt-6">
              Start
            </Text>
          </Pressable>
        </Link>
        <StyledText className="leading-loose text-l font-bold text-black-600 mt-20">
          How It Works?
        </StyledText>

        <StyledView className="items-start">
          <StyledView className="flex justify-between m-5">
            <StyledText className="text-sm m-2">Upload a picture.</StyledText>
          </StyledView>
          <StyledView className="flex justify-between m-5">
            <StyledText className="text-sm m-2">
              Explore the web with Search Intents based on the picture.
            </StyledText>
          </StyledView>
          <StyledView className="flex justify-between m-5">
            <StyledText className="text-sm m-2">
              Powered by GPT Vision.
            </StyledText>
          </StyledView>
        </StyledView>

        <ExternalLink
          href="https://websearch-via-camera.com/privacy%20policy"
          asChild
        >
          <Pressable>
            <StyledText className="text-small font-bold text-blue-600 mt-8 mb-8">
              Privacy Policy
            </StyledText>
          </Pressable>
        </ExternalLink>
      </StyledView>
    </StyledScrollView>
  );
}
