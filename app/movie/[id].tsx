import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import tw from "twrnc";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View style={tw`flex-col items-start justify-center mt-5`}>
    <Text style={tw`text-gray-200 font-normal text-sm`}>{label}</Text>
    <Text style={tw`text-gray-100 font-bold text-sm mt-2`}>
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if (loading)
    return (
      <SafeAreaView style={tw`bg-primary flex-1`}>
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <View style={tw`bg-blue-950 flex-1`}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            style={tw`w-full h-[550px]`}
            resizeMode="stretch"
          />

          <TouchableOpacity
            style={tw`absolute bottom-5 right-5 rounded-full w-14 h-14 bg-white flex items-center justify-center`}
          >
            <Image
              source={icons.play}
              style={tw`w-6 h-7 ml-1`}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>

        <View style={tw`flex-col items-start justify-center mt-5 px-5`}>
          <Text style={tw`text-white font-bold text-xl`}>{movie?.title}</Text>
          <View style={tw`flex-row items-center mt-2`}>
            <Text style={tw`text-gray-200 text-sm`}>
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text style={tw`text-gray-200 text-sm ml-1`}>
              {movie?.runtime}m
            </Text>
          </View>

          <View
            style={tw`flex-row items-center bg-purple-800 px-2 py-1 rounded-md mt-2`}
          >
            <Image source={icons.star} style={tw`w-4 h-4 mr-1`} />
            <Text style={tw`text-white font-bold text-sm`}>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text style={tw`text-gray-200 text-sm ml-1`}>
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View style={tw`flex flex-row justify-between w-1/2`}>
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((c) => c.name)
                .join(" • ") || "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={tw`absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50`}
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          style={tw`w-5 h-5 mr-1 mt-0.5 rotate-180`}
          tintColor="#fff"
        />
        <Text style={tw`text-white font-semibold text-base`}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
