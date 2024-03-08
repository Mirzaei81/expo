import { styled } from "nativewind";
import { ScrollView, Text, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import "../assets/styles.css";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const query = params.query;

  return (
    <StyledScrollView className="flex bg-white content-start">
      <img
        src="https://websearch-via-camera.com/logo.png"
        className="w-2/3 self-center"
      ></img>
      <StyledText className="text-xl self-center">
        Results for {query}
      </StyledText>
    </StyledScrollView>
  );
}
