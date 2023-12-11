import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Switch,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowBack from "../../assets/login/arrow_back.svg";
import RNPickerSelect from "react-native-picker-select";
import Dropdown from "../../assets/login/dropdown.svg";

function AccountSettings({ navigation }) {
  const insets = useSafeAreaInsets();
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [volumeEnabled, setVolumeEnabled] = useState(false);
  const [language, setLanguage] = useState("es");

  const LANGUAGES = [
    { label: "Español", value: "es" },
    { label: "English", value: "en" },
  ];

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
          source={require("../../assets/login/eggplant_transparent.png")}
          style={styles.eggplant}
        />
        <Text style={styles.formularioText}>CONFIGURACIÓN</Text>
      </View>
      <View style={styles.modal} showsVerticalScrollIndicator={false}>
        <Image
          style={styles.strawberry}
          source={require("../../assets/login/strawberry.png")}
        />
        <Image
          style={styles.spinach}
          source={require("../../assets/login/spinach.png")}
        />
        <View style={styles.block}>
          <Text>MODO OSCURO</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#939393", true: "#DBDBDB" }}
            thumbColor={darkModeEnabled ? "#2EC26A" : "#DBDBDB"}
            ios_backgroundColor="#939393"
            onValueChange={(value) => setDarkModeEnabled(value)}
            value={darkModeEnabled}
          />
        </View>
        <View style={styles.block}>
          <Text>NOTIFICACIONES</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#939393", true: "#DBDBDB" }}
            thumbColor={notificationsEnabled ? "#2EC26A" : "#DBDBDB"}
            ios_backgroundColor="#939393"
            onValueChange={(value) => setNotificationsEnabled(value)}
            value={notificationsEnabled}
          />
        </View>
        <View style={styles.block}>
          <Text>VOLUMEN</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#939393", true: "#DBDBDB" }}
            thumbColor={volumeEnabled ? "#2EC26A" : "#DBDBDB"}
            ios_backgroundColor="#939393"
            onValueChange={(value) => setVolumeEnabled(value)}
            value={volumeEnabled}
          />
        </View>
        <View style={styles.block}>
          <Text>IDIOMA</Text>
          <RNPickerSelect
            placeholder={{}}
            value={language}
            onValueChange={(value) => setLanguage(value)}
            items={LANGUAGES}
            Icon={() => <Dropdown />}
            useNativeAndroidPickerStyle={false}
            style={styles.picker}
          />
        </View>
      </View>
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
    alignItems: "center",
    justifyContent: "center",
  },
  eggplant: {
    width: 215,
    height: 180,
    position: "absolute",
    top: 8,
    right: -14,
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
  strawberry: {
    width: 159,
    height: 161,
    position: "absolute",
    bottom: "20%",
    left: -27,
  },
  spinach: {
    width: 120,
    height: 120,
    position: "absolute",
    top: 17,
    right: -41,
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
  block: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "80%",
    marginBottom: 20,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switch: {
    position: "absolute",
    right: 20,
    height: 31,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  picker: {
    inputIOS: {
      color: "#939393",
      fontFamily: "Inter",
      fontSize: 14,
      paddingRight: 40,
    },
    inputAndroid: {
      color: "#939393",
      fontFamily: "Inter",
      fontSize: 14,
      paddingRight: 40,
    },
    iconContainer: {
      top: "40%",
      right: 20,
    },
  },
});

export default AccountSettings;
