import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Text, Pressable, Alert, Image,ActivityIndicator } from "react-native";
import ListaPlanta from "../components/ListaPlanta";
import { SuggestionModal } from "../components/SuggestionModal";
import * as SecureStore from "expo-secure-store";
import config from "../../config";
import { getUserInfo } from "../api/user";
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
import { getDataPlants } from "../api/dataplantas";
import { favoritosData } from "../api/dataplantas";
const NewPlant = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const { modoOscuroActivado } = useModoOscuro();
  const styles = getStyles(modoOscuroActivado);
  const dataBD = async () => {
    const res = await getDataPlants();
    setData(res);

    console.log("Data:" + data);
  };
  const favoritosBD = async () => {
    const res = await favoritosData();
    setFavoritos(res);

    console.log("Favels" + favoritos);
  };

  useEffect(() => {
    dataBD();
    favoritosBD();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  if (data.length == 0) {
    return <View style={{ backgroundColor: 'white', overflow: 'hidden', zIndex: 1, alignItems: "center", justifyContent: "center" }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
  }
  return (
    <View style={styles.container}>
      <View style={styles.backgroundLayer}>
        <Image source={require('../../assets/lineales/mora-linea-blanca.png')} style={styles.plantImage} />
      </View>
      <ScrollView>
        <Text style={styles.newPlant}>NUEVA PLANTA</Text>
        <View style={styles.infoLayer}>
          <View style={{marginTop: 20}}>
            <ListaPlanta data={data} navigation={navigation} favoritos = {favoritos}/>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewPlant;

const getStyles = (modoOscuroActivado) => {
  return {
  container: {
  },
  backgroundLayer: {
    backgroundColor: '#09873D', // O el color de fondo verde que desees
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  newPlant: {
    color: "#FFF",
    fontFamily: "Integral CF",
    fontSize: 24,
    position: "absolute",
    top: 165,
    left: 30,
    lineHeight: 26,
  },
  infoLayer: {
    backgroundColor: 'white',
    borderRadius: 20, // Ajusta el borde como desees
    paddingTop: 20,
    paddingHorizontal: 5,
    marginTop: 200,
    marginBottom: 80,
    zIndex: 0,
    height: '100%',
  },
  plantImage: {
    marginTop: 10,
    marginLeft: 243,
    width: 180, // Ajusta al tamaño que necesites
    height: 180, // Ajusta al tamaño que necesites
  },
  }
};
