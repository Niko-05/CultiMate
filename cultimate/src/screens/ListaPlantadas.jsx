import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, Pressable, Alert } from "react-native";
import ListaPlanta from "../components/ListaPlanta";
//import { SuggestionModal } from "../components/SuggestionModal";
import * as SecureStore from "expo-secure-store";
import config from "../../config";
import { getUserInfo } from "../api/user";
import { useModoOscuro } from '../context/ModoOscuroContext';
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
import ListaPlantaSinFiltro from "../components/ListaPlantaSinFiltro";


const ListaPlantadas= ({ navigation }) => {
  const [data, setData] = useState([]);
  const [favList, setFav] = useState([]);
  const [user, setUser] = useState([]);
  const { modoOscuroActivado }= useModoOscuro();
  const styles = getStyles(modoOscuroActivado);
  const dat =[
  { id: 1, nombre: "Fresa", imagen: require("../../assets/Fresa.png") },
  { id: 2,  nombre: "Mora", imagen: require("../../assets/mora.png") },
  {
    id: 3,
    nombre: "Tomate",
    imagen: require("../../assets/tomate.png"),
  },
  {
    id: 4,
    nombre: "Pepino",
    imagen: require("../../assets/pepino.png"),
  }]


 

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ListaPlantaSinFiltro data={dat} navigation={navigation} />

    </SafeAreaView>
  );
};

export default ListaPlantadas;

const getStyles = (modoOscuroActivado) => {
  return {
  container: { 
    flex: 1, 
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: modoOscuroActivado ? darkModeBackground: lightModeBackground,
  },
  }};