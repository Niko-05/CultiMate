import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TextInput, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useModoOscuro } from "../context/ModoOscuroContext";
import { lightModeBackground, darkModeBackground, lightModeText, darkModeText, darkModeButton, lightModeButton, darkbuttonText, lightbuttonText } from "../utils/colores";
import { obtenerIdioma } from '../utils/storage';
import esTranslations from "../language/es.json";
import enTranslations from "../language/en.json";
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
  const { modoOscuroActivado } = useModoOscuro();
  const [selectedLanguage, setSelectedLanguage] = useState('es');
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
          case 'es':
              translationsByLanguage = esTranslations;
              break;
          case 'en':
              translationsByLanguage = enTranslations;
              break;
          default:
              translationsByLanguage = esTranslations; // Por defecto, usa las traducciones en español
      }
      setTranslations(translationsByLanguage);
  } catch (error) {
      console.error('Error cargando traducciones', error);
  }
};

  const setUserInfo = async () => {
    const userinfo = await getUserInfo();
    console.log(await userinfo);
    setUser(await userinfo);
  };

  useEffect(() => {
    setUserInfo();
    cargarTraducciones();
    cargarIdioma();
  }, [selectedLanguage]);

  const handleSubmitNewUsername = async () => {
    if (newUsername === "") {
      Alert.alert("Error", translations.acountsettings.Errors.errorFields);
      return;
    }
    if (!(await checkDuplicateUsername(newUsername))) {
      Alert.alert("Error", translations.acountsettings.Errors.errorUsername);
      return;
    }
    const result = await changeUsername(newUsername);
    if (result) {
      Alert.alert("Success", translations.acountsettings.Success.successUsername);
      setUserInfo();
      setNewUsername("");
    }
  };

  const handleSubmitNewEmail = async () => {
    if (newEmail === "") {
      Alert.alert("Error", translations.acountsettings.Errors.errorFields);
      return;
    }
    if (!validator.isEmail(newEmail)) {
      Alert.alert("Error", translations.acountsettings.Errors.errorFormatoEmail);
      return;
    }
    if (!(await checkDuplicateEmail(newEmail))) {
      Alert.alert("Error", translations.acountsettings.Errors.errorEmail);
      return;
    }
    const result = await changeEmail(newEmail);
    if (result) {
      Alert.alert("Success", translations.acountsettings.Success.successEmail);
      setUserInfo();
      setNewEmail("");
    }
  };

  const handleSubmitNewPassword = async () => {
    if (password === "" || newPassword === "" || newPasswordConfirm === "") {
      Alert.alert("Error", translations.acountsettings.Errors.errorFields);
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      Alert.alert("Error", translations.acountsettings.Errors.errorMatchContrasena);
      return;
    }
    if (password !== user.password) {
      Alert.alert("Error", translations.acountsettings.Errors.errorContrasena);
      return;
    }
    const result = await changePassword(newPassword);
    if (result) {
      Alert.alert("Success", translations.acountsettings.Success.successContrasena);
      setUserInfo();
      setPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
    }
  };

  return (
    <View style = {styles.container}>
      {Object.keys(user).length == 0 ? (
        <View className="flex-1 content-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View className="flex-1 px-3 space-y-4 mt-4">
          <View style = {styles.bloque}>
            <Text style = {styles.text}> {translations.acountsettings.Texts.cambiarUsername}:</Text>
            <View className="flex-row space-x-2">
              <TextInput
                value={newUsername}
                style = {styles.textImput}
                inputMode="text"
                placeholder= {translations.acountsettings.Texts.placeholderUsername}
                placeholderTextColor={ modoOscuroActivado ? '#b8b7b6' : '#718096'}
                onChangeText={(value) => setNewUsername(value)}
              />
              <TouchableOpacity
                style = {styles.button}
                onPress={() => handleSubmitNewUsername()}
              >
                <Text style = {styles.buttonText}>{translations.acountsettings.Texts.Envio}</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row space-x-1">
              <Text style = {styles.text2}>{translations.acountsettings.Texts.usernameActual}:</Text>
              <Text style = {styles.text3}>{user.username}</Text>
            </View>
          </View>
          <View style = {styles.bloque}>
            <Text style = {styles.text}>{translations.acountsettings.Texts.cambiarEmail}:</Text>
            <View className="flex-row space-x-2">
              <TextInput
                value={newEmail}
                style={styles.textImput}
                inputMode="text"
                placeholder={translations.acountsettings.Texts.placeholderEmail}
                placeholderTextColor={ modoOscuroActivado ? '#b8b7b6' : '#718096'}
                onChangeText={(value) => setNewEmail(value)}
              />
              <TouchableOpacity
                style = {styles.button}
                onPress={() => handleSubmitNewEmail()}
              >
                <Text style = {styles.buttonText}>{translations.acountsettings.Texts.Envio}</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row space-x-1">
              <Text style = {styles.text2}>{translations.acountsettings.Texts.emailActual}:</Text>
              <Text style = {styles.text3}>{user.email}</Text>
            </View>
          </View>
          <View style = {styles.bloque}>
            <Text style = {styles.text}>{translations.acountsettings.Texts.cambiarContrasena}:</Text>
            <View className="flex-col space-y-2">
              <View className="h-10">
                <TextInput
                  value={password}
                  style={styles.textImput}
                  inputMode="text"
                  placeholder={translations.acountsettings.Texts.oldContrasena}
                  placeholderTextColor={ modoOscuroActivado ? '#b8b7b6' : '#718096'}
                  secureTextEntry
                  onChangeText={(value) => setPassword(value)}
                />
              </View>
              <View className="h-10">
                <TextInput
                  value={newPassword}
                  style={styles.textImput}
                  inputMode="text"
                  placeholder={translations.acountsettings.Texts.placeholderContrasena}
                  placeholderTextColor={ modoOscuroActivado ? '#b8b7b6' : '#718096'}
                  secureTextEntry
                  onChangeText={(value) => setNewPassword(value)}
                />
              </View>
              <View className="h-10">
                <TextInput
                  value={newPasswordConfirm}
                  style={styles.textImput}
                  inputMode="text"
                  placeholder={translations.acountsettings.Texts.placeholderContrasena2}
                  placeholderTextColor={ modoOscuroActivado ? '#b8b7b6' : '#718096'}
                  secureTextEntry
                  onChangeText={(value) => setNewPasswordConfirm(value)}
                />
              </View>
            </View>
            <TouchableOpacity
              style = {styles.buttonEnvio}
              onPress={() => handleSubmitNewPassword()}
            >
              <Text style = {styles.buttonText}>{translations.acountsettings.Texts.Envio}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

export default AccountSettings;

const getStyles = (modoOscuroActivado) => {
  return {
    bloque: {
      paddingBottom: 30,
      backgroundColor: modoOscuroActivado ? darkModeBackground : lightModeBackground,
    },
    container: {
      flex: 1,
      backgroundColor: modoOscuroActivado ? darkModeBackground : lightModeBackground,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold', 
      color: modoOscuroActivado ? darkModeText : lightModeText,
    },
    text2: {
      fontWeight: 'bold', 
      color: modoOscuroActivado? '#b8b7b6' : '#718096', 
      paddingTop: 10,
    },
    text3: {
      color: modoOscuroActivado ? '#b8b7b6' :'#718096',
      textAlign: 'center',
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
      fontWeight: 'bold', 
      color: modoOscuroActivado ? darkbuttonText : lightbuttonText,
      textAlign: 'center', 
    },
    textImput: {
      borderBottomWidth: 2,
      borderBottomColor: 'gray',
      paddingBottom: 2,
      flex: 1,
      color: modoOscuroActivado ? darkModeText : lightModeText,
    },
  }}