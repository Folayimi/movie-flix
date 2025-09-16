import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
// import { forgotPassword } from "../services/request";
// import TermsPrivacy from "./collections/TermsPrivacy";

const Forgot = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState<any>(null);
  const [popUp, setPopUp] = useState(false);

  const sendEmailRequest = async () => {
    // await forgotPassword({ email }, setPopUp, setModal);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setEmail("");
  };

  const handleSubmit = () => {
    if (email && emailRegex.test(email)) {
      setLoading(true);
      sendEmailRequest();
    }
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-blue-950 pt-8 pb-12`}>
      <Image source={images.bg} style={tw`absolute w-full h-full z-0`} />
      {popUp && modal}

      {/* Logo */}
      <Link href="/" asChild>
        <TouchableOpacity style={tw`w-20 h-20 items-center justify-center`}>
          <Image
            source={icons.logo}
            style={tw`w-full h-full`}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Link>

      {/* Reset Form */}
      <View style={tw`w-80 px-6 py-10 items-center`}>
        <Text style={tw`text-2xl font-bold text-white mb-6`}>
          Reset your password
        </Text>
        <Text style={tw`text-sm text-center text-white mb-4`}>
          Enter your email and we will send you instructions to reset your
          password
        </Text>

        <TextInput
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          style={tw`border-2 border-blue-800 text-white bg-transparent shadow-sm w-full p-3 mb-4 rounded-lg`}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="gray"
        />

        <TouchableOpacity
          onPress={handleSubmit}
          style={tw`bg-white w-full rounded-lg py-3 items-center mb-6`}
        >
          {loading ? (
            <ActivityIndicator color="blue" />
          ) : (
            <Text style={tw`text-blue-950 font-semibold`}>Continue</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={tw`w-full items-center border-blue-800 border-b-2 mb-6`}>
          <Text style={tw`absolute -bottom-2 bg-blue-950 px-2 text-white`}>
            OR
          </Text>
        </View>

        {/* Back to login */}
        <Link href="/" asChild>
          <TouchableOpacity>
            <Text style={tw`text-blue-500 underline mb-4`}>
              Go back to Log in
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Google Auth */}
        <TouchableOpacity
          style={tw`flex-row items-center gap-3 border-2 border-blue-800 rounded px-4 py-3`}
        >
          {/* <Image
            source={require("../assets/google-icn.png")}
            style={tw`w-6 h-6`}
            resizeMode="contain"
          /> */}
          <Text style={tw`text-white`}>Continue with Google</Text>
        </TouchableOpacity>
      </View>

      {/* Terms & Privacy */}
      {/* <TermsPrivacy /> */}
    </View>
  );
};

export default Forgot;
