import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { styled } from "nativewind";
import { Text, View } from "react-native";
import "../assets/styles.css";

const StyledView = styled(View);
const SyledText = styled(Text);

export default function ModalScreen() {
  return (
    <StyledView className="flex-1 items-center justify-center bg-gray-100">
      <SyledText className="text-xl font-bold w-2/3">
        GPT Vision can recognize general objects, scenes, colors, and shapes in
        the images. It can also answer questions about the content, context, and
        attributes of the images. For example, you can ask it what color a car
        is or what some ideas for dinner might be based on what is in your
        fridge.
      </SyledText>
      <View />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </StyledView>
  );
}
