// ConfigScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Switch, TouchableOpacity, Image } from "react-native";
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

  const languages = [
    { label: "Español", value: "español" },
    { label: "English", value: "english" },
  ];

  const styles = getStyles(modoOscuroActivado);

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.languagePickerContainer}>
  //       <Text style={styles.text}>Language:</Text>
  //       <Picker
  //         selectedValue={'Español'}
  //         onValueChange={(valor) => console.log(valor)}
  //       >
  //         <Picker.Item label="Español" value="Español" />
  //         <Picker.Item label="English" value="English" />
  //       </Picker>

  //     </View>
  //       <View style={styles.switchContainer}>
  //         <Text style={styles.text}>Notifications:</Text>
  //         <Switch value={true} onValueChange={() => console.log('Toggle Notifications')}
  //       />
  //     </View>

  //     <View style={styles.switchContainer}>
  //       <Text style={styles.text}>Sonidos:</Text>
  //       <Switch value={true} onValueChange={() => console.log('Toggle Sonidos')} />
  //     </View>

  //     <View style={styles.switchContainer}>
  //       <Text style={styles.text}>Dark mode:</Text>
  //       <Switch
  //         value={modoOscuroActivado}
  //         onValueChange={(valor) => {
  //           toggleModoOscuro(valor);
  //           guardarModoOscuroAsyncStorage(valor);
  //         }}
  //       />
  //     </View>
  //     <View>
  //       <TouchableOpacity
  //         style={styles.button}
  //         onPress={handleProfileSettings}
  //       >
  //         <Text style={styles.buttonText}>Account settings</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );

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
      color: modoOscuroActivado ? darkbuttonText : lightbuttonText, // Ajusta el color del texto del botón según el modo oscuro
      fontSize: 16,
      fontWeight: "bold",
    },
    text: {
      fontWeight: "bold",
      fontSize: 16,
      color: modoOscuroActivado ? darkModeText : lightModeText, // Ajusta el color del texto según el modo oscuro
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
