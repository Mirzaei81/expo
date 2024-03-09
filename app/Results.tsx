import { styled } from "nativewind";
import {ActivityIndicator, ScrollView, Text, View, Pressable, Linking } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Markdown from 'react-native-markdown-display';

import "../assets/styles.css";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledPressable = styled(Pressable);

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const query = params.query;

  const sample = {
    websites: [
      {
        url: "https://openai.com/gpt-3/",
        title: "GPT-3: Language Models are Few-Shot Learners",
        snippet:
          "GPT-3, the third version of the Generative Pretrained Transformer language model, is a powerful tool for natural language processing tasks. With over 175 billion parameters, it has been used for various applications including language translation, summarization, and code generation.",
      },
      {
        url:
          "https://venturebeat.com/2022/03/29/openais-gpt-3-other-models-get-major-speed-boosts/",
        title: "OpenAI’s GPT-3, other models get major speed boosts",
        snippet:
          "OpenAI's GPT-3 has been improved with major speed boosts, making it more efficient and capable of handling complex language tasks at a faster rate. This update enhances the model's performance and usability for developers and researchers.",
      },
      {
        url:
          "https://venturebeat.com/2022/03/29/openais-gpt-3-other-models-get-major-speed-boosts/",
        title: "OpenAI’s GPT-3, other models get major speed boosts",
        snippet:
          "OpenAI's GPT-3 has been improved with major speed boosts, making it more efficient and capable of handling complex language tasks at a faster rate. This update enhances the model's performance and usability for developers and researchers.",
      },
      {
        url:
          "https://venturebeat.com/2022/03/29/openais-gpt-3-other-models-get-major-speed-boosts/",
        title: "OpenAI’s GPT-3, other models get major speed boosts",
        snippet:
          "OpenAI's GPT-3 has been improved with major speed boosts, making it more efficient and capable of handling complex language tasks at a faster rate. This update enhances the model's performance and usability for developers and researchers.",
      },
      {
        url:
          "https://venturebeat.com/2022/03/29/openais-gpt-3-other-models-get-major-speed-boosts/",
        title: "OpenAI’s GPT-3, other models get major speed boosts",
        snippet:
          "OpenAI's GPT-3 has been improved with major speed boosts, making it more efficient and capable of handling complex language tasks at a faster rate. This update enhances the model's performance and usability for developers and researchers.",
      }
    ],
  };

  const sample2=`Avocado toast is a delicious and versatile meal that can be enjoyed for breakfast, lunch, or as a snack. Here's a simple and customizable recipe to get you started: **Ingredients:** - 1 ripe avocado - 2 slices of bread (whole grain, sourdough, or your choice) - Salt, to taste - Pepper, to taste - Extra virgin olive oil (optional) - Lemon juice (optional) **Optional Toppings:** - Red pepper flakes - Cherry tomatoes, halved - Sliced radishes - Arugula or rocket - Poached or fried egg - Feta, goat cheese, or your favorite cheese - Sesame seeds, chia seeds, or hemp seeds - Microgreens **Instructions:** 1. **Toast the Bread:** Begin by toasting your slices of bread to your preferred level of crispiness. 2. **Prepare the Avocado:** While the bread is toasting, cut the avocado in half and remove the pit. Scoop the avocado flesh into a bowl. 3. **Mash the Avocado:** Use a fork to mash the avocado to your desired consistency. Some people prefer their avocado spread to be chunky, while others like it smooth. Adjust according to your preference. 4. **Season the Avocado:** Add a pinch of salt and pepper to the mashed avocado. If you like, you can also add a drizzle of olive oil and some lemon juice. These not only add flavor but can also help prevent the avocado from browning too quickly. Mix everything together. 5. **Assemble the Avocado Toast:** Spread the mashed avocado evenly onto the toasted slices of bread. Ensure the avocado layer is as thick or as thin as you like. 6. **Add Toppings:** Here's where you can get creative. Add any of the suggested toppings above or come up with your combinations. Adding a source of protein like eggs or some healthy fats like seeds can turn your avocado toast into a more filling meal. 7. **Serve:** Once your avocado toast is assembled with your chosen toppings, it’s ready to serve. Enjoy immediately for the best texture and flavor. **Tips and Variations:** - For an additional flavor, grill the bread instead of toasting it. - Rub a garlic clove over the toasted bread before adding the avocado for an extra zing. - If you’re using lemon juice, you can zest the lemon and add the zest to the avocado mixture for a brighter flavor. - Experiment with different types of bread, such as ciabatta, a bagel, or even a croissant for a unique twist. Avocado toast is not only tasty but also highly nutritious, providing a good balance of healthy fats, fiber, and vitamins. Enjoy experimenting with it!`

  return (
    <StyledScrollView className="flex bg-white content-start">
      <img
        src="https://websearch-via-camera.com/logo.png"
        className="w-2/3 self-center"
      ></img>
      <StyledText className="p-4 mb-4 text-xl self-center">
        Results for {query}
      </StyledText>
      {!sample2 && <ActivityIndicator size="small" color="purple" />}
      <StyledText className="pl-4 pr-4 mb-4 text-sm self-center border-l-2 border-r-2 rounded-l-2xl mb-2 border-purple-700">
      <Markdown>{sample2}</Markdown>
      </StyledText>
      
      {sample.websites.map((website, index) => (
        <Pressable
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
        </Pressable>
      ))}
    </StyledScrollView>
  );
}
