import React from "react";
import { TextInput, View, Text } from "react-native";

const InputField = ({
  label,
  inputMode,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <View className="mb-[8]">
      <Text
        style={{
          color: "#939393",
          fontFamily: "Inter",
          fontSize: 14,
          fontWeight: "500",
        }}
      >
        {label}
      </Text>
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#DBDBDB",
          fontSize: 16,
          paddingVertical: 8,
        }}
        label={label}
        inputMode={inputMode}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default InputField;
