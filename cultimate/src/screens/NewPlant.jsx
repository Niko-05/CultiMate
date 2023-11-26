import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, Pressable, Alert } from "react-native";
import ListaPlanta from "../components/ListaPlanta";
import { SuggestionModal } from "../components/SuggestionModal";
import * as SecureStore from "expo-secure-store";
import config from "../../config";
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


const NewPlant = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [favList, setFav] = useState([]);
  const { modoOscuroActivado }= useModoOscuro();
  const styles = getStyles(modoOscuroActivado); 
  const getUserInfo = async () => {
    try {
      // This is the way to access the token
      const token = await SecureStore.getItemAsync("accesstoken");
      const api_call = await fetch(`${config.API}/user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!api_call.ok) {
        // Handle non-OK response status
        Alert.alert(
          "API error",
          `Failed to fetch user data. Status: ${api_call.status}`
        );
        return;
      }
  
      const result = await api_call.json();
      return result;
    } catch (e) {
      console.error(e);
      Alert.alert("Network error");
    }
  };

  const cambioFav = async ()=>{
    try{
      const user = await getUserInfo();
      const token = await SecureStore.getItemAsync("accesstoken");
      const api_call = await fetch(
      `${config.API}/fav/favoritos?id=${encodeURIComponent(
        user.id
      )}`,
      { method: "GET" }
    );
   const result = await api_call.json();
   setFav(result);

    if (!api_call.ok) {
      // Handle non-OK response status
      Alert.alert(
        "API error",
        `Failed to fetch user data. Status: ${api_call.status}`
      );
    }
  
   
  } catch (e) {
    console.error(e);
    Alert.alert("Network error");
  }
  };
  const setFullList = async () => {
    try {
      const api_call = await fetch(`${config.API}/planta`);
      const result = await api_call.json();
      setData(result);
    } catch (e) {
      Alert.alert('Problema de red', 'No se ha podido mostrar el listado de plantas debido a un problema de red.');
    }
  }

  
  useEffect(() => {
    setFullList();
    cambioFav();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ListaPlanta data={data} favLista={favList} navigation={navigation} />
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

const getStyles = (modoOscuroActivado) => {
  return {
  container: { 
    flex: 1, 
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: modoOscuroActivado ? darkModeBackground: lightModeBackground,
  },
  }};