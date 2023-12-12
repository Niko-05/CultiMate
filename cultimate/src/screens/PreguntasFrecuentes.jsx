import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Collapsible from "react-native-collapsible";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const PreguntasFrecuentes = () => {
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
      pregunta:
        "¿Dónde puedo conseguir los fertilizantes necesarios para el crecimiento de mis plantas?",
      respuesta:
        "Puedes comprar todos los productos necesarios en el apartado de tienda de nuestra app.",
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
          <Text style={[styles.pregunta, { marginRight: 10 }]}>
            {section.pregunta}
          </Text>
          <MaterialIcons
            name={
              activeSection === index
                ? "keyboard-arrow-up"
                : "keyboard-arrow-down"
            }
            size={24}
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
      <View style={styles.top}>
        <Image
          style={styles.imageBackground}
          source={require("../../assets/ESPINACAS_LINEA_BLANCA.png")}
        />
        <Text
          style={{
            color: "white",
            fontSize: 24,
            textAlign: "center",
            fontFamily: "Integral CF",
            lineHeight: 28,
          }}
        >
          Preguntas Frecuentes
        </Text>
      </View>
      <View style={styles.modal}>
        {preguntas.map((section, index) => (
          <View key={index}>
            {renderHeader(section, index)}
            {renderContent(section, index)}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09873D",
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    flex: 0.3,
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  modal: {
    flex: 0.7,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
  },
  preguntaContainer: {
    padding: 10,
    marginBottom: 10,
    justifyContent: "center",
    top: 10,
  },
  pregunta: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  respuestaContainer: {
    padding: 10,
  },
  respuesta: {
    fontSize: 16,
  },
  imageBackground: {
    alignSelf: "flex-end",
    width: 210,
    height: 200,
  },
});

export default PreguntasFrecuentes;
