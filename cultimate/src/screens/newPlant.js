import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import ListaPlanta from "../components/ListaPlanta";
import { SuggestionModal } from "./suggestionModal";

const NewPlant = ({ navigation }) => {
  const data = [
    {
      id: 2,
      nombre: "Fresas",
      Image: require("../../assets/Fresa.png"),
      Descripcion: "Las fresas son una planta frutal deliciosa",
      DificultadPlantado: 2,
      Tipo: "Exterior",
      EstacionRecomendada: "Primavera",
      FuncionalidadPlanta: "Postre/Reposteria",
      IniFechaPlantado: "2023-04-01",
      FinFechaPlantado: "2023-06-30",
      PeriodicidadRegado: 2,
      CondLuminosas: "Luz directa",
      CondTemperatura: "Moderada",
      TamMaceta: 12,
      CategoriaID: 1,
    },
    {
      id: 3,
      nombre: "Mora",
      Image: require("../../assets/mora.png"),
      Descripcion: "Las moras son frutas deliciosas y versátiles",
      DificultadPlantado: 3,
      Tipo: "Exterior",
      EstacionRecomendada: "Verano",
      FuncionalidadPlanta: "Postre/Reposteria",
      IniFechaPlantado: "2023-06-01",
      FinFechaPlantado: "2023-09-30",
      PeriodicidadRegado: 2,
      CondLuminosas: "Luz directa",
      CondTemperatura: "Moderada",
      TamMaceta: 15,
      CategoriaID: 1,
    },
    {
      id: 4,
      nombre: "Limonero",
      Image: require("../../assets/limon.png"),
      Descripcion: "El limonero es un árbol frutal conocido por sus limones",
      DificultadPlantado: 2,
      Tipo: "Exterior",
      EstacionRecomendada: "Primavera",
      FuncionalidadPlanta: "Producción de limones",
      IniFechaPlantado: "2023-03-01",
      FinFechaPlantado: "2023-10-31",
      PeriodicidadRegado: 3,
      CondLuminosas: "Luz directa",
      CondTemperatura: "Cálida",
      TamMaceta: 20,
      CategoriaID: 1,
    },
  ];

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
    </View>
  );
};

export default NewPlant;
