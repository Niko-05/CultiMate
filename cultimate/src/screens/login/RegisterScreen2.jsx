import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  Switch,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { registerUserAddress } from "../../api/user";
import { checkValidEmail, checkNumerical } from "../../utils/user";
import ArrowBack from "../../../assets/login/arrow_back.svg";
import ArrowContinue from "../../../assets/login/arrow_continue.svg";

const RegisterScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const putAddress = async () => {
    if (
      address === "" ||
      city === "" ||
      state === "" ||
      country === "" ||
      postalCode === ""
    ) {
      Alert.alert("Error", "You must fill all the fields");
      return;
    }
    if (!checkNumerical(postalCode)) {
      Alert.alert("Error", "The postal code must be completely numerical");
      return;
    }
    const response = await registerUserAddress(
      address,
      city,
      state,
      country,
      postalCode
    );
    console.log(response);
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
    <KeyboardAvoidingView
      style={styles.bg}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.top}>
        <TouchableOpacity
          style={[styles.arrow, { marginTop: insets.top }]}
          onPress={() => navigation.navigate("RegisterScreen1")}
        >
          <ArrowBack />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/login/mushrooms_transparent.png")}
          style={styles.mushrooms}
        />
        <Text style={styles.formularioText}>Formulario</Text>
      </View>
      <View style={styles.modal}>
        <View className="items-center mt-[20] mb-[40] space-y-[10]">
          <Text style={styles.text}>DIRECCIÓN</Text>
          <View style={styles.switchContainer}>
            <View style={styles.switchHandle}></View>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="space-y-[20]"
          contentContainerStyle={{ alignItems: "center" }}
        >
          <TextInput
            style={styles.input}
            placeholder="DIRECCIÓN"
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="CIUDAD"
            onChangeText={setCity}
            inputMode="email"
          />
          <TextInput
            style={styles.input}
            placeholder="REGIÓN"
            onChangeText={setState}
            inputMode="email"
          />
          <TextInput
            style={styles.input}
            placeholder="PAÍS"
            onChangeText={setCountry}
          />
          <TextInput
            style={styles.input}
            placeholder="CÓDIGO POSTAL"
            onChangeText={setPostalCode}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => putAddress()}
          >
            <ArrowContinue width="20" height="20" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#09873D",
    flex: 1,
  },
  top: {
    flex: 0.3,
  },
  modal: {
    backgroundColor: "white",
    flex: 0.7,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
  },
  mushrooms: {
    width: 261,
    height: 169,
    position: "absolute",
    top: 10,
    right: -41,
  },
  formularioText: {
    color: "#FFF",
    fontFamily: "Integral CF",
    fontSize: 24,
    position: "absolute",
    bottom: 12,
    left: 30,
    lineHeight: 26,
  },
  arrow: {
    top: 10,
    left: 30,
  },
  text: {
    color: "#000",
    fontFamily: "Inter",
    fontSize: 14,
  },
  switchContainer: {
    width: 85,
    height: 20,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  switchHandle: {
    backgroundColor: "#2EC26A",
    width: "50%",
    borderWidth: 1,
    borderRadius: 20,
    position: "absolute",
    right: -1,
    top: -1,
    bottom: -1,
  },
  input: {
    borderRadius: 15,
    borderColor: "black",
    padding: 22,
    borderWidth: 1,
    backgroundColor: "white",
    width: 244,
    color: "black",
    fontFamily: "Inter",
    fontSize: 14,
  },
  continueButton: {
    width: 65,
    height: 31,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default RegisterScreen;
