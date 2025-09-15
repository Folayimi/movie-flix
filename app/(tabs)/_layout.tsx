import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import tw from "twrnc";

const TabIcon = ({ focused, icons, title }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        style={tw`flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4  justify-center items-center rounded-full overflow-hidden`}
      >
        <Image source={icons} tintColor="#151312" style={tw`size-4`} />
        <Text style={tw`text-purple-900 text-sm font-semibold ml-2`}>
          {title}
        </Text>
      </ImageBackground>
    );
  } else {
    return (
      <View style={tw`size-full justify-center items-center mt-4 rounded-full`}>
        <Image source={icons} tintColor="#A8B5DB" style={tw`size-4`} />
      </View>
    );
  }
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
            backgroundColor: "#0f0D23",
            borderRadius: 50,
            marginHorizontal: 10,
            marginBottom: 10,
            height:52,
            position: 'absolute',
            overflow:'hidden',
            borderWidth:0,
            borderColor: '0f0D23',
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icons={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icons={icons.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icons={icons.save} title="Saved" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icons={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
