import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
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

const Login = () => {
  const router = useRouter();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [showP, setShowP] = useState(false);
  const [modal, setModal] = useState<any>(null);
  const [nextStep, setNextStep] = useState(false);

  const handleChange = (name: string, value: string) => {
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleSubmit = async () => {
    if (loginDetails.email) {
      setNextStep(true);
    }
    if (loginDetails.email && loginDetails.password) {
      setLoading(true);
      // await userLogin(loginDetails, setPopUp, setModal);
      setTimeout(() => {
        setLoading(false);
        router.push("/(tabs)");
      }, 2000);
    }
  };

  const handleGoogleAuthentication = async () => {
    setGLoading(true);
    // redirect to Google authentication flow
    // await googleAuthentication(setPopUp, setModal);
    setTimeout(() => {
      setGLoading(false);
    }, 2000);
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
      <View style={tw`w-80 p-6 items-center`}>
        <Text style={tw`text-2xl font-bold text-white mb-6`}>Welcome back</Text>

        <TextInput
          placeholder="Email address"
          value={loginDetails.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholderTextColor="gray"
          style={tw`border-2 border-blue-800 text-white bg-transparent shadow-sm w-full p-3 mb-4 rounded-lg`}
        />

        {nextStep && (
          <View style={tw`w-full mb-4`}>
            <View
              style={tw`flex-row border-2 border-blue-800 items-center text-white bg-transparent shadow-sm w-full px-3 mb-2 rounded-lg`}
            >
              <TextInput
                placeholder="Password"
                secureTextEntry={!showP}
                value={loginDetails.password}
                onChangeText={(text) => handleChange("password", text)}
                placeholderTextColor="gray"
                style={tw`flex-1 p-3 text-white`}
              />
              <TouchableOpacity onPress={() => setShowP(!showP)}>
                {showP ? (
                  <EyeSlashIcon size={20} style={tw`text-white`} />
                ) : (
                  <EyeIcon size={20} style={tw`text-white`} />
                )}
              </TouchableOpacity>
            </View>

            <Link href="/forgot" asChild>
              <TouchableOpacity>
                <Text style={tw`text-sm text-blue-500`}>Forgot password?</Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}

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

        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text style={tw`text-blue-500 underline mb-4`}>
              You do not have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Google Button */}
        <TouchableOpacity
          onPress={handleGoogleAuthentication}
          style={tw`flex-row items-center gap-3 border-2 border-blue-800 rounded px-4 py-3`}
        >
          {gLoading && <ActivityIndicator />}
          {/* <Image source={images.google} style={tw`w-6 h-6`} />           */}
          <Text style={tw`text-white`}>Continue with Google</Text>
        </TouchableOpacity>
      </View>

      {/* Terms */}
      {/* <TermsPrivacy /> */}
    </View>
  );
};

export default Login;
