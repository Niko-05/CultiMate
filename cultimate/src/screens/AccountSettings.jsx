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
import { useModoOscuro } from "../context/ModoOscuroContext";
import {
  lightModeBackground,
  darkModeBackground,
  lightModeText,
  darkModeText,
  darkModeButton,
  lightModeButton,
  darkbuttonText,
  lightbuttonText,
} from "../utils/colores";
import { obtenerIdioma } from "../utils/storage";
import esTranslations from "../language/es.json";
import enTranslations from "../language/en.json";
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
  const { modoOscuroActivado } = useModoOscuro();
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const [translations, setTranslations] = useState(esTranslations);
  const styles = getStyles(modoOscuroActivado);

  const cargarIdioma = async () => {
    const idiomaGuardado = await obtenerIdioma();
    setSelectedLanguage(idiomaGuardado);
  };

  const cargarTraducciones = async () => {
    try {
      let translationsByLanguage;
      switch (selectedLanguage) {
        case "es":
          translationsByLanguage = esTranslations;
          break;
        case "en":
          translationsByLanguage = enTranslations;
          break;
        default:
          translationsByLanguage = esTranslations; // Por defecto, usa las traducciones en español
      }
      setTranslations(translationsByLanguage);
    } catch (error) {
      console.error("Error cargando traducciones", error);
    }
  };

  const [isEditable, setIsEditable] = useState(false);
  const [hasAlerted, setHasAlerted] = useState(false);

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
    cargarTraducciones();
    cargarIdioma();
  }, [selectedLanguage]);

  const handleSubmitNewUsername = async () => {
    if (username === "") {
      Alert.alert("Error", "You must fill all the fields");
      setHasAlerted(true);
      return;
    }
    if (!(await checkDuplicateUsername(username))) {
      Alert.alert("Error", "The username is already taken");
      setHasAlerted(true);
      return;
    }
    const result = await changeUsername(username);
    if (result) {
      console.log("Username changed successfully");
    }
  };

  const handleSubmitNewEmail = async () => {
    if (email === "") {
      Alert.alert("Error", "You must fill all the fields");
      setHasAlerted(true);
      return;
    }
    if (!validator.isEmail(email)) {
      Alert.alert("Error", "The email is not valid");
      setHasAlerted(true);
      return;
    }
    if (!(await checkDuplicateEmail(email))) {
      Alert.alert("Error", "The email is already taken");
      setHasAlerted(true);
      return;
    }
    const result = await changeEmail(email);
    if (result) {
      console.log("Email changed successfully");
    }
  };

  const handleSubmitNewPassword = async () => {
    if (password === "" || newPassword === "" || newPasswordConfirm === "") {
      Alert.alert("Error", "You must fill all the fields");
      setHasAlerted(true);
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      Alert.alert("Error", "The new passwords don't match");
      setHasAlerted(true);
      return;
    }
    if (password !== user.password) {
      Alert.alert("Error", "The current password is incorrect");
      setHasAlerted(true);
      return;
    }
    const result = await changePassword(newPassword);
    if (result) {
      console.log("Success", "Password changed successfully");
      setPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
    }
  };

  const handleSubmitNewFullName = async () => {
    if (fullName === "") {
      Alert.alert("Error", "Name cannot be empty");
      setHasAlerted(true);
      return;
    }
    const result = await changeFullName(fullName);
    if (result) {
      console.log("Name changed successfully");
    }
  };

  const handleSubmitNewAddress = async () => {
    if (address === "") {
      Alert.alert("Error", "Address cannot be empty");
      setHasAlerted(true);
      return;
    }
    const result = await changeAddress(address);
    if (result) {
      console.log("Address changed successfully");
    }
  };

  const handleSubmitNewCity = async () => {
    if (city === "") {
      Alert.alert("Error", "City cannot be empty");
      setHasAlerted(true);
      return;
    }
    const result = await changeCity(city);
    if (result) {
      console.log("City changed successfully");
    }
  };

  const handleSubmitNewState = async () => {
    if (state === "") {
      Alert.alert("Error", "State cannot be empty");
      setHasAlerted(true);
      return;
    }
    const result = await changeState(state);
    if (result) {
      console.log("State changed successfully");
    }
  };

  const handleSubmitNewCountry = async () => {
    if (country === "") {
      Alert.alert("Error", "Country cannot be empty");
      setHasAlerted(true);
      return;
    }
    const result = await changeCountry(country);
    if (result) {
      console.log("Country changed successfully");
    }
  };

  const handleSubmitNewPostalCode = async () => {
    if (postalCode === "") {
      Alert.alert("Error", "Postal code cannot be empty");
      setHasAlerted(true);
      return;
    }
    const result = await changePostalCode(postalCode);
    if (result) {
      console.log("Postal code changed successfully");
    }
  };

  const handleSave = async () => {
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
    if (!hasAlerted) {
      setIsEditable(false);
      console.log("All changes saved");
      return;
    }
    setHasAlerted(false);
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
      {Object.keys(user).length == 0 ? (
        <View className="flex-1 content-center justify-center">
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <>
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
                {!isEditable ? (
                  <TouchableOpacity onPress={() => setIsEditable(true)}>
                    <Edit />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => handleSave()}>
                    <Text style={styles.saveText}>Guardar</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View className="mt-[8]">
                <InputField
                  label="Nombre"
                  value={fullName}
                  onChangeText={setFullName}
                  editable={isEditable}
                />
                <InputField
                  label="Usario"
                  value={username}
                  onChangeText={setUsername}
                  editable={isEditable}
                />
                <InputField
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  editable={isEditable}
                />
                {isEditable ? (
                  <>
                    <InputField
                      label="Contraseña actual"
                      value={password}
                      onChangeText={setPassword}
                    />
                    <InputField
                      label="Nueva Contraseña"
                      value={newPassword}
                      onChangeText={setNewPassword}
                    />
                    <InputField
                      label="Repetir contraseña"
                      value={newPasswordConfirm}
                      onChangeText={setNewPasswordConfirm}
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
                  editable={isEditable}
                />
                <InputField
                  label="Ciudad"
                  value={city}
                  onChangeText={setCity}
                  editable={isEditable}
                />
                <InputField
                  label="Región"
                  value={state}
                  onChangeText={setState}
                  editable={isEditable}
                />
                <InputField
                  label="Código postal"
                  value={postalCode}
                  onChangeText={setPostalCode}
                  editable={isEditable}
                />
                <InputField
                  label="País"
                  value={country}
                  onChangeText={setCountry}
                  editable={isEditable}
                />
              </View>
            </View>
          </ScrollView>
        </>
      )}
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
    fontFamily: "Inter-Bold",
    fontSize: 18,
  },
  saveText: {
    color: "#0077cc",
    fontFamily: "Inter-Bold",
    fontSize: 18,
  },
});

export default AccountSettings;

const getStyles = (modoOscuroActivado) => {
  return {
    bloque: {
      paddingBottom: 30,
      backgroundColor: modoOscuroActivado
        ? darkModeBackground
        : lightModeBackground,
    },
    container: {
      flex: 1,
      backgroundColor: modoOscuroActivado
        ? darkModeBackground
        : lightModeBackground,
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      color: modoOscuroActivado ? darkModeText : lightModeText,
    },
    text2: {
      fontWeight: "bold",
      color: modoOscuroActivado ? "#b8b7b6" : "#718096",
      paddingTop: 10,
    },
    text3: {
      color: modoOscuroActivado ? "#b8b7b6" : "#718096",
      textAlign: "center",
      paddingTop: 10,
    },
    button: {
      backgroundColor: modoOscuroActivado ? darkModeButton : lightModeButton,
      padding: 12,
      borderRadius: 8,
    },
    buttonEnvio: {
      backgroundColor: modoOscuroActivado ? darkModeButton : lightModeButton,
      padding: 12,
      borderRadius: 8,
      marginTop: 20,
    },
    buttonText: {
      fontWeight: "bold",
      color: modoOscuroActivado ? darkbuttonText : lightbuttonText,
      textAlign: "center",
    },
    textImput: {
      borderBottomWidth: 2,
      borderBottomColor: "gray",
      paddingBottom: 2,
      flex: 1,
      color: modoOscuroActivado ? darkModeText : lightModeText,
    },
  };
};
