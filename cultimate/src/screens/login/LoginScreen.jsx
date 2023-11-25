import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image, StyleSheet} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextInputLogin from "../../components/TextInputLogin";
import { loginUser } from "../../api/user";

const LoginScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getUser = async () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    const response = await loginUser(email, password);
    if (response) {
      navigation.navigate("navigation");
    }
  };

  return (
    <View className="flex-1">
      <View
        style={{ marginTop: insets.top, marginBottom: insets.bottom }}
        className="flex-1 justify-center mx-8"
      >
        <View style={{
          alignItems: 'center',
          marginBottom: 30
          }}>
          <Image
            style={styles.centeredImage}
            source={require("../../../assets/icono-cultimate.png")}
          />
        </View>
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
        <View className="flex-row my-8 justify-center space-x-1">
          <Text className="text-gray-500">Not registered?</Text>
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

const styles = StyleSheet.create({
  centeredImage: {
    width: 270, // Adjust the size as needed
    height: 270, // Adjust the size as needed
  },
});

export default LoginScreen;
