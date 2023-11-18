import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextInputLogin from "../../components/TextInputLogin";
import FacebookF from "../../../assets/facebook-f.svg";
import TwitterX from "../../../assets/x-twitter.svg";
import config from "../../../config";
import * as SecureStore from "expo-secure-store";

const LoginScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getUser = async () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    try {
      const api_call = await fetch(
        `${config.API}/user/login?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`,
        { method: "GET" }
      );
      if (api_call.status == 401) {
        Alert.alert("Error", "Wrong email or password");
        return;
      }
      const response = await api_call.json();
      await SecureStore.setItemAsync("accesstoken", response.accesstoken);
      // to retreieve the token:
      // const token = await SecureStore.getItemAsync('accesstoken');
      navigation.navigate("navigation");
    } catch (e) {
      console.error(e);
      Alert.alert("Network error");
    }
  };

  return (
    <View className="flex-1">
      <View
        style={{ marginTop: insets.top, marginBottom: insets.bottom }}
        className="flex-1 justify-center mx-8"
      >
        <View className="space-y-2 mb-6">
          <Text className="font-bold text-2xl">Sign In</Text>
          <Text className="text-sm text-gray-500">
            Hi there! Nice to see you again.
          </Text>
        </View>
        <View className="mb-4">
          <TextInputLogin
            label={"E-mail"}
            placeholder={"E-mail"}
            inputMode={"email"}
            onChangeText={setEmail}
          />
          <TextInputLogin
            label={"Password"}
            placeholder={"Password"}
            inputMode={"text"}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          className="items-center bg-green-700 py-3 rounded-lg"
          onPress={() => getUser()}
        >
          <Text className="text-white font-bold text-lg">Sign in</Text>
        </TouchableOpacity>
        <View className="items-center my-4">
          <Text className="text-gray-500">
            Or use one of your social profiles
          </Text>
        </View>
        <View className="flex-row space-x-4 h-12">
          <TouchableOpacity className="flex-1 items-center bg-slate-950 py-3 rounded-lg flex-row">
            <TwitterX fill="white" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center bg-blue-700 py-3 rounded-lg">
            <FacebookF fill="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row my-8 justify-center space-x-1">
          <Text className="text-gray-500">Forgot Password?</Text>
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text className="text-green-700 font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
