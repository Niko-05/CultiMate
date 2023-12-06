// ConfigScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useModoOscuro } from "../context/ModoOscuroContext";
import {
  obtenerModoOscuro,
  guardarModoOscuro,
  guardarIdioma,
  obtenerIdioma,
} from "../utils/storage";
import enTranslations from "../language/en.json";
import esTranslations from "../language/es.json";

import {
  lightModeBackground,
  darkModeBackground,
  lightModeText,
  darkModeText,
  lightbuttonBackground,
  darkbuttonBackground,
  lightbuttonText,
  darkbuttonText,
} from "../utils/colores";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowBack from "../../assets/login/arrow_back.svg";
import RNPickerSelect from "react-native-picker-select";
import DropdownIcon from "../../assets/icons/dropdown.svg";

const STORAGE_KEY = "modoOscuro";

const ConfigScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { modoOscuroActivado, toggleModoOscuro } = useModoOscuro();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isSoundsEnabled, setIsSoundsEnabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("español");

  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const [translations, setTranslations] = useState(esTranslations);
  const styles = getStyles(modoOscuroActivado);

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    guardarIdioma(language);
    // Actualiza las traducciones al cambiar el idioma
    switch (language) {
      case "es":
        setTranslations(esTranslations);
        break;
      case "en":
        setTranslations(enTranslations);
        break;
      default:
        setTranslations(esTranslations);
        break;
    }
    console.log("Cambiando idioma a:", language);
    //console.log('Traducciones actualizadas:', translations);
  };

  const cargarIdioma = async () => {
    const idiomaGuardado = await obtenerIdioma();
    setSelectedLanguage(idiomaGuardado);
    changeLanguage(idiomaGuardado);
  };

  const cargarModoOscuro = async () => {
    const modoOscuroGuardado = await obtenerModoOscuro();
    toggleModoOscuro(modoOscuroGuardado);
  };

  useEffect(() => {
    cargarModoOscuro();
    cargarIdioma();
  }, []);

  const handleProfileSettings = () => {
    navigation.navigate("AccountSettings");
  };
  const languages = [
    { label: "Español", value: "español" },
    { label: "English", value: "english" },
  ];

  const styles = getStyles(modoOscuroActivado);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity
          style={[styles.arrow, { marginTop: insets.top }]}
          onPress={() => navigation.navigate("navigation")}
        >
          <ArrowBack />
        </TouchableOpacity>
        <Image
          source={require("../../assets/illustrations/eggplant_transparent.png")}
          style={[styles.eggplant, { marginTop: insets.top }]}
        />
        <Text style={styles.formularioText}>CONFIGURACIÓN</Text>
      </View>
      <View style={styles.modal}>
        <Image
          style={styles.strawberry}
          source={require("../../assets/illustrations/strawberry.png")}
        />
        <Image
          style={styles.leaves}
          source={require("../../assets/illustrations/leaves.png")}
        />
        <View style={styles.rect}>
          <Text>MODO OSCURO</Text>
          <Switch
            style={styles.switch}
            thumbColor={modoOscuroActivado ? "#2EC26A" : "#939393"}
            trackColor={{ false: "#939393", true: "#DBDBDB" }}
            onValueChange={(valor) => {
              toggleModoOscuro(valor);
              guardarModoOscuroAsyncStorage(valor);
            }}
            value={modoOscuroActivado}
          />
        </View>
        <View style={styles.rect}>
          <Text>NOTIFICACIONES</Text>
          <Switch
            style={styles.switch}
            thumbColor={isNotificationsEnabled ? "#2EC26A" : "#939393"}
            trackColor={{ false: "#939393", true: "#DBDBDB" }}
            onValueChange={(value) => {
              setIsNotificationsEnabled(value);
            }}
            value={isNotificationsEnabled}
          />
        </View>
        <View style={styles.rect}>
          <Text>VOLUMEN</Text>
          <Switch
            style={styles.switch}
            thumbColor={isSoundsEnabled ? "#2EC26A" : "#939393"}
            trackColor={{ false: "#939393", true: "#DBDBDB" }}
            onValueChange={(value) => {
              setIsSoundsEnabled(value);
            }}
            value={isSoundsEnabled}
          />
        </View>
        <View style={[styles.rect, { paddingRight: 35 }]}>
          <Text>IDIOMA</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedLanguage(value)}
            items={languages}
            value={selectedLanguage}
            style={styles.picker}
            Icon={() => <DropdownIcon />}
          />
        </View>
      </View>
    </View>
  );
};

export default ConfigScreen;

const getStyles = (modoOscuroActivado) => {
  return {
    container: {
      flex: 1,
      backgroundColor: "#09873D",
    },
    top: {
      flex: 0.3,
    },
    modal: {
      flex: 0.7,
      backgroundColor: "white",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    arrow: {
      top: 10,
      left: 30,
    },
    eggplant: {
      width: 215,
      height: 180,
      position: "absolute",
      top: 0,
      right: -14,
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
    strawberry: {
      width: 141,
      height: 157,
      position: "absolute",
      bottom: "20%",
      left: -5,
    },
    leaves: {
      width: 132,
      height: 132,
      position: "absolute",
      top: "10%",
      right: -23,
    },
    rect: {
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
      width: 54,
      height: 25,
      transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
    picker: {
      inputIOS: {
        paddingRight: 30,
        color: "#939393",
      },
      inputAndroid: {
        color: "#939393",
      },
      iconContainer: {
        top: 5,
      },
    },
    buttonText: {
      color: modoOscuroActivado ? darkbuttonText : lightbuttonText,
      fontSize: 16,
      fontWeight: "bold",
    },
    text: {
      fontWeight: "bold",
      fontSize: 16,
      color: modoOscuroActivado ? darkModeText : lightModeText,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    // button: {
    //   backgroundColor: modoOscuroActivado
    //     ? darkbuttonBackground
    //     : lightbuttonBackground, // Ajusta el color del botón según el modo oscuro
    //   padding: 15,
    //   borderRadius: 10,
    //   marginTop: 20,
    // },
  };
};
