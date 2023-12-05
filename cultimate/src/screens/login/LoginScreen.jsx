import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { loginUser } from "../../api/user";
import Logo from "../../../assets/login/logo_new.svg";
import * as Font from "expo-font";

const LoginScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "Integral CF": require("../../../assets/fonts/Integral_CF_medium.otf"),
        Inter: require("../../../assets/fonts/Inter.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFont();
  }, []);

  //   return (
  //     <View className="flex-1">
  //       <View
  //         style={{ marginTop: insets.top, marginBottom: insets.bottom }}
  //         className="flex-1 justify-center mx-8"
  //       >
  //         <View style={{
  //           alignItems: 'center',
  //           marginBottom: 30
  //           }}>
  //           <Image
  //             style={styles.centeredImage}
  //             source={require("../../../assets/icono-cultimate.png")}
  //           />
  //         </View>
  //         <View className="space-y-2 mb-6">
  //           <Text className="font-bold text-2xl">Sign In</Text>
  //           <Text className="text-sm text-gray-500">
  //             Hi there! Nice to see you again.
  //           </Text>
  //         </View>
  //         <View className="mb-4">
  //           <TextInputLogin
  //             label={"E-mail"}
  //             placeholder={"E-mail"}
  //             inputMode={"email"}
  //             onChangeText={setEmail}
  //           />
  //           <TextInputLogin
  //             label={"Password"}
  //             placeholder={"Password"}
  //             inputMode={"text"}
  //             onChangeText={setPassword}
  //             secureTextEntry
  //           />
  //         </View>
  //         <TouchableOpacity
  //           className="items-center bg-green-700 py-3 rounded-lg"
  //           onPress={() => getUser()}
  //         >
  //           <Text className="text-white font-bold text-lg">Sign in</Text>
  //         </TouchableOpacity>
  //         <View className="flex-row my-8 justify-center space-x-1">
  //           <Text className="text-gray-500">Not registered?</Text>
  //           <TouchableOpacity
  //             className=""
  //             onPress={() => navigation.navigate("RegisterScreen")}
  //           >
  //             <Text className="text-green-700 font-bold">Sign up</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };

  // const styles = StyleSheet.create({
  //   centeredImage: {
  //     width: 270, // Adjust the size as needed
  //     height: 270, // Adjust the size as needed
  //   },
  // });

  if (!fontsLoaded) {
    return (
      <View className="items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        style={styles.pumpkin}
        source={require("../../../assets/login/pumpkin.png")}
      />
      <Image
        style={styles.broccoli}
        source={require("../../../assets/login/broccoli.png")}
      />
      <Image
        style={styles.tomato}
        source={require("../../../assets/login/tomato.png")}
      />
      <Image
        style={styles.carrot}
        source={require("../../../assets/login/carrot.png")}
      />
      <Image
        style={styles.pepper}
        source={require("../../../assets/login/pepper.png")}
      />
      <Image
        style={styles.lemon}
        source={require("../../../assets/login/lemon.png")}
      />
      <Image
        style={styles.lettuce}
        source={require("../../../assets/login/lettuce.png")}
      />
      <View className="flex-1 items-center justify-center">
        <View>
          <Logo />
        </View>
      </View>
      <View className="flex-1 items-center">
        <Text style={styles.welcomeText}>BIENVENIDO</Text>
        <View className="space-y-[30] my-[35]">
          <TextInput
            style={styles.input}
            placeholder="CORREO ELECTRÓNICO"
            onChangeText={setEmail}
            inputMode="email"
          />
          <TextInput
            style={styles.input}
            placeholder="CONTRASEÑA"
            onChangeText={setPassword}
            inputMode="text"
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => getUser()}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.registerText}>
          ¿Quieres crear tu propio huerto?
        </Text>
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={() => navigation.navigate("RegisterScreen1")}
        >
          <Text style={styles.subscribeButtonText}>Suscríbete aquí</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  pumpkin: {
    width: 130,
    height: 137,
    top: -67,
    right: -30,
    position: "absolute",
  },
  broccoli: {
    width: 135,
    height: 151,
    top: -26,
    left: -32,
    position: "absolute",
  },
  tomato: {
    width: 154,
    height: 129.2,
    transform: [{ rotate: "75.26deg" }],
    left: -53,
    bottom: "47%",
    position: "absolute",
  },
  carrot: {
    width: 95,
    height: 102.3,
    right: 15,
    bottom: "52%",
    position: "absolute",
  },
  pepper: {
    width: 162,
    height: 147,
    right: -32,
    bottom: "19.2%",
    position: "absolute",
  },
  lemon: {
    width: 105.645,
    height: 125,
    transform: [{ rotate: "-35.159deg" }],
    left: -12,
    bottom: "6.2%",
    position: "absolute",
  },
  lettuce: {
    width: 119,
    height: 105,
    right: 73,
    bottom: -29,
    position: "absolute",
  },
  welcomeText: {
    color: "black",
    fontFamily: "Integral CF",
    fontSize: 18,
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
    fontWeight: 500,
  },
  registerText: {
    color: "#939393",
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: 400,
  },
  loginButton: {
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 30,
    borderColor: "black",
    padding: 22,
    borderWidth: 1,
    backgroundColor: "#09873D",
    marginTop: 15,
  },
  loginText: {
    color: "white",
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: 400,
  },
  subscribeButton: {
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 30,
    borderColor: "black",
    padding: 22,
    borderWidth: 1,
    backgroundColor: "white",
    marginTop: 15,
  },
  subscribeButtonText: {
    color: "black",
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: 400,
  },
});

export default LoginScreen;
