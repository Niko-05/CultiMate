import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextInputLogin from "../../components/TextInputLogin";
import FacebookF from "../../../assets/facebook-f.svg";
import TwitterX from "../../../assets/x-twitter.svg";
import classnames from "classnames";

const LoginScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-red-100">
      <View
        style={{ marginTop: insets.top, marginBottom: insets.bottom }}
        className="flex-1 bg-blue-100 justify-center mx-8"
      >
        <View className="space-y-2 mb-6">
          <Text className="font-bold text-2xl">Sign In</Text>
          <Text className="text-sm text-gray-500">
            Hi there! Nice to see you again.
          </Text>
        </View>
        <View className="mb-4">
          <TextInputLogin label={"E-mail"} placeholder={"E-mail"} />
          <TextInputLogin label={"Password"} placeholder={"Password"} />
        </View>
        <TouchableOpacity className="items-center bg-green-700 py-3 rounded-lg">
          <Text className="text-white font-bold text-lg">Sign in</Text>
        </TouchableOpacity>
        <View className="items-center my-4">
          <Text className="text-gray-500">
            Or use one of your social profiles
          </Text>
        </View>
        <View className="flex-row space-x-4">
          <TouchableOpacity className="flex-1 items-center bg-slate-950 py-3 rounded-lg">
            <Text className="text-white font-bold text-lg">X</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center bg-blue-700 py-3 rounded-lg">
            <Text className="text-white font-bold text-lg">Facebook</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row my-8">
          <Text className="flex-1 text-gray-500">Forgot Password?</Text>
          <TouchableOpacity className="">
            <Text className="text-green-700 font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
