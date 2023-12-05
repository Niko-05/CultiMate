import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import Star from "../../assets/star.svg";
import * as SecureStore from "expo-secure-store";
import config from "../../config";
import { getPlantPicture } from "../utils/user";
import { addFav, deleteFav, favoritosData } from "../api/dataplantas";
function PlantListItem(props) {
  const { item, navigation, data, fav, onLoad } = props
  const [check, setCheck] = useState(false);
  const [picture, setPicture] = useState(null);
  const [favoritos, setfavoritos] = useState(fav);
  useEffect(() => {
    IconoPlantaFav();
  }, []);

  const IconoPlantaFav = async () => {
    let updatedFavs = await favoritosData();
    console.log(item.id);
    let imagen = await getPlantPicture(item.id);
    setPicture(imagen);
    setfavoritos(updatedFavs);
    setCheck(await updatedFavs.some((favit) => favit.PlantaID === item.id));
   
    if (updatedFavs.length === 0 || data[data.length - 1].id === item.id ){
      
      onLoad(); // Llama a onLoad si es el último elemento o si no hay elementos
    }
  };

  const PlantaEnfavBoton = async () => {
    try {   
        const requestBody = {
          pid: item.id,
        };
        if(favoritos.some((favit) => favit.PlantaID === item.id)){
          await deleteFav(item.id); 

        }else{
          console.log(item.id);
          await addFav(requestBody)
        }
          await IconoPlantaFav(); // Move this call here to ensure it's executed after making changes
    } catch (e) {
      console.error(e);
      Alert.alert("Network error");
    }
  };

  return (
    
    <TouchableOpacity onPress={() => navigation.navigate("Infoplanta", { id: item.id, data: data })}>
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
            onPress={PlantaEnfavBoton}
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
    width: 50,
    height: 50,
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