import React from "react";
import { TextInput, View, Text } from "react-native";

const TextInputLogin = ({
  label,
  placeholder,
  secureTextEntry,
  onChangeText,
}) => {
  return (
    <View className="mb-3">
      <Text className="text-green-700 font-bold text-md">{label}</Text>
      <TextInput
        className="border-b-2 border-gray-300 py-2"
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextInputLogin;
