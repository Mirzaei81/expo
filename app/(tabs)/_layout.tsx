import React, { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  // const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    let x = document.cookie;
    const parts = x.split(`lang=`);
    if (parts.length === 2) {
      let cLang = parts.pop().split(";").shift();
      if (cLang == "es") {
        window.location.href = "/es";
      }
      if (cLang == "id") {
        window.location.href = "/id";
      }
      if (cLang == "el") {
        window.location.href = "/el";
      }
    }
  }, []);

  const handleLangSelection = (itemValue, itemIndex) => {
    if (itemIndex == 0) {
      document.cookie = "lang=en;";
    }
    if (itemIndex == 1) {
      window.location.href = "/es";
      document.cookie = "lang=es;";
    }
    if (itemIndex == 2) {
      window.location.href = "/id";
      document.cookie = "lang=id;";
    }
    if (itemIndex == 3) {
      window.location.href = "/el";
      document.cookie = "lang=el;";
    }
  };
  return (
    <Tabs
      screenOptions={
        {
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
        }
      }
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Websearch via Camera",
          tabBarAccessibilityLabel: "Go to Homepage",
          tabBarIcon: () => <TabBarIcon name="home" color={"rebeccapurple"} />,
          tabBarLabelStyle: {
            color: "rebeccapurple",
          },
          headerRight: () => (
            <Picker
              className="m-10"
              selectedValue={0}
              onValueChange={(itemValue, itemIndex) =>
                handleLangSelection(itemValue, itemIndex)
              }
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Español" value="es" />
              <Picker.Item label="Indonesian" value="id" />
              <Picker.Item label="Ελληνικά" value="el" />
            </Picker>
          ),
        }}
      />
      <Tabs.Screen
        name="upload_a_picture"
        options={{
          title: "Upload a Picture",
          tabBarAccessibilityLabel: "Upload a Picture",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="camera" color={"darkslategray"} />
          ),
          tabBarLabelStyle: {
            color: "darkslategray",
          },
          headerRight: () => (
            <Link href="/info" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
