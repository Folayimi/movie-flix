import { icons } from "@/constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { CameraIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const Profile = () => {
  const router = useRouter();
  const [deviceInfo, setDeviceInfo] = useState<any>({});
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    prof_image: "",
  });

  // Load device info and profile data
  useEffect(() => {
    const getProfile = async () => {
      const info = {
        device: {
          name: Device.deviceName,
          type: Device.deviceType,
          os: `${Device.osName}`,
          model: Device.modelName,
        },
        Identifiers: {
          installationId: Constants.installationId,
          androidId:
            Platform.OS === "ios"
              ? await Application.getIosIdForVendorAsync()
              : Platform.OS === "android"
              ? await Application.getAndroidId()
              : null,
        },
      };
      setDeviceInfo(info);
      console.log("Device Info:", info);
      AsyncStorage.clear();
      const profileString = await AsyncStorage.getItem("userData");
      const profileData = profileString ? JSON.parse(profileString) : {};
      setUserData((prev) => ({ ...prev, ...profileData }));
    };

    getProfile();
  }, []);

  // Pick file
  const pickDoc = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (result.assets && result.assets.length > 0) {
        console.log("Picked:", result.assets[0]);
        const newUserData = { ...userData, prof_image: result.assets[0].uri };
        setUserData(newUserData);
        console.log(newUserData);
        await AsyncStorage.setItem("userData", JSON.stringify(newUserData));
      }
    } catch (error) {
      console.error("An error occurred while selecting file:", error);
    }
  };

  return (
    <SafeAreaView style={tw`bg-blue-950 flex-1 px-[10px]`}>
      <View style={tw`flex justify-start items-start flex-1 flex-col gap-5`}>
        <View style={tw`w-full flex-row items-center justify-between`}>
          <TouchableOpacity
            style={tw`bg-purple-800 w-[40px] h-[40px] mb-5 mt-2 rounded-full justify-center items-center`}
            onPress={() => {
              router.back();
            }}
          >
            <ChevronLeftIcon size={25} color="white" />
          </TouchableOpacity>

          <Text style={tw`text-sm mr-[40%] text-center text-white font-bold`}>
            {deviceInfo?.device?.name}
          </Text>
        </View>

        {/* Profile Image */}
        <View style={tw`w-full p-[10px] flex items-center justify-center`}>
          <View style={tw`relative`}>
            <Image
              source={
                userData.prof_image ? { uri: userData.prof_image } : icons.empty
              }
              style={tw`w-50 h-50 rounded-full`}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={tw`absolute bottom-[10px] right-[15px] z-20 bg-purple-800 rounded-full p-[10px]`}
              onPress={pickDoc}
            >
              <CameraIcon size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`w-full flex-col gap-[15px] px-[10px]`}>
          <Text style={tw`text-sm font-bold text-white`}>Device Info</Text>
          <View
            style={tw`w-full flex-col gap-[20px] bg-blue-800 rounded-[10px] p-[20px]`}
          >
            <View style={tw`w-full flex-row justify-between items-center`}>
              <Text style={tw`text-sm font-bold text-white`}>Model</Text>
              <Text style={tw`text-sm font-bold text-white`}>
                {deviceInfo?.device?.model}
              </Text>
            </View>
            <View style={tw`w-full flex-row justify-between items-center`}>
              <Text style={tw`text-sm font-bold text-white`}>OS</Text>
              <Text style={tw`text-sm font-bold text-white`}>
                {deviceInfo?.device?.os}
              </Text>
            </View>
            <View style={tw`w-full flex-row justify-between items-center`}>
              <Text style={tw`text-sm font-bold text-white`}>DeviceId</Text>
              <Text style={tw`text-sm font-bold text-white`}>
                {deviceInfo?.Identifiers?.androidId}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
