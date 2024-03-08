import { styled } from "nativewind";
import { Text, View } from "react-native";
import "../assets/styles.css";

const StyledView = styled(View);
const SyledText = styled(Text);

export default function ModalScreen() {
  return (
    <StyledView className="flex-1 items-center justify-center bg-gray-100">
      <SyledText className="text-xl font-bold w-2/3">
        Websearch via camera is a feature that allows you to search the web
        using images instead of words. It is powered by GPT Vision, a
        state-of-the-art AI technology that can analyze images and give context.
      </SyledText>
      <View />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
    </StyledView>
  );
}
