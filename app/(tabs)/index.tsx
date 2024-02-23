import React, { useState } from 'react';

import { ScrollView, Text, View, Pressable} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Link } from 'expo-router';

import { styled } from 'nativewind';
import '../../assets/styles.css';
const StyledView = styled(View);
const StyledText = styled(Text);

export default function TabOneScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState();
  
  return (
    <StyledView className="flex-2 items-center justify-center bg-white">
      
      <StyledView className="justify-center">
      <StyledText className=" text-2xl m-12">Find what you’re looking for with just an image.</StyledText>
      </StyledView>
      <StyledText  className="text-l p-4">Select your language:</StyledText>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Espanol" value="es" />
      </Picker>



      <button className="mt-20 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
      <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
      <span>Start</span>
      </button>
      <StyledText className="text-l p-4">
      Upload an image to begin your Search!
      </StyledText>
      <Link href="/modal" asChild>
          <Pressable>
              <StyledText className="text-xl font-bold text-blue-600 m-12">How It Works?</StyledText>
         </Pressable>
      </Link>
      <Link href="/privacy policy" asChild>
          <Pressable>
              <StyledText className="text-small font-bold text-blue-600 mb-12">Privacy Policy</StyledText>
         </Pressable>
      </Link>
    </StyledView>
  );
}