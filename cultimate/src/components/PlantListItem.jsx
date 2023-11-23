import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import Star from "../../assets/star.svg";
import * as SecureStore from "expo-secure-store";
import config from "../../config";import { getPlantPicture } from "../utils/user";

function PlantListItem({ item, navigation, data, fav }) {
  const [check, setCheck] = useState(false);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    setPicture(getPlantPicture(item.id));
  }, []);
  const [favoritos, setFavoritos] = useState(fav);
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
  

  const IconoPlantaFav = async (fav) => {
    try{
      const user = await getUserInfo();
      const api_call32 = await fetch(
        `${config.API}/fav/favoritos?id=${encodeURIComponent(
          user.id
        )}`,
        { method: "GET" }
      );
   
    if(fav.some((favit) => favit.PlantaID === item.id)){
      setCheck(true);
      console.log(check)
      console.log("fsda")

      console.log(favoritos)
    }else{
      setCheck(false);
      console.log(check)
      console.log(favoritos)
    }
  } catch (e) {
    console.error(e);
    Alert.alert("Network error");
  }
  }
  
  
  const PlantaEnfavBoton = async ()  =>{
    try{
      const user = await getUserInfo();
      const api_call32 = await fetch(
        `${config.API}/fav/favoritos?id=${encodeURIComponent(
          user.id
        )}`,
        { method: "GET" }
      );
     
      fav = await api_call32.json();
      console.log(fav)
      console.log(fav.some((favit) => favit.PlantaID === item.id))
    if(fav.some((favit) => favit.PlantaID === item.id)){
      const uid = user.id;
      const pid = item.id;
      const api_call1 = await fetch(`${config.API}/fav/Rmfavoritos/${encodeURIComponent(uid)}/${encodeURIComponent(pid)}`, {
        method: "DELETE"
    });
      console.log("delete")

    }else{
      
      const requestBody = {
        uid: user.id,
        pid: item.id,
      };
      console.log("Post")
      const api_call2 = await fetch(`${config.API}/fav/Addfavoritos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log("LaQueda")
      }
      console.log("LaQued2a")
     
      const api_call3 = await fetch(
        `${config.API}/fav/favoritos?id=${encodeURIComponent(
          user.id
        )}`,
        { method: "GET" }
      );
     
      fav = await api_call3.json();
      setFavoritos(fav);
      console.log("Salida")
      
      console.log(fav)
      console.log("padre")
      IconoPlantaFav(fav)
    
  } catch (e) {
    console.error(e);
    Alert.alert("Network error");
  }
  }
  useEffect(() => {
  }, [check]);
  return (
    
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Infoplanta", { id: item.id, data: data })
      }
    >
      <View style={styles.boton}>
        <View style={styles.innerContainer}>
          <View style={styles.viewimage}>
            <Image source={picture} style={styles.imagen} />
          </View>
          <View style={styles.viewtexto}>
            <Text style={styles.texto}>{item.nombre}</Text>
          </View>
          <TouchableOpacity
            accessibilityRole={"checkbox"}
            checked={check}
            onPress={() =>{PlantaEnfavBoton();}}
            className="w-7 h-7"
          >
            {check ? <Star fill="yellow" /> : <Star fill="white" />}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "lightgreen",
    padding: "7%",
    width: "96%",
    borderRadius: 15,
    marginTop: "3%",
    marginLeft: "2%",
    justifyContent: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewimage: {
    justifyContent: "center",
    marginRight: 10,
  },
  viewtexto: {
    flex: 1,
    width: "100%",
  },
  texto: {
    color: "white",
    fontSize: 24,
  },
  imagen: {
    width: 50, // Ancho de la imagen
    height: 50, // Alto de la imagen
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
});

export default PlantListItem;
