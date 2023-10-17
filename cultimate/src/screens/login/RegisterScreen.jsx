import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextInputLogin from "../../components/TextInputLogin";
import { CheckBox } from "@rneui/themed";
import FacebookF from "../../../assets/facebook-f.svg";
import TwitterX from "../../../assets/x-twitter.svg";
import CheckIcon from "../../../assets/check-solid.svg";
import classnames from "classnames";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinue = () => {
    check ? navigation.navigate("navigation") : null;
  };

  return (
    <View className="flex-1">
      <View
        style={{ marginTop: insets.top, marginBottom: insets.bottom }}
        className="flex-1 justify-center mx-8"
      >
        <View className="space-y-2 mb-6">
          <Text className="font-bold text-2xl">Sign Up</Text>
        </View>
        <View className="mb-4">
          <TextInputLogin
            label={"E-mail"}
            placeholder={"E-mail"}
            onChangeText={setEmail}
          />
          <TextInputLogin
            label={"Password"}
            placeholder={"Password"}
            onChangeText={setPassword}
          />
        </View>
        <View className="mb-4 flex-row space-x-2">
          <TouchableOpacity
            accessibilityRole={"checkbox"}
            checked={check}
            onPress={() => setCheck(!check)}
            className={classnames(
              "w-7 h-7 border-2 rounded-md p-0.5",
              check ? "border-green-700 bg-green-700" : "border-gray-400"
            )}
          >
            {check ? <CheckIcon fill="white" /> : <CheckIcon fill="gray" />}
          </TouchableOpacity>
          <Text className="flex-1" numberOfLines={2}>
            I agree to the Terms of Services and Privacy Policy
          </Text>
        </View>
        <TouchableOpacity
          className="items-center bg-green-700 py-3 rounded-lg"
          onPress={() => handleContinue()}
        >
          <Text className="text-white font-bold text-lg">Continue</Text>
        </TouchableOpacity>
        <View className="flex-row my-8 justify-center space-x-1">
          <Text className="text-gray-500">Have an account?</Text>
          <TouchableOpacity
            className=""
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text className="text-green-700 font-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
