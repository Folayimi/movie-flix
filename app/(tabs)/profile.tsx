import { icons } from "@/constants/icons";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const Profile = () => {
  return (
    <SafeAreaView style={tw`bg-blue-950 flex-1 px-10`}>
      <View style={tw`flex justify-center items-center flex-1 flex-col gap-5`}>
        <Image source={icons.person} style={tw`size-10`} tintColor="#fff" />
        <Text style={tw`text-gray-500 text-base`}>Profile</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
