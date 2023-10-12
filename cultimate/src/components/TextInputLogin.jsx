import React from "react";
import { TextInput, StyleSheet } from "react-native";

const TextInputLogin = ({ placeholder, secureTextEntry, onChangeText }) => {
  return (
    <TextInput
      className="h-10 m-3 p-2 border-2 border-solid border-black rounded-md"
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
    />
  );
};

export default TextInputLogin;
