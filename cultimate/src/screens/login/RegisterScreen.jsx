import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextInputLogin from "../../components/TextInputLogin";
import CheckIcon from "../../../assets/check-solid.svg";
import classnames from "classnames";
import config from '../../../config';
const RegisterScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [check, setCheck] = useState(false);
  const [nombre, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = async () => {
    try {
        const requestBody = {
            nombre: nombre,
            contra: password,
            email: email,
        };

        const api_call = await fetch(`${config.API}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const result = await api_call.json();

        if (result != null) {
            navigation.navigate("navigation");
        }
    } catch (e) {
        console.error(e);
        Alert.alert(
            'Problema de red',
            'No se ha podido mostrar el listado de plantas debido a un problema de red.'
        );
    }
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
            label={"User name"}
            placeholder={"User name"}
            onChangeText={setName}
          />
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
          onPress={() =>setUser()}
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
