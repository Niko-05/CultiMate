import React, { useState } from "react";
import { SafeAreaView, Text, Pressable } from "react-native";
import ListaPlanta from "../components/ListaPlanta";
import { SuggestionModal } from "./SuggestionModal";

const NewPlant = ({ navigation }) => {
  const data = [
    {
      id: 1,
      nombre: "Fresa",
      Image: require("../../assets/Fresa.png"),
      IniFechaPlantado: 2, // Febrero
      FinFechaPlantado: 5, // Mayo
      PeriodicidadRegado: 3,
      CondTemperatura: "15ºC-25ºC",
      TamMaceta: "Mediana",
      Paso: 3,
      Detalles: "Cuidar brotes y aplicar fertilizante",
      Estado: "En desarrollo",
      EstacionRecomendada: "Primavera"
    },
    {
      id: 2,
      nombre: "Mora",
      Image: require("../../assets/mora.png"),
      IniFechaPlantado: 9, // Septiembre
      FinFechaPlantado: 11, // Noviembre
      PeriodicidadRegado: 2,
      CondTemperatura: "20ºC-30ºC",
      TamMaceta: "Pequeña",
      Paso: 1,
      Detalles: "Proporcionar soporte vertical y riego moderado",
      Estado: "Creciendo fuerte",
      EstacionRecomendada: "Otoño"
    },
    {
      id: 3,
      nombre: "Tomate",
      Image: require("../../assets/tomate.png"),
      IniFechaPlantado: 3, // Marzo
      FinFechaPlantado: 6, // Junio
      PeriodicidadRegado: 4,
      CondTemperatura: "20ºC-30ºC",
      TamMaceta: "Pequeña",
      Paso: 4,
      Detalles: "Podar para un crecimiento óptimo",
      Estado: "En floración",
      EstacionRecomendada: "Verano"
    },
    {
      id: 4,
      nombre: "Pepino",
      Image: require("../../assets/pepino.png"),
      IniFechaPlantado: 4, // Abril
      FinFechaPlantado: 7, // Julio
      PeriodicidadRegado: 3,
      CondTemperatura: "18ºC-28ºC",
      TamMaceta: "Pequeña",
      Paso: 2,
      Detalles: "Fomentar ramificación y proporcionar sombra",
      Estado: "Desarrollando frutos",
      EstacionRecomendada: "Verano"
    },
    {
      id: 5,
      nombre: "Pimiento",
      Image: require("../../assets/pimientos.png"),
      IniFechaPlantado: 3, // Marzo
      FinFechaPlantado: 7, // Julio
      PeriodicidadRegado: 5,
      CondTemperatura: "20ºC-30ºC",
      TamMaceta: "Grande",
      Paso: 5,
      Detalles: "Asegurar polinización y aumentar riego",
      Estado: "Madurando frutos",
      EstacionRecomendada: "Verano"
    },
    {
      id: 6,
      nombre: "Lechuga",
      Image: require("../../assets/lechuga.png"),
      IniFechaPlantado: 2, // Febrero
      FinFechaPlantado: 5, // Mayo
      PeriodicidadRegado: 2,
      CondTemperatura: "10ºC-22ºC",
      TamMaceta: "Pequeña",
      Paso: 3,
      Detalles: "Cosechar hojas exteriores y mantener humedad",
      Estado: "Listo para cosecha",
      EstacionRecomendada: "Primavera"
    },
    {
      id: 7,
      nombre: "Cebolla",
      Image: require("../../assets/cebolla.png"),
      IniFechaPlantado: 2, // Febrero
      FinFechaPlantado: 5, // Mayo
      PeriodicidadRegado: 2,
      CondTemperatura: "10ºC-25ºC",
      TamMaceta: "Mediana",
      Paso: 3,
      Detalles: "Cuidar del bulbo y proporcionar riego moderado",
      Estado: "Formando bulbos",
      EstacionRecomendada: "Invierno"
    },
    {
      id: 8,
      nombre: "Zanahoria",
      Image: require("../../assets/zanahoria.png"),
      IniFechaPlantado: 4, // Abril
      FinFechaPlantado: 7, // Julio
      PeriodicidadRegado: 3,
      CondTemperatura: "15ºC-24ºC",
      TamMaceta: "Pequeña",
      Paso: 2,
      Detalles: "Aflojar el suelo y proporcionar riego regular",
      Estado: "Desarrollando raíces",
      EstacionRecomendada: "Otoño"
    },
    {
      id: 9,
      nombre: "Espinaca",
      Image: require("../../assets/espinaca.png"),
      IniFechaPlantado: 2, // Febrero
      FinFechaPlantado: 6, // Junio
      PeriodicidadRegado: 2,
      CondTemperatura: "10ºC-25ºC",
      TamMaceta: "Pequeña",
      Paso: 3,
      Detalles: "Cosechar hojas y mantener suelo húmedo",
      Estado: "En crecimiento continuo",
      EstacionRecomendada: "Otoño"
    },
    {
      id: 10,
      nombre: "Calabacín",
      Image: require("../../assets/calabacin.png"),
      IniFechaPlantado: 4, // Abril
      FinFechaPlantado: 7, // Julio
      PeriodicidadRegado: 4,
      CondTemperatura: "18ºC-30ºC",
      TamMaceta: "Mediana",
      Paso: 4,
      Detalles: "Podar para un crecimiento controlado y aumentar riego",
      Estado: "Produciendo frutos",
      EstacionRecomendada: "Primavera"
    },
    {
      id: 11,
      nombre: "Frambuesa",
      Image: require("../../assets/frambuesa.png"),
      IniFechaPlantado: 2, // Febrero
      FinFechaPlantado: 5, // Mayo
      PeriodicidadRegado: 2,
      CondTemperatura: "15ºC-30ºC",
      TamMaceta: "Grande",
      Paso: 3,
      Detalles: "Proporcionar soporte vertical y riego moderado",
      Estado: "Cosechando frutos",
      EstacionRecomendada: "Primavera"
    },
    {
      id: 12,
      nombre: "Brócoli",
      Image: require("../../assets/brocoli.png"),
      IniFechaPlantado: 8, // Agosto
      FinFechaPlantado: 11, // Noviembre
      PeriodicidadRegado: 3,
      CondTemperatura: "15ºC-25ºC",
      TamMaceta: "Mediana",
      Paso: 4,
      Detalles: "Cuidar de los brotes y aplicar fertilizante",
      Estado: "Formando cabezas",
      EstacionRecomendada: "Otoño"
    },
    {
      id: 13,
      nombre: "Limón",
      Image: require("../../assets/limon.png"),
      IniFechaPlantado: 2, // Febrero
      FinFechaPlantado: 5, // Mayo
      PeriodicidadRegado: 3,
      CondTemperatura: "20ºC-30ºC",
      TamMaceta: "Grande",
      Paso: 3,
      Detalles: "Cuidar brotes y aplicar fertilizante",
      Estado: "En desarrollo",
      EstacionRecomendada: "Primavera"
    }
  ];
  
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ListaPlanta data={data} navigation={navigation} />
      <Pressable
        style={{
          backgroundColor: "lightgreen",
          padding: 10,
          borderRadius: 20,
          elevation: 2,
          position: "absolute",
          bottom: 20,
        }}
        onPress={toggleModal}
      >
        <Text>Suggest new plant</Text>
      </Pressable>
      <SuggestionModal isVisible={isModalVisible} closeModal={toggleModal} />
    </SafeAreaView>
  );
};

export default NewPlant;
