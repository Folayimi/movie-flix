import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import tw from "twrnc";
// import { userRegistration } from "../services/request";
// import TermsPrivacy from "./collections/TermsPrivacy";

const Register = () => {
  const router = useRouter();
  const [registerDetails, setRegisterDetails] = useState({
    email: "",
    password: "",
  });
  const [changing, setChanging] = useState(false);
  const [err, setErr] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showP, setShowP] = useState(false);
  const [modal, setModal] = useState<any>(null);
  const [popUp, setPopUp] = useState(false);

  const handleChange = (name: string, value: string) => {
    setRegisterDetails({ ...registerDetails, [name]: value });
    setChanging(!changing);
  };

  useEffect(() => {
    if (registerDetails.password && registerDetails.password.length >= 12) {
        
      setErr(false);
    } else if (registerDetails.password.length === 0) {
      setErr(false);
    } else if (registerDetails.password.length < 12) {
      setErr(true);
    }
  }, [changing]);

  const handleSubmit = async () => {
    if (registerDetails.email) {
      setNextStep(true);
    }
    if (
      registerDetails.email &&
      registerDetails.password &&
      registerDetails.password.length >= 12
    ) {
      setLoading(true);
      // await userRegistration(registerDetails, setPopUp, setModal);
      setTimeout(() => {
        setLoading(false);
        router.push("/(tabs)");
      }, 2000);
    }
  };

  return (
    <View style={tw`flex-1 items-center justify-center pt-8 pb-12 bg-blue-950`}>
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

      {/* Form */}
      <View style={tw`w-80 px-6 py-10 items-center`}>
        <Text style={tw`text-2xl font-bold text-center text-white mb-6`}>
          Create your account
        </Text>

        {/* Email */}
        <TextInput
          placeholder="Email address"
          value={registerDetails.email}
          onChangeText={(val) => handleChange("email", val)}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="gray"
          style={tw`border-2 border-blue-800 text-white bg-transparent shadow-sm w-full p-3 mb-4 rounded-lg`}
        />

        {/* Password */}
        {nextStep && (
          <View style={tw`w-full`}>
            <View
              style={tw`flex-row border-2 border-blue-800 items-center text-white bg-transparent shadow-sm w-full px-3 mb-2 rounded-lg`}
            >
              <TextInput
                placeholder="Password"
                value={registerDetails.password}
                onChangeText={(val) => handleChange("password", val)}
                secureTextEntry={!showP}
                placeholderTextColor="gray"
                style={tw`flex-1 p-3 text-white`}
              />
              <TouchableOpacity onPress={() => setShowP(!showP)}>
                {showP ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
              </TouchableOpacity>
            </View>

            {err && (
              <View style={tw`border-2 rounded border-white p-3 mb-4`}>
                <Text style={tw`text-sm text-white`}>Your password must contain:</Text>
                <Text style={tw`ml-4 text-sm text-white`}>• At least 12 characters</Text>
              </View>
            )}
          </View>
        )}

        {/* Submit Button */}
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

        {/* Already have account */}
        <Link href="/" asChild>
          <TouchableOpacity>
            <Text style={tw`text-blue-500 underline mb-4`}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Google Auth */}
        <TouchableOpacity
          style={tw`flex-row items-center gap-3 border-2 border-blue-800 rounded px-4 py-3`}
        >
          {/* <Image source={images.google} style={tw`w-6 h-6`} />           */}
          <Text style={tw`text-white`}>Continue with Google</Text>
        </TouchableOpacity>
      </View>

      {/* Terms & Privacy */}
      {/* <TermsPrivacy /> */}
    </View>
  );
};

export default Register;
