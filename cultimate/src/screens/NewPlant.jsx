import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, Pressable, Alert } from "react-native";
import ListaPlanta from "../components/ListaPlanta";
import { SuggestionModal } from "../components/SuggestionModal";

import config from '../../config';

const NewPlant = ({ navigation }) => {
  const [data, setData] = useState([]);

  const setFullList = async () => {
    try {
      const api_call = await fetch(`${config.API}/planta`);
      const result = await api_call.json();
      setData(result);
      console.log(result);
    } catch (e) {
      Alert.alert('Problema de red', 'No se ha podido mostrar el listado de plantas debido a un problema de red.');
    }
  }

  useEffect(() => {
    setFullList();
  }, []);

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
