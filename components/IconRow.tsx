import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import markdownToTxt from "markdown-to-txt";

const IconRow = ({ color, markDownResult }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [isMailAvailable, setIsMailAvailable] = useState(false);

  useEffect(() => {
    const checkMailAvailability = async () => {
      const availability = await MailComposer.isAvailableAsync();
      setIsMailAvailable(availability);
    };

    checkMailAvailability();
  }, []);

  const onLikePress = () => {
    fetch("https://photopulse.kxci.us/record_usage/", {
      method: "POST",
      body: JSON.stringify({
        interaction: "like",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLiked(true);
    setDisliked(false);
    setShowFeedbackInput(true);
  };

  const onDislikePress = () => {
    fetch("https://photopulse.kxci.us/record_usage/", {
      method: "POST",
      body: JSON.stringify({
        interaction: "dislike",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLiked(false);
    setDisliked(true);
    setShowFeedbackInput(true);
  };

  const submitFeedback = () => {
    fetch("https://photopulse.kxci.us/record_usage/", {
      method: "POST",
      body: JSON.stringify({
        interaction: feedback,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Feedback submitted:", feedback);
    setFeedback("");
    setShowFeedbackInput(false);
  };

  const sendMail = async () => {
    if (!isMailAvailable) {
      console.log("Mail composer is not available");
      return;
    }

    fetch("https://photopulse.kxci.us/record_usage/", {
      method: "POST",
      body: JSON.stringify({
        interaction: "send_mail",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await MailComposer.composeAsync({
      body: markdownToTxt(markDownResult),
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.iconRow, justifyContent: "space-between" }}>
        <View style={styles.iconRow}>
          <TouchableOpacity style={{ margin: 5 }} onPress={onLikePress}>
            <AntDesign
              name={liked ? "like1" : "like2"}
              size={24}
              color={color}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 5 }} onPress={onDislikePress}>
            <AntDesign
              name={disliked ? "dislike1" : "dislike2"}
              size={24}
              color={color}
            />
          </TouchableOpacity>
        </View>
        {isMailAvailable && (
          <TouchableOpacity
            style={{ margin: 5, alignContent: "center", alignSelf: "center" }}
            onPress={sendMail}
          >
            <Text style={{ color: color }}>Send Mail</Text>
          </TouchableOpacity>
        )}
      </View>
      {showFeedbackInput && (
        <View style={styles.feedbackContainer}>
          <TextInput
            style={{ ...styles.input, height: 100 }}
            onChangeText={setFeedback}
            value={feedback}
            placeholder="Enter your feedback"
            multiline={true}
          />
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: color }}
            onPress={submitFeedback}
          >
            <Text style={styles.buttonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  iconRow: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  feedbackContainer: {
    marginTop: 20,
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default IconRow;
