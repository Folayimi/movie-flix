import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appWrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import tw from "twrnc";

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const [reload, setReload] = useState(false);

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies, reload);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }), reload);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      // await Promise.all([getTrendingMovies(), fetchMovies({ query: "" })]);
      setReload(!reload);
    } catch (error) {
      console.log("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <View style={tw`flex-1 bg-blue-950`}>
      <Image source={images.bg} style={tw`absolute w-full h-full z-0`} />
      <ScrollView
        style={tw`flex-1 px-5`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#ff0000", "#00ff00", "#0000ff"]}
            tintColor="#ff0000"
            title="Refreshing..."
            titleColor="#000"
          />
        }
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
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={tw`w-4`} />}
                data={trendingMovies}
                style={tw`mb-4 mt-3`}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index} />
                )}
                keyExtractor={(item) => item.movie_id.toString()}
              />

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


// const SectionListBasics = () => {
//   return (
//     <View style={styles.container}>
//       <SectionList
//         sections={[
//           {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
//           {
//             title: 'J',
//             data: [
//               'Jackson',
//               'James',
//               'Jillian',
//               'Jimmy',
//               'Joel',
//               'John',
//               'Julie',
//             ],
//           },
//         ]}
//         renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
//         renderSectionHeader={({section}) => (
//           <Text style={styles.sectionHeader}>{section.title}</Text>
//         )}
//         keyExtractor={item => `basicListEntry-${item}`}
//       />
//     </View>
//   );
// };
