import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity style={tw`w-[30%]`}>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          style={tw`w-full h-52 rounded-lg`}
          resizeMode="cover"
        />
        <Text style={tw`text-sm font-bold text-white mt-2`} numberOfLines={1}>
          {title}
        </Text>
        <View style={tw`flex-row items-center justify-start gap-x-1`}>
          <Image source={icons.star} style={tw`size-4`} />
          <Text style={tw`text-sm text-white font-bold uppercase`}>
            {Math.round(vote_average)}
          </Text>
        </View>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-xs text-gray-300 font-medium mt-1`}>
            {release_date?.split("-")[0]}
          </Text>
          {/* <Text style={tw`text-xs font-medium text-light-300 uppercase`}>
            Movie
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
