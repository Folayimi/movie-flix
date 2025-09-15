import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appWrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import tw from "twrnc";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  return (
    <View style={tw`flex-1 bg-blue-950`}>
      <Image source={images.bg} style={tw`absolute w-full h-full z-0`} />
      <ScrollView
        style={tw`flex-1 px-5`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} style={tw`w-12 h-10 mt-20 mb-5 mx-auto`} />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={tw`mt-10 self-center`}
          />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View style={tw`flex-1 mt-5`}>
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie, tv show, person..."
            />
            {trendingMovies && (
              <View style={tw`mt-10`}>
                <Text style={tw`text-lg text-white font-bold mb-3`}>
                  Trending Movies
                </Text>
              </View>
            )}
            <>
              <Text style={tw`text-lg text-white font-bold mt-5 mb-3`}>
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => {
                  return <MovieCard {...item} />;
                }}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                style={tw`mt-2 pb-32`}
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
