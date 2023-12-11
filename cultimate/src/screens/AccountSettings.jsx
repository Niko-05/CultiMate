import React, { useState, useEffect } from "react";
import {
  View,
  Text,
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
  changeFullName,
  changeAddress,
  changeCity,
  changeState,
  changeCountry,
  changePostalCode,
  changeFullName,
  changeAddress,
  changeCity,
  changeState,
  changeCountry,
  changePostalCode,
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

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [isEditing, setIsEditing] = useState(false);

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
    if (username === "") {
      setUsername(user.username);
      throw new Error("Username cannot be empty");
    if (username === "") {
      setUsername(user.username);
      throw new Error("Username cannot be empty");
    }
    if (!(await checkDuplicateUsername(username))) {
      throw new Error("The username is already taken");
    if (!(await checkDuplicateUsername(username))) {
      throw new Error("The username is already taken");
    }
    const result = await changeUsername(username);
    const result = await changeUsername(username);
  };

  const handleSubmitNewEmail = async () => {
    if (email === "") {
      setEmail(user.email);
      throw new Error("Email cannot be empty");
    if (email === "") {
      setEmail(user.email);
      throw new Error("Email cannot be empty");
    }
    if (!validator.isEmail(email)) {
      throw new Error("The email is not valid");
    if (!validator.isEmail(email)) {
      throw new Error("The email is not valid");
    }
    if (!(await checkDuplicateEmail(email))) {
      throw new Error("The email is already taken");
    }
    const result = await changeEmail(email);
  };

  const handleSubmitNewPassword = async () => {
    if (password === "" || newPassword === "" || newPasswordConfirm === "") {
      throw new Error("Please fill all password-fields");
    }
    if (newPassword !== newPasswordConfirm) {
      throw new Error("The new passwords don't match");
    }
    if (password !== user.password) {
      throw new Error("The current password is incorrect");
    }
    const result = await changePassword(newPassword);
    setPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");
  };

  const handleSubmitNewFullName = async () => {
    if (fullName === "") {
      setFullName(user.fullName);
      throw new Error("Name cannot be empty");
    }
    const result = await changeFullName(fullName);
  };

  const handleSubmitNewAddress = async () => {
    if (address === "") {
      setAddress(user.address);
      throw new Error("Address cannot be empty");
    }
    const result = await changeAddress(address);
  };

  const handleSubmitNewCity = async () => {
    if (city === "") {
      setCity(user.city);
      throw new Error("City cannot be empty");
    }
    const result = await changeCity(city);
  };

  const handleSubmitNewState = async () => {
    if (state === "") {
      setState(user.state);
      throw new Error("State cannot be empty");
    }
    const result = await changeState(state);
  };

  const handleSubmitNewCountry = async () => {
    if (country === "") {
      setCountry(user.country);
      throw new Error("Country cannot be empty");
    }
    const result = await changeCountry(country);
  };

  const handleSubmitNewPostalCode = async () => {
    if (postalCode === "") {
      setPostalCode(user.postalCode);
      throw new Error("Postal code cannot be empty");
    }
    const result = await changePostalCode(postalCode);
  };

  const handleSubmitForm = async () => {
    try {
      if (fullName !== user.fullName) {
        await handleSubmitNewFullName();
      }
      if (username !== user.username) {
        await handleSubmitNewUsername();
      }
      if (email !== user.email) {
        await handleSubmitNewEmail();
      }
      if (password !== "" || newPassword !== "" || newPasswordConfirm !== "") {
        await handleSubmitNewPassword();
      }
      if (address !== user.address) {
        await handleSubmitNewAddress();
      }
      if (city !== user.city) {
        await handleSubmitNewCity();
      }
      if (state !== user.state) {
        await handleSubmitNewState();
      }
      if (country !== user.country) {
        await handleSubmitNewCountry();
      }
      if (postalCode !== user.postalCode) {
        await handleSubmitNewPostalCode();
      }
      Alert.alert("Success", "All changes saved successfully");
      setIsEditing(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

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
            {!isEditing ? (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Edit />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleSubmitForm()}>
                <Text style={styles.saveText}>Guardar</Text>
              </TouchableOpacity>
            )}
          </View>
          <View className="mt-[8]">
            <InputField
              label="Nombre"
              value={fullName}
              onChangeText={setFullName}
              editable={isEditing}
            />
            <InputField
              label="Usario"
              value={username}
              onChangeText={setUsername}
              editable={isEditing}
            />
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              editable={isEditing}
            />
            {isEditing ? (
              <>
                <InputField
                  label="Contraseña"
                  value={password}
                  onChangeText={setPassword}
                  editable={isEditing}
                />
                <InputField
                  label="Nueva contraseña"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  editable={isEditing}
                />
                <InputField
                  label="Repetir contraseña"
                  value={newPasswordConfirm}
                  onChangeText={setNewPasswordConfirm}
                  editable={isEditing}
                />
              </>
            ) : (
              <></>
            )}
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
              editable={isEditing}
            />
            <InputField
              label="Ciudad"
              value={city}
              onChangeText={setCity}
              editable={isEditing}
            />
            <InputField
              label="Región"
              value={state}
              onChangeText={setState}
              editable={isEditing}
            />
            <InputField
              label="Código postal"
              value={postalCode}
              onChangeText={setPostalCode}
              editable={isEditing}
            />
            <InputField
              label="País"
              value={country}
              onChangeText={setCountry}
              editable={isEditing}
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
  personalData: {
    margin: 25,
  },
  titles: {
    color: "#000",
    fontFamily: "Inter-Bold",
    fontSize: 18,
  },
  saveText: {
    color: "#095A87",
    fontFamily: "Inter-Bold",
    fontSize: 18,
  },
});

export default AccountSettings;
