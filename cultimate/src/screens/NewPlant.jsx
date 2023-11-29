import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, Pressable, Alert } from "react-native";
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
  const cambioFav = async () => {
    try {
      const users = await getUserInfo();
      setUser(users);
      const token = await SecureStore.getItemAsync("accesstoken");
      const api_call = await fetch(
        `${config.API}/fav/favoritos?id=${encodeURIComponent(user.id)}`,
        { method: "GET" }
      );
      const result = await api_call.json();
      setFav(await result);
      console.log(favList);
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
      Alert.alert(
        "Problema de red",
        "No se ha podido mostrar el listado de plantas debido a un problema de red."
      );
    }
  };

  useEffect(() => {
    dataBD();
    favoritosBD();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  if (data.length == 0 || favoritos.length == 0) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ListaPlanta data={data} navigation={navigation} favoritos={favoritos} />
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
      backgroundColor: modoOscuroActivado
        ? darkModeBackground
        : lightModeBackground,
    },
  };
};
