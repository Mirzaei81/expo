import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import html2canvas from 'html2canvas';

const ScreenShot = ({ viewRef }) => {
  const takeScreenshot = () => {
    fetch("https://photopulse.kxci.us/record_usage/", {
                  method: "POST",
                  body: JSON.stringify({
                    interaction: "screenshot",
                  }),
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                });

    if (viewRef.current) {
      html2canvas(viewRef.current).then((canvas) => {
        // Create a data URL from the canvas
        const dataUrl = canvas.toDataURL('image/png');

        // Create a link to download the screenshot
        const link = document.createElement('a');
        link.download = 'kxci.us.png';
        link.href = dataUrl;
        link.click();
      });
    }
  };



  const renderContent = () => {
    return (
      <View style={{margin:20, alignItems:'center', justifyContent: 'center', flexDirection: 'row'}}>
        <Text>Click on this button for a screenshot.</Text>
        <Pressable onPress={takeScreenshot} style={{margin:5, backgroundColor: '#7E22CE', padding: 10, borderRadius: 10, alignItems: 'center'}}>
          <Text style={{color: 'white'}}>Take Screenshot</Text>
        </Pressable>
      </View>
    );
  };
  if (Platform.OS !== "web") {
    return null;
  } else {
    return (
      <View style={styles.container} collapsable={false}>
        {renderContent()}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default ScreenShot;
