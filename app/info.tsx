import { styled } from "nativewind";
import {Text, Pressable, View } from "react-native";
import { Link } from "expo-router";

import "../assets/styles.css";

const StyledView = styled(View);
const SyledText = styled(Text);

export default function ModalScreen() {
  return (
    <StyledView className="flex-1 items-center justify-center bg-gray-100">
      <SyledText className="text-xl font-bold w-2/3">
        Websearch via camera is a tool that allows you to search the web
        using a picture instead of words. It is powered by a
        state-of-the-art AI technology that can analyze images and give context.
      </SyledText>
      <StyledView className="mt-10 items-center">
        <Link href="https://search.kxci.us" asChild>
        <Pressable className="p-4 bg-purple-700 hover:bg-purple-900  text-white rounded-full font-bold py-2 px-4 inline-flex items-center">
            <Text className="m-4 text-white text-xl font-bold text-center">Start with a picture</Text>
          </Pressable>
        </Link>
      </StyledView>
      <View />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
    </StyledView>
  );
}
