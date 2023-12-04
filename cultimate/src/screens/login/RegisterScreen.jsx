import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextInputLogin from "../../components/TextInputLogin";
import CheckIcon from "../../../assets/check-solid.svg";
import classnames from "classnames";
import config from "../../../config";
import validator from "validator";
import * as SecureStore from "expo-secure-store";
import {
  checkDuplicateUsername,
  checkDuplicateEmail,
  registerUser,
} from "../../api/user";
import { checkValidEmail } from "../../utils/user";

const RegisterScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [check, setCheck] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const setUser = async () => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      Alert.alert("Error", "You must fill all the fields");
      return;
    }
    if (!checkValidEmail(email)) {
      Alert.alert("Error", "The email is not valid");
      return;
    }
    if (!(await checkDuplicateUsername(username))) {
      Alert.alert("Error", "The username is already taken");
      return;
    }
    if (!(await checkDuplicateEmail(email))) {
      Alert.alert("Error", "The email is already taken");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "The passwords do not match");
      return;
    }
    if (!check) {
      Alert.alert("Error", "You must accept the terms and conditions");
      return;
    }
    const response = await registerUser(username, password, email);
    if (response) {
      navigation.navigate("navigation");
    }
  };

  // return (
  //   <View className="flex-1">
  //     <View
  //       style={{ marginTop: insets.top, marginBottom: insets.bottom }}
  //       className="flex-1 justify-center mx-8"
  //     >
  //       <View className="space-y-2 mb-6">
  //         <Text className="font-bold text-2xl">Sign Up</Text>
  //       </View>
  //       <View className="mb-4">
  //         <TextInputLogin
  //           label={"Username"}
  //           placeholder={"Username"}
  //           onChangeText={setUsername}
  //         />
  //         <TextInputLogin
  //           label={"E-mail"}
  //           placeholder={"E-mail"}
  //           onChangeText={setEmail}
  //         />
  //         <TextInputLogin
  //           label={"Password"}
  //           placeholder={"Password"}
  //           onChangeText={setPassword}
  //           secureTextEntry
  //         />
  //         <TextInputLogin
  //           label={"Confirm password"}
  //           placeholder={"Password"}
  //           onChangeText={setConfirmPassword}
  //           secureTextEntry
  //         />
  //       </View>
  //       <View className="mb-4 flex-row space-x-2">
  //         <TouchableOpacity
  //           accessibilityRole={"checkbox"}
  //           checked={check}
  //           onPress={() => setCheck(!check)}
  //           className={classnames(
  //             "w-7 h-7 border-2 rounded-md p-0.5",
  //             check ? "border-green-700 bg-green-700" : "border-gray-400"
  //           )}
  //         >
  //           {check ? <CheckIcon fill="white" /> : <CheckIcon fill="gray" />}
  //         </TouchableOpacity>
  //         <Text className="flex-1" numberOfLines={2}>
  //           I agree to the Terms of Services and Privacy Policy
  //         </Text>
  //       </View>
  //       <TouchableOpacity
  //         className="items-center bg-green-700 py-3 rounded-lg"
  //         onPress={() => setUser()}
  //       >
  //         <Text className="text-white font-bold text-lg">Continue</Text>
  //       </TouchableOpacity>
  //       <View className="flex-row my-8 justify-center space-x-1">
  //         <Text className="text-gray-500">Have an account?</Text>
  //         <TouchableOpacity
  //           className=""
  //           onPress={() => navigation.navigate("LoginScreen")}
  //         >
  //           <Text className="text-green-700 font-bold">Sign In</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </View>
  // );
  return (
    <View style={styles.bg}>
      <View style={styles.modal}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#09873D",
    flex: 1,
  },
  modal: {
    backgroundColor: "#fff",
    height: "50%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

export default RegisterScreen;
