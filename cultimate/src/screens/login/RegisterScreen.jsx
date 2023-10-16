import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextInputLogin from "../../components/TextInputLogin";
import { CheckBox } from "@rneui/themed";
import FacebookF from "../../../assets/facebook-f.svg";
import TwitterX from "../../../assets/x-twitter.svg";
import classnames from "classnames";

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const [check, setCheck] = useState(false);

  return (
    <View className="flex-1 bg-red-100">
      <View
        style={{ marginTop: insets.top, marginBottom: insets.bottom }}
        className="flex-1 bg-blue-100 justify-center mx-8"
      >
        <View className="space-y-2 mb-6">
          <Text className="font-bold text-2xl">Sign Up</Text>
        </View>
        <View className="mb-4">
          <TextInputLogin label={"E-mail"} placeholder={"E-mail"} />
          <TextInputLogin label={"Password"} placeholder={"Password"} />
        </View>
        <TouchableOpacity checked={check} onChange={() => setCheck(!check)}>
          <Text>Hola</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center bg-green-700 py-3 rounded-lg">
          <Text className="text-white font-bold text-lg">Continue</Text>
        </TouchableOpacity>
        <View className="flex-row my-8 justify-center space-x-1">
          <Text className="text-gray-500">Have an account?</Text>
          <TouchableOpacity className="">
            <Text className="text-green-700 font-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
