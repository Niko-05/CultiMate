import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  getUserInfo,
  changeUsername,
  changeEmail,
  changePassword,
  checkDuplicateUsername,
  checkDuplicateEmail,
} from "../api/user";
import validator from "validator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowBack from "../../assets/login/arrow_back.svg";
import Edit from "../../assets/login/edit.svg";
import InputField from "../components/InputField";

function AccountSettings({ navigation }) {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const setUserInfo = async () => {
    const userinfo = await getUserInfo();
    console.log(userinfo);
    setUser(userinfo);
    setFullName(userinfo.fullName);
    setEmail(userinfo.email);
    setUsername(userinfo.username);
    setAddress(userinfo.address);
    setCity(userinfo.city);
    setState(userinfo.state);
    setCountry(userinfo.country);
    setPostalCode(userinfo.postalCode);
  };

  useEffect(() => {
    setUserInfo();
  }, []);

  const handleSubmitNewUsername = async () => {
    if (newUsername === "") {
      Alert.alert("Error", "You must fill all the fields");
      return;
    }
    if (!(await checkDuplicateUsername(newUsername))) {
      Alert.alert("Error", "The username is already taken");
      return;
    }
    const result = await changeUsername(newUsername);
    if (result) {
      Alert.alert("Success", "Username changed successfully");
      setUserInfo();
      setNewUsername("");
    }
  };

  const handleSubmitNewEmail = async () => {
    if (newEmail === "") {
      Alert.alert("Error", "You must fill all the fields");
      return;
    }
    if (!validator.isEmail(newEmail)) {
      Alert.alert("Error", "The email is not valid");
      return;
    }
    if (!(await checkDuplicateEmail(newEmail))) {
      Alert.alert("Error", "The email is already taken");
      return;
    }
    const result = await changeEmail(newEmail);
    if (result) {
      Alert.alert("Success", "Email changed successfully");
      setUserInfo();
      setNewEmail("");
    }
  };

  const handleSubmitNewPassword = async () => {
    if (password === "" || newPassword === "" || newPasswordConfirm === "") {
      Alert.alert("Error", "You must fill all the fields");
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      Alert.alert("Error", "The new passwords don't match");
      return;
    }
    if (password !== user.password) {
      Alert.alert("Error", "The current password is incorrect");
      return;
    }
    const result = await changePassword(newPassword);
    if (result) {
      Alert.alert("Success", "Password changed successfully");
      setUserInfo();
      setPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
    }
  };

  // return (
  //   <View className="flex-1">
  //     {Object.keys(user).length == 0 ? (
  //       <View className="flex-1 content-center justify-center">
  //         <ActivityIndicator size="large" color="#0000ff" />
  //       </View>
  //     ) : (
  //       <View className="flex-1 px-3 space-y-4 mt-4">
  //         <View className="space-y-3">
  //           <Text className="text-lg font-bold">Change username:</Text>
  //           <View className="flex-row space-x-2">
  //             <TextInput
  //               value={newUsername}
  //               className="border-b-2 border-gray-300 py-2 flex-1"
  //               inputMode="text"
  //               placeholder="New username"
  //               onChangeText={(value) => setNewUsername(value)}
  //             />
  //             <TouchableOpacity
  //               className="bg-slate-500 p-3 rounded-md"
  //               onPress={() => handleSubmitNewUsername()}
  //             >
  //               <Text className="text-white">Submit</Text>
  //             </TouchableOpacity>
  //           </View>
  //           <View className="flex-row space-x-1">
  //             <Text className="font-bold text-gray-500">Current username:</Text>
  //             <Text className="text-gray-500">{user.username}</Text>
  //           </View>
  //         </View>
  //         <View className="space-y-3">
  //           <Text className="text-lg font-bold">Change Email:</Text>
  //           <View className="flex-row space-x-2">
  //             <TextInput
  //               value={newEmail}
  //               className="border-b-2 border-gray-300 py-2 flex-1"
  //               inputMode="text"
  //               placeholder="New Email"
  //               onChangeText={(value) => setNewEmail(value)}
  //             />
  //             <TouchableOpacity
  //               className="bg-slate-500 p-3 rounded-md"
  //               onPress={() => handleSubmitNewEmail()}
  //             >
  //               <Text className="text-white">Submit</Text>
  //             </TouchableOpacity>
  //           </View>
  //           <View className="flex-row space-x-1">
  //             <Text className="font-bold text-gray-500">Current Email:</Text>
  //             <Text className="text-gray-500">{user.email}</Text>
  //           </View>
  //         </View>
  //         <View className="space-y-3">
  //           <Text className="text-lg font-bold">Change Password:</Text>
  //           <View className="flex-col space-y-2">
  //             <View className="h-10">
  //               <TextInput
  //                 value={password}
  //                 className="border-b-2 border-gray-300 py-2 flex-1"
  //                 inputMode="text"
  //                 placeholder="Old Password"
  //                 secureTextEntry
  //                 onChangeText={(value) => setPassword(value)}
  //               />
  //             </View>
  //             <View className="h-10">
  //               <TextInput
  //                 value={newPassword}
  //                 className="border-b-2 border-gray-300 py-2 flex-1"
  //                 inputMode="text"
  //                 placeholder="New Password"
  //                 secureTextEntry
  //                 onChangeText={(value) => setNewPassword(value)}
  //               />
  //             </View>
  //             <View className="h-10">
  //               <TextInput
  //                 value={newPasswordConfirm}
  //                 className="border-b-2 border-gray-300 py-2 flex-1"
  //                 inputMode="text"
  //                 placeholder="Confirm new Password"
  //                 secureTextEntry
  //                 onChangeText={(value) => setNewPasswordConfirm(value)}
  //               />
  //             </View>
  //           </View>
  //           <TouchableOpacity
  //             className="bg-slate-500 p-3 rounded-md"
  //             onPress={() => handleSubmitNewPassword()}
  //           >
  //             <Text className="text-white text-center">Submit</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     )}
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
          onPress={() => navigation.navigate("navigation")}
        >
          <ArrowBack />
        </TouchableOpacity>
        <Image
          source={require("../../assets/login/avocado_transparent.png")}
          style={styles.avocado}
        />
        <Text style={styles.formularioText}>MIS DATOS PERSONALES</Text>
      </View>
      <ScrollView style={styles.modal} showsVerticalScrollIndicator={false}>
        <View style={styles.personalData}>
          <View className="flex-row justify-between">
            <Text style={styles.titles}>Datos personales</Text>
            <TouchableOpacity>
              <Edit />
            </TouchableOpacity>
          </View>
          <View className="mt-[8]">
            <InputField
              label="Nombre"
              value={fullName}
              onChangeText={setFullName}
            />
            <InputField
              label="Usario"
              value={username}
              onChangeText={setUsername}
            />
            <InputField label="Email" value={email} onChangeText={setEmail} />
          </View>
        </View>
        <View style={styles.personalData}>
          <View className="flex-row">
            <Text style={styles.titles}>Dirección</Text>
          </View>
          <View className="mt-[8]">
            <InputField
              label="Calle y número"
              value={address}
              onChangeText={setAddress}
            />
            <InputField label="Ciudad" value={city} onChangeText={setCity} />
            <InputField label="Región" value={state} onChangeText={setState} />
            <InputField
              label="Código postal"
              value={postalCode}
              onChangeText={setPostalCode}
            />
            <InputField
              label="País"
              value={country}
              onChangeText={setCountry}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
  },
  avocado: {
    width: 215,
    height: 180,
    position: "absolute",
    top: -20,
    right: -10,
  },
  formularioText: {
    color: "#FFF",
    fontFamily: "Integral CF",
    fontSize: 24,
    fontWeight: 400,
    position: "absolute",
    bottom: 12,
    left: 30,
  },
  arrow: {
    top: 10,
    left: 30,
  },
  text: {
    color: "#000",
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: 500,
  },
  personalData: {
    margin: 25,
  },
  titles: {
    color: "#000",
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AccountSettings;
