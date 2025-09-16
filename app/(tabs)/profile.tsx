import { icons } from "@/constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { CameraIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const useDeviceInfo = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const loadData = async () => {
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
      setData(info);
    };
    loadData();
  }, []);

  return data;
};

const Profile = async () => {
  const data = await AsyncStorage.getItem("userData")  
  const profileData:any = data ? JSON.parse(data) : {}
  const [userData, setUserData] = useState({
    first_name: profileData || "",
    last_name: "",
    email: "",
    prof_image: "",
  });
  const deviceInfo = useDeviceInfo();
  console.log(deviceInfo);
  const pickDoc = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    if (result.assets && result.assets.length > 0) {
      console.log("Picked:", result.assets[0]);
      setUserData({ ...userData, prof_image: result.assets[0].uri });
    }
  };
  return (
    <SafeAreaView style={tw`bg-blue-950 flex-1 px-10`}>
      <View style={tw`flex justify-start items-start flex-1 flex-col gap-5`}>
        <View
          style={tw`bg-purple-800 w-[40px] h-[40px] mb-8 rounded-full justify-center items-center`}
        >
          <Image
            source={icons.arrow}
            style={tw`w-5 h-5 mr-1 mt-0.5 rotate-180`}
            tintColor="#fff"
          />
        </View>
        <View style={tw`w-full p-[10px] flex items-center justify-center`}>
          <View style={tw`relative`}>
            <Image
              source={
                userData.prof_image ? { uri: userData.prof_image } : icons.empty
              }
              style={tw`size-50 rounded-full`}
              tintColor="#fff"
            />
            <TouchableOpacity
              style={tw`absolute bottom-[20px] right-[40px] z-20`}
              onPress={pickDoc}
            >
              <CameraIcon size={40} color="purple" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={tw`text-gray-500 text-base`}>Profile</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
