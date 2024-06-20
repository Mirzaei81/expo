import React, { useState, useEffect, useRef } from "react";
import { Link, router } from "expo-router";
import {
  ActivityIndicator,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
  useWindowDimensions,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { styled } from "nativewind";
import "../assets/styles.css";
import Markdown from "react-native-markdown-display";
import * as Sentry from "@sentry/react-native";
import ScreenShot from "../components/ScreenShot";
import IconRow from "../components/IconRow";

Sentry.init({
  dsn: "https://76a422d770ec8a00ccb6574759fde33a@o4507235509731328.ingest.us.sentry.io/4507237860507648",
});

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

export default function AI() {
  const viewRef = useRef();

  const [gpt, setGpt] = useState("");
  const [results, setResults] = useState(null);
  const [loadingGPT, setLoadingGPT] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  let params0 = useLocalSearchParams();
  let params = {};
  try {
    params = JSON.parse(params0.json);
  } catch (error) {
    console.error("Failed to parse JSON", error);
    Sentry.captureException(error);
  }
  const image_uuid = params.UUID;

  const height = params.height;

  useEffect(() => {
    fetch("https://photopulse.kxci.us/record_usage/", {
      method: "POST",
      body: JSON.stringify({
        interaction: `new_AI_user`,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }, []);

  useEffect(() => {
    if (height) {
      fetch("https://photopulse.kxci.us/record_usage/", {
        method: "POST",
        body: JSON.stringify({
          interaction: `new_AI_Sample_user`,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
    if (height == "667") {
      setGpt(`This picture offers a glimpse into a variety of American snack foods and beverages that can be found in international markets. Here are some interesting points you could learn from this image:

        1. American Snack Brands: The image features familiar American snack brands, for example, Reese's peanut butter cups, Mike and Ike, Nerds, and Tootsie Rolls. These brands are synonymous with American confectionery and are heavily marketed and consumed worldwide.
        
        2. Pricing in Local Currency: The products are priced in British pounds (£), indicating that this store is likely located in the UK. This highlights the global distribution and appeal of American snacks.
        
        3. Product Variations: There's a variety of products from the same brand tailored to different tastes and preferences. For example, Reese's products come in standard cups, miniatures, and also pieces likely stuffed with Reese’s peanut butter.
        
        4. Consumer Choices: The high sugar content and colorful packaging of these products appeal largely to children and young adults, but they are also popular among those looking for a nostalgic treat.
        
        5. Cross-Cultural Exchange: The presence of these American products in a non-U.S. location exemplifies cultural exchange through food. It reflects how globalized markets allow people from different parts of the world to access and enjoy products that are not indigenous to their region.
        
        6. Marketing Influence: The color schemes and placement in stores are designed for maximum attractiveness and psychological appeal, prompting impulse purchases by consumers.
        
        This image could serve as a base to discuss topics like international business, marketing strategies, dietary habits, and cultural globalization.`);
      setResults([
        {
          url: "https://www.hersheys.com/reeses/en_us/home.html",
          title: "Reese's Official Website",
          snippet:
            "Discover all the varieties of the iconic Reese’s peanut butter cups, learn about brand history, and browse through their delicious recipes.",
        },
        {
          url: "https://www.jif.com/",
          title: "Jif Peanut Butter",
          snippet:
            "Explore different Jif peanut butter products, get nutritional information, and discover a slew of peanut butter recipes on their official site.",
        },
        {
          url: "https://www.oreo.com/",
          title: "Official Oreo Website",
          snippet:
            "Dive into the world of Oreo. Read about the newest innovations in Oreo flavors, find recipes, and see the brand's latest collaborations.",
        },
        {
          url: "https://www.snapple.com/",
          title: "Snapple Official Site",
          snippet:
            "Learn more about Snapple’s teas and juices, check out their flavor portfolios, and explore Snapple facts.",
        },
        {
          url: "https://www.nestle.com/brands/candy/mike-and-ike",
          title: "Mike and Ike - Nestle",
          snippet:
            "Read about this fruit-flavored candy’s variety packs, discover the brand's history, and check out their latest products.",
        },
        {
          url: "https://www.tootsie.com/candies/tootsie-rolls",
          title: "Tootsie Roll Industries",
          snippet:
            "Get to know more about Tootsie Roll candies, including their classic chewy chocolate roll and other products offered by the brand.",
        },
      ]);
    }
    if (height == "750") {
      setGpt(`This image presents a tempting layout of a popular healthy dish: avocado toast, accompanied by boiled eggs, and garnished with tomatoes and herbs. Here are some educational aspects you can learn from this image:

        1. Nutrition: Avocado is a superfood packed with essential nutrients. It is rich in monounsaturated fats (good fats that are heart-healthy), vitamins E, C, and B6, magnesium, and potassium. Boiled eggs add high-quality protein to the meal making it nutritionally balanced. This combination delivers a variety of nutrients and provides sustained energy.
        
        2. Culinary Skills: The image showcases a simple yet artistic way to prepare and present food. Spreading mashed avocado on toast, topping it with spices, and pairing it with complementary sides like eggs and tomatoes not only creates a visually appealing meal but also enhances the overall flavor profile.
        
        3. Food Photography: This picture is an excellent example of food photography. Notice the composition, lighting, and arrangement that highlight the freshness and textures of the ingredients. Elements like a clean background and minimal color distractions focus attention on the food.
        
        4. Healthy Eating Trends: Avocado toast has become a trendy dish in many parts of the world, often associated with healthy lifestyles. This image reflects a modern eating trend where both health benefits and aesthetic appeal are important.
        
        5. Cultural Impact: The popularity of dishes like avocado toast signals a shift in dietary preferences towards plant-based and nutrient-dense foods. It also reflects globalization in culinary tastes, where a dish can gain popularity across different countries and culinary traditions.
        
        Each of these aspects could be explored further depending on your interests, whether you are more inclined towards nutritional sciences, culinary arts, or food culture studies.`);
      setResults([
        {
          url: "https://www.loveandlemons.com/avocado-toast-recipe/",
          title: "Ultimate Avocado Toast Recipe",
          snippet:
            "Offering various creative takes on the classic avocado toast, this page includes tips, tricks, and topping ideas to elevate this simple dish to gourmet levels.",
        },
        {
          url: "https://www.foodnetwork.com/recipes/articles/50-avocado-recipes",
          title: "50 Creative Avocado Recipes",
          snippet:
            "From breakfast staples to innovative dinners, explore Food Network's collection of recipes incorporating avocados, including several toast variations.",
        },
        {
          url: "https://minimalistbaker.com/simple-vegan-breakfast-ideas/",
          title: "Simple Vegan Breakfast Ideas",
          snippet:
            "This resource offers a collection of quick and easy vegan breakfast options, highlighting the simplicity and versatility of avocados in vegan diets.",
        },
      ]);
    }
    if (height == "281") {
      setGpt(`The image you've shared features a sea otter with its pup. Sea otters are fascinating creatures, important to marine ecosystems, particularly in coastal areas like the North Pacific Ocean. Here are a few interesting facts and learning points about sea otters:

        1. Adaptation: Sea otters are well-adapted to their marine environment. Their fur is the thickest of any animal, with up to one million hair follicles per square inch. This dense fur keeps them warm in the cold ocean waters because, unlike other marine mammals, they lack an insulating layer of blubber.
        
        2. Role in Ecosystem: Sea otters play a critical role in their environment by controlling the sea urchin population. Sea urchins feed on kelp, and without otters to control their numbers, urchin populations can explode, decimating kelp forests and the diverse ecosystems they support.
        
        3. Parental Care: The image shows a pup lying on its mother's chest, which is a common behavior. Sea otter mothers are known for their intensive care, carrying their pups on their chests to keep them dry and warm, grooming them to maintain the insulating properties of their fur, and teaching them to find and eat food.
        
        4. Tool Use: Sea otters are one of the few non-primate mammals known to use tools. They commonly use rocks to crack open hard-shelled prey like clams and sea urchins, which they often balance on their chests while floating on their backs.
        
        5. Conservation Status: Despite their charm and ecological importance, sea otters have faced significant challenges from hunting (historically for their fur), oil spills, pollution, and loss of kelp forest habitat. They are now protected under various laws and regulations, but some populations are still considered endangered.
        
        This image not only highlights the beauty and parental care of sea otters but also serves as a reminder of the importance of conservation efforts to protect such integral marine species.`);

      setResults([
        {
          url: "https://www.worldwildlife.org/species/sea-otter",
          title: "World Wildlife Fund: Sea Otters",
          snippet:
            "Learn about sea otters, an essential keystone species that helps maintain the health of kelp forests and marine ecosystems.",
        },
        {
          url: "https://www.montereybayaquarium.org/animals/animals-a-to-z/sea-otter",
          title: "Monterey Bay Aquarium: Sea Otters",
          snippet:
            "Explore detailed information about sea otters, including their habits, diet, and conservation efforts, with live camera feeds from Monterey Bay Aquarium.",
        },
        {
          url: "https://animals.nationalgeographic.com/animals/mammals/sea-otter/",
          title: "National Geographic: Sea Otters",
          snippet:
            "Dive deep into the world of sea otters with comprehensive articles featuring stunning imagery and interesting facts about their life in the wild.",
        },
      ]);
    }
    if (height == "306") {
      setResults([
        {
          url: "https://www.biblegateway.com/",
          title: "Bible Gateway",
          snippet:
            "A comprehensive online Bible reading and study tool that provides access to various translations, as well as commentaries and devotionals.",
        },
        {
          url: "https://www.biblica.com/",
          title: "Biblica",
          snippet:
            "This website offers access to different versions of the Bible, along with information on Bible study, translation, and the history of the scriptures.",
        },
        {
          url: "https://biblehub.com/",
          title: "Bible Hub",
          snippet:
            "Provides multiple online resources for Bible study, including parallel texts, cross-references, and original language tools.",
        },
      ]);
      setGpt(`This image shows a passage from a text that appears to list some of the Ten Commandments from the Bible. The Ten Commandments are a set of biblical principles relating to ethics and worship, which play a fundamental role in Judaism and Christianity. Here are some key points that can be discussed based on this image:

        1. Historical and Religious Context: The Ten Commandments are found in the books of Exodus and Deuteronomy in the Old Testament of the Bible. They are given to Moses by God on Mount Sinai and include directives about worship and general morality.
        
        2. Contents Displayed in the Image: The specific commandments visible in the image include:
           - "Thou shalt not kill."
           - "Thou shalt not commit adultery."
           - "Thou shalt not steal."
           - "Thou shalt not bear false witness against thy neighbour."
           These commandments are fundamental to the moral foundations of societies influenced by Judeo-Christian values and emphasize the importance of life, fidelity, property rights, and honesty.
        
        3. Language and Translation: The text is rendered in an older form of English, often associated with the King James Version of the Bible, published in 1611. This version uses archaic pronouns like "thou" and verb forms such as "shalt," which was common in early modern English.
        
        4. Linguistic Impact: The King James Bible has been highly influential in the English-speaking world, significantly affecting the English language and literature. Its phrases and stylistic elements are evident in many works of English literature and common expressions.
        
        5. Cultural Significance: The Ten Commandments have been foundational in shaping the legal and ethical systems of many Western countries. They encapsulate principles that are considered universal norms across various cultures and religions, albeit sometimes in different forms.
        
        From this image, you can delve deeper into topics like theological interpretation, historical translations of religious texts, and their impact on cultures and legal systems worldwide.`);
    }
    if (height == "500") {
      setGpt(`From the image you've shared, which showcases a stack of books, we can explore a few interesting topics such as minimalism, self-authenticity, and personal commitments. Each book title seems to reflect a unique principle or idea worth discussing:

        1. "Less is More" by Ludwig Mies van der Rohe - This book title is historically linked to the modernist architect Ludwig Mies van der Rohe who used this phrase to describe his aesthetic tactic of arranging the numerous necessary components of a building to create an impression of extreme simplicity. The phrase "less is more" has since been adopted by many in discussing minimalism in design, art, and lifestyle. Minimalism as a concept can be applied broadly, suggesting that removing excess and clutter—whether in physical environments, activities, or even personal relationships—can lead to increased clarity and focus.
        
        2. "Be True. Be You." - A book with this title likely explores themes of authenticity and individuality. The importance of being true to oneself can be incredibly empowering. This book might offer personal anecdotes, psychological insights, or practical advice on how to maintain personal integrity and authenticity in a world that often pressures individuals to conform.
        
        3. "Promise To Keep" by Jane Green - This title suggests themes related to commitment, reliability, and perhaps personal or relational challenges. Promises, whether made to oneself or others, are fundamental to trust and ethical behavior. Examining the complexities of keeping promises might reveal insights into human psychology, moral dilemmas, and the impact of our commitments on our personal lives and relationships.
        
        These books together open a rich field of discussion on how minimalism can influence personal authenticity and how deeply personal commitments define and shape our values and interactions.
        `);
      setResults([
        {
          url: "https://www.goodreads.com/",
          title: "Goodreads",
          snippet:
            "Discover and share books you love on Goodreads, the world's largest site for readers and book recommendations!",
        },
        {
          url: "https://www.bookdepository.com/",
          title: "Book Depository",
          snippet:
            "Book Depository is a leading international book retailer with a unique offer — over 20 million books with free delivery worldwide.",
        },
        {
          url: "https://www.librarything.com/",
          title: "LibraryThing",
          snippet:
            "LibraryThing is a cataloging and social networking site for book lovers. It allows users to catalog all the books they own or have read.",
        },
      ]);
    }
  }, [params.height]);

  const router = useRouter();
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

  useEffect(() => {
    if (!image_uuid) {
      return () => {};
    }
    setLoadingGPT(true);
    fetch("https://ai-services.kxci.us/ai-searches-service", {
      method: "POST",
      body: JSON.stringify({
        image_uuid: image_uuid,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setLoadingGPT(false);
        return response.json();
      })
      .then((json) => {
        setGpt(json["body"]);
      })
      .catch((error) => {
        setLoadingGPT(false);
        console.error("Error fetching GPT data:", error);
        Sentry.captureException(error);
      });
    const results_url = "https://ai-services.kxci.us/ai-links-service";
    setLoadingResults(true);
    fetch(results_url, {
      method: "POST",
      body: JSON.stringify({
        image_uuid: image_uuid,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setLoadingResults(false);
        return response.json();
      })

      .then((text) => {
        console.log("response from ai-links-service:");
        console.log(text);
        const json = JSON.parse(text["Response"]);
        console.log(json);
        const parsedResults = returnArrayIfPresent(json);
        console.log(parsedResults);
        setResults(parsedResults);
      })
      .catch((error) => {
        setLoadingResults(false);
        console.error("Error fetching results data:", error);
        Sentry.captureException(error);
      });
  }, []);

  return (
    <StyledScrollView className="flex bg-white content-start">
      <StyledView className="m-4 ">
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
        {results && results.websites && (
          <StyledText className="m-8 pt-8 lg:mt-16 text-xl font-extrabold text-center text-gray-900 md:text-2xl">
            Search Results
          </StyledText>
        )}

        {(loadingGPT || loadingResults) && (
          <ActivityIndicator size="large" color="purple" />
        )}

        {results &&
          results.map((website, index) => (
            <TouchableOpacity
              key={index}
              onPress={async () => {
                // var url = new URL(website.url);

                await fetch("https://photopulse.kxci.us/record_usage/", {
                  method: "POST",
                  body: JSON.stringify({
                    interaction: "AI_link",
                  }),
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                });

                Linking.openURL(website.url);
              }}
              className="p-4 m-8 border-l-2 rounded-l-2xl mb-2 border-purple-700" // Apply Tailwind CSS classes
            >
              <StyledText className="font-bold text-lg underline">
                {website.title}
              </StyledText>
              <StyledText>{website.snippet}</StyledText>
            </TouchableOpacity>
          ))}

        <TouchableOpacity
          onPress={() => {
            if (image_uuid) {
              router.push({
                pathname: `Select`,
                params: { json: JSON.stringify({ UUID: image_uuid }) },
              });
            } else if (height) {
              router.push({
                pathname: `Select`,
                params: { json: JSON.stringify({ height: height }) },
              });
            }
          }}
          className="m-10  bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full inline-flex items-center"
        >
          <Text className="text-base font-bold text-white p-6">
            Search Intents
          </Text>
        </TouchableOpacity>
      </StyledView>
    </StyledScrollView>
  );
}
