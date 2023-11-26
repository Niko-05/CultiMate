import React from "react";
import { View, Text, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useModoOscuro } from "../context/ModoOscuroContext";
import { 
  lightModeBackground, 
  darkModeBackground, 
  lightModeText, 
  darkModeText, 
  lightbuttonBackground, 
  darkbuttonBackground, 
  lightbuttonText, 
  darkbuttonText 
} from "../utils/colores";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { modoOscuroActivado }= useModoOscuro();
  const styles = getStyles(modoOscuroActivado);

  return (
    <View style={styles.container}>
      <Text>Welcome to the HomeScreen!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PreguntasFrecuentes")}
      >
        <Text style={styles.buttonText}>FAQ</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (modoOscuroActivado) => {
  return {
    container: { 
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: modoOscuroActivado ? darkModeBackground: lightModeBackground,
    },
    button: {
      backgroundColor: modoOscuroActivado ? darkbuttonBackground : lightbuttonBackground,
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: modoOscuroActivado ? darkbuttonText : lightbuttonText,
      fontSize: 16,
      fontWeight: "bold",
    },
  }};

export default HomeScreen;
