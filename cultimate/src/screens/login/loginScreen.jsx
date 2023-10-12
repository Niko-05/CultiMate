import React from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextInputLogin from "../../components/TextInputLogin";
import classnames from "classnames";

const LoginScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-red-100">
      <View
        style={{ marginTop: insets.top, marginBottom: insets.bottom }}
        className="flex-1 bg-blue-100 items-center justify-center"
      >
        <TextInputLogin placeholder={"E-mail"} />
      </View>
    </View>
  );
};

export default LoginScreen;
