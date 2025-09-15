import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import tw from "twrnc";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?:string;
  onChangeText?: (text:string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View style={tw`flex-row items-center bg-blue-950 rounded-full px-5 py-4`}>
      <Image
        source={icons.search}
        style={tw`size-5`}
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={tw`flex-1 ml-3 text-white`}
        placeholderTextColor="#a8b5db"
      />
    </View>
  );
};

export default SearchBar;
