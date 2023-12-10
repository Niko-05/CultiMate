import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Text, Pressable, Alert, Image } from "react-native";
import ListaPlanta from "../components/ListaPlanta";
import { SuggestionModal } from "../components/SuggestionModal";
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

  }
  const favoritosBD = async () => {
    const res = await favoritosData();
    setFavoritos(res);
    
    console.log("Favels" + favoritos);
  }
 

  
  useEffect(() => {
      dataBD();
      favoritosBD();
    }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  if (data.length == 0|| favoritos.length == 0) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.backgroundLayer}>
        <Image source={require('../../assets/lineales/mora-linea-blanca.png')} style={styles.plantImage} />
      </View>
      <ScrollView>
        <View style={styles.infoLayer}>
          <Text style={styles.newPlant}>NUEVA PLANTA</Text>
          <View style={{marginTop: 20}}>
            <ListaPlanta data={data} navigation={navigation} favoritos = {favoritos}/>
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
        </View>
      </ScrollView>
    </View>
    /*
    <SafeAreaView
      style={styles.container}
    >
      <ListaPlanta data={data} navigation={navigation} favoritos = {favoritos}/>
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
    */
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
    marginTop: -55,
    marginLeft: 15,
    fontSize: 24,
    fontWeight: "bold",
    color: 'white',
    marginBottom: 0,
  },
  infoLayer: {
    backgroundColor: 'white',
    borderRadius: 20, // Ajusta el borde como desees
    paddingTop: 20,
    paddingHorizontal: 5,
    marginTop: 170,
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