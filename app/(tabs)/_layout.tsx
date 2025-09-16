import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const { Navigator } = createMaterialTopTabNavigator();

// 👇 Create a Tabs wrapper using MaterialTopTabs instead of BottomTabs
export const Tabs = withLayoutContext(Navigator);

const TabIcon = ({ focused, icons, title }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        style={tw`flex flex-row w-full flex-1 min-w-[80px] min-h-[40px] mt-[-8px] ml-[-30px] justify-center items-center rounded-full overflow-hidden`}
      >
        <Image source={icons} tintColor="#151312" style={tw`size-4`} />
        <Text style={tw`text-purple-900 text-sm font-semibold ml-2`}>
          {title}
        </Text>
      </ImageBackground>
    );
  } else {
    return (
      <View style={tw`size-full justify-center items-center rounded-full`}>
        <Image source={icons} tintColor="#A8B5DB" style={tw`size-4`} />
      </View>
    );
  }
};

export default function Layout() {
  return (
    <Tabs
      tabBarPosition="bottom"
      tabBar={(props) => {
        return (
          <SafeAreaView
            edges={["bottom"]} // 👈 only care about bottom safe area
            style={{ backgroundColor: "transparent" }}
          >
            <View
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                right: 10,
              }}
            >
              <MaterialTopTabBar {...props} />
            </View>
          </SafeAreaView>
        );
      }}
      screenOptions={{
        swipeEnabled: true,
        tabBarShowLabel: false,
        tabBarStyle: {                  
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          height: 52,
          overflow: "hidden",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} icons={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} icons={icons.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} icons={icons.save} title="Saved" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} icons={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
