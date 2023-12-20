import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Collapsible from "react-native-collapsible";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useModoOscuro } from "../context/ModoOscuroContext";

const PreguntasFrecuentes = ({ navigation }) => {
  const { modoOscuroActivado } = useModoOscuro();
  const styles = getStyles(modoOscuroActivado);
  const preguntas = [
    {
      pregunta:
        "¿Dónde puedo conseguir los fertilizantes necesarios para el crecimiento de mis plantas?",
      respuesta:
        "Puedes comprar todos los productos necesarios en el apartado de tienda de nuestra app.",
    },
    {
      pregunta: "¿Cada cuánto tengo que regar mis plantas?",
      respuesta:
        "Para esto te recomendamos consultar la información específica de cada planta, ya que cada una tiene unas necesidades específicas.",
    },
    {
      pregunta: "¿Cuánta luz necesita mi planta?",
      respuesta:
        "La cantidad de luz depende del tipo de planta. La mayoría de las plantas de interior necesitan al menos 6 horas de luz indirecta al día.",
    },
    {
      pregunta:
        "¿Cómo puedo crear un ambiente óptimo para mis plantas de interior?",
      respuesta:
        "Mantén una temperatura adecuada, proporciona luz suficiente, controla la humedad y ventila el espacio. Observa cómo responden tus plantas y ajusta según sea necesario.",
    },
  ];

  const [activeSection, setActiveSection] = useState(undefined);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? undefined : index);
  };

  const renderHeader = (section, index) => {
    return (
      <TouchableOpacity
        style={styles.preguntaContainer}
        onPress={() => toggleSection(index)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.pregunta}>{section.pregunta}</Text>
          <View style={{ flex: 1 }} />
          <MaterialIcons
            name={
              activeSection === index
                ? "keyboard-arrow-up"
                : "keyboard-arrow-down"
            }
            size={24}
            style={{ position: "absolute", right: 1 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = (section, index) => {
    return (
      <View style={styles.respuestaContainer}>
        <Collapsible collapsed={activeSection !== index}>
          <Text style={styles.respuesta}>{section.respuesta}</Text>
        </Collapsible>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundLayer}>
        <Image
          source={require("../../assets/ESPINACAS_LINEA_BLANCA.png")}
          style={styles.plantImage}
        />
      </View>
      <ScrollView>
        <Text style={styles.header}>PREGUNTAS FRECUENTES</Text>
        <View style={styles.infoLayer}>
          <View style={styles.modal}>
            {preguntas.map((section, index) => (
              <View key={index}>
                {renderHeader(section, index)}
                {renderContent(section, index)}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PreguntasFrecuentes;

const getStyles = (modoOscuroActivado) => {
  return {
    container: {
      flex: 1,
      backgroundColor: modoOscuroActivado ? "#000" : "#FFF",
    },
    backgroundLayer: {
      backgroundColor: "#09873D",
      width: "100%",
      height: "50%",
      position: "absolute",
    },
    header: {
      color: "#FFF",
      fontFamily: "Integral CF",
      fontSize: 24,
      position: "absolute",
      top: 165,
      left: 30,
      lineHeight: 26,
    },
    infoLayer: {
      backgroundColor: "white",
      borderRadius: 20,
      paddingTop: 20,
      paddingHorizontal: 20,
      marginTop: 200,
      marginBottom: 80,
      paddingBottom: 20, // Añadí un espacio adicional al final
    },
    plantImage: {
      marginTop: 10,
      marginLeft: 243,
      width: 180, // Ajusta al tamaño que necesites
      height: 180, // Ajusta al tamaño que necesites
    },
    pregunta: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      marginRight: 18,
    },
    respuestaContainer: {
      padding: 10,
    },
    respuesta: {
      fontSize: 16,
      color: "#939393",
    },
  };
};
