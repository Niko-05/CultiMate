import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, Pressable, Alert } from "react-native";
import ListaPlanta from "../components/ListaPlanta";
import { SuggestionModal } from "../components/SuggestionModal";
import * as SecureStore from "expo-secure-store";
import config from "../../config";
import { getUserInfo } from "../api/user";


  

  
const NewPlant = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [favList, setFav] = useState([]);
  const [user, setUser] = useState([])

  const cambioFav = async ()=>{
    try{
      const users = await getUserInfo();
      setUser(users);
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
    console.log(user);
  }, [user])
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
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ListaPlanta data={data} favLista={favList} navigation={navigation} usuario= {user} />
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
