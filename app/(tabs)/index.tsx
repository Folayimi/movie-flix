import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import tw from "twrnc";

export default function Index() {
  const router = useRouter();
  return (
    <View style={tw`flex-1 bg-blue-950`}>
      <Image source={images.bg} style={tw`absolute w-full h-full z-0`} />
      <ScrollView style={tw`flex-1 px-5`} showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:'100%', paddingBottom:10}}>  
        <Image source={icons.logo} style={tw`w-12 h-10 mt-20 mb-5 mx-auto`} />
        <View style={tw`flex-1 mt-5`}>
          <SearchBar 
            onPress={() => { router.push('/search'); }}
            placeholder="Search for a movie"
          />
        </View>
      </ScrollView>
    </View>
  );
}
