// ConfigScreen.js
import React, { useEffect } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useModoOscuro } from "../context/ModoOscuroContext";
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

const STORAGE_KEY = "modoOscuro";

const ConfigScreen = ({ navigation }) => {
  const { modoOscuroActivado, toggleModoOscuro } = useModoOscuro();

  const guardarModoOscuroAsyncStorage = async (valor) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(valor));
    } catch (error) {
      console.error("Error al guardar en AsyncStorage:", error);
    }
  };

  const obtenerModoOscuroAsyncStorage = async () => {
    try {
      const valorGuardado = await AsyncStorage.getItem(STORAGE_KEY);
      return valorGuardado !== null ? JSON.parse(valorGuardado) : false;
    } catch (error) {
      console.error("Error al obtener de AsyncStorage:", error);
      return false;
    }
  };

  const cargarModoOscuro = async () => {
    const modoOscuroGuardado = await obtenerModoOscuroAsyncStorage();
    toggleModoOscuro(modoOscuroGuardado);
  };

  useEffect(() => {
    cargarModoOscuro();
  }, []);

  const handleProfileSettings = () => {
    navigation.navigate("AccountSettings");
  };

  const styles = getStyles(modoOscuroActivado);

  return (
    <View style={styles.container}>
      <View style={styles.languagePickerContainer}>
        <Text style={styles.text}>Language:</Text>
        {/* <DifferentPicker
          selectedValue={"Español"}
          onValueChange={(valor) => console.log(valor)}
        >
          <DifferentPicker.Item label="Español" value="Español" />
          <DifferentPicker.Item label="English" value="English" />
        </DifferentPicker> */}
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.text}>Notifications:</Text>
        <Switch
          value={true}
          onValueChange={() => console.log("Toggle Notifications")}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.text}>Sonidos:</Text>
        <Switch
          value={true}
          onValueChange={() => console.log("Toggle Sonidos")}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.text}>Dark mode:</Text>
        <Switch
          value={modoOscuroActivado}
          onValueChange={(valor) => {
            toggleModoOscuro(valor);
            guardarModoOscuroAsyncStorage(valor);
          }}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleProfileSettings}>
          <Text style={styles.buttonText}>Account settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfigScreen;

const getStyles = (modoOscuroActivado) => {
  return {
    container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
      backgroundColor: modoOscuroActivado
        ? darkModeBackground
        : lightModeBackground, // Ajusta el fondo según el modo oscuro
    },
    languagePickerContainer: {
      width: 200,
      marginTop: 20,
    },
    buttonText: {
      color: modoOscuroActivado ? darkbuttonText : lightbuttonText, // Ajusta el color del texto del botón según el modo oscuro
      fontSize: 16,
    },
    text: {
      fontSize: 16,
      color: modoOscuroActivado ? darkModeText : lightModeText, // Ajusta el color del texto según el modo oscuro
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    button: {
      backgroundColor: modoOscuroActivado
        ? darkbuttonBackground
        : lightbuttonBackground, // Ajusta el color del botón según el modo oscuro
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
    },
  };
};
