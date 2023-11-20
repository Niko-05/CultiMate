import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TextInput, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  getUserInfo,
  changeUsername,
  changeEmail,
  changePassword,
  checkDuplicateUsername,
  checkDuplicateEmail,
} from "../api/user";
import checkValidEmail from "../utils/user";
import validator from "validator";

function AccountSettings() {
  const [user, setUser] = useState({});
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const setUserInfo = async () => {
    const userinfo = await getUserInfo();
    console.log(await userinfo);
    setUser(await userinfo);
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
    const result = await changePassword(password, newPassword);
    if (result) {
      Alert.alert("Success", "Password changed successfully");
      setUserInfo();
    }
  };

  return (
    <View className="flex-1">
      {Object.keys(user).length == 0 ? (
        <View className="flex-1 content-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View className="flex-1 px-3 space-y-4 mt-4">
          <View className="flex-row space-x-1">
            <Text className="font-bold">Current username:</Text>
            <Text>{user.username}</Text>
          </View>
          <View className="">
            <Text>Change username:</Text>
            <View className="flex-row space-x-2">
              <TextInput
                className="border-b-2 border-gray-300 py-2 flex-1"
                inputMode="text"
                placeholder="New username"
                onChangeText={(value) => setNewUsername(value)}
              />
              <TouchableOpacity
                className="bg-slate-500 p-3 rounded-md"
                onPress={() => handleSubmitNewUsername()}
              >
                <Text className="text-white">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row space-x-1">
            <Text className="font-bold">Current Email:</Text>
            <Text>{user.email}</Text>
          </View>
          <View className="">
            <Text>Change Email:</Text>
            <View className="flex-row space-x-2">
              <TextInput
                className="border-b-2 border-gray-300 py-2 flex-1"
                inputMode="text"
                placeholder="New Email"
                onChangeText={(value) => setNewEmail(value)}
              />
              <TouchableOpacity
                className="bg-slate-500 p-3 rounded-md"
                onPress={() => handleSubmitNewEmail()}
              >
                <Text className="text-white">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-1">
            <Text>Change Password:</Text>
            <View className="flex-col space-y-2">
              <View className="h-10">
                <TextInput
                  className="border-b-2 border-gray-300 py-2 flex-1"
                  inputMode="text"
                  placeholder="Old Password"
                  secureTextEntry
                  onChangeText={(value) => setPassword(value)}
                />
              </View>
              <View className="h-10">
                <TextInput
                  className="border-b-2 border-gray-300 py-2 flex-1"
                  inputMode="text"
                  placeholder="New Password"
                  secureTextEntry
                  onChangeText={(value) => setNewPassword(value)}
                />
              </View>
              <View className="h-10">
                <TextInput
                  className="border-b-2 border-gray-300 py-2 flex-1"
                  inputMode="text"
                  placeholder="Confirm new Password"
                  secureTextEntry
                  onChangeText={(value) => setNewPasswordConfirm(value)}
                />
              </View>
              <TouchableOpacity
                className="bg-slate-500 p-3 rounded-md"
                onPress={() => handleSubmitNewPassword()}
              >
                <Text className="text-white text-center">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default AccountSettings;
