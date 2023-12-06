import * as SecureStore from "expo-secure-store";
import config from "../../config";
import { Alert } from "react-native";

export const favoritosData = async () => {
    try {
      const token = await SecureStore.getItemAsync("accesstoken");
      const api_call = await fetch(
        `${config.API}/fav/favoritos`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      const result = await api_call.json();
      
     
      if (!api_call.ok) {
        // Handle non-OK response status
        Alert.alert(
          "API error",
          `Failed to fetch user data. Status: ${api_call.status}`
        );
        
      }
      return result;

    } catch (e) {
      console.error(e);
      Alert.alert("Network error");
    }
  };
  export const getDataPlants = async () => {
    try {
      console.log('DAta');
      const api_call = await fetch(`${config.API}/planta`);
      const result = await api_call.json();
      console.log('DAta' + result);
      return result;
    } catch (e) {
      Alert.alert('Problema de red', 'No se ha podido mostrar el listado de plantas debido a un problema de red.');
    }
    
  };
  export const addFav = async (requestBody)=>{
    try {
    const token = await SecureStore.getItemAsync("accesstoken");
    const api_call = await fetch(`${config.API}/fav/Addfavoritos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });
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
  }
  export const deleteFav = async (pid) => {
    try {
      console.log(pid);
      const token = await SecureStore.getItemAsync("accesstoken");
      const api_call = await fetch(`${config.API}/fav/Rmfavoritos/${encodeURIComponent(pid)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Check if the response is empty (status 204 No Content for successful DELETE)
      if (api_call.status === 204) {
        console.log("Successfully deleted");
        return; // No need to parse empty response
      }
  
      const result = await api_call.json();
  
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