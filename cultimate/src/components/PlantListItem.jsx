import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import Star from "../../assets/star.svg";
import * as SecureStore from "expo-secure-store";
import config from "../../config";
import { getPlantPicture } from "../utils/user";
import { addFav, deleteFav, favoritosData } from "../api/dataplantas";
function PlantListItem(props) {
  const { item, navigation, data, fav, onLoad, filtro } = props
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
    console.log("OLA:" + updatedFavs.length)
    console.log(filtro)
    if ((updatedFavs.length === 0 && filtro == "Favoritos")|| data[data.length - 1].id === item.id ){
      
      onLoad(); // Llama a onLoad si es el último elemento o si no hay elementos
    }
  };

  const PlantaEnfavBoton = async () => {
    try {
      const requestBody = {
        pid: item.id,
      };
      if (favoritos.some((favit) => favit.PlantaID === item.id)) {
        await deleteFav(item.id);
      } else {
        console.log(item.id);
        await addFav(requestBody);
      }
      await IconoPlantaFav(); // Move this call here to ensure it's executed after making changes
    } catch (e) {
      console.error(e);
      Alert.alert("Network error");
    }
  };

  return (
    
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate("Infoplanta", { id: item.id, data: data })}>
      <View style={styles.boton}>
        <View style={styles.innerContainer}>
          <View style={styles.viewtexto}>
            <Text style={styles.texto}>{item.nombre}</Text>
          </View>
          <View style={styles.viewimage}>
            <Image source={picture} style={styles.imagen} />
          </View>
          <TouchableOpacity
            style={styles.favs}
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
    backgroundColor: "#D1EAD0",
    padding: "7%",
    width: "96%",
    borderRadius: 15,
    marginTop: "3%",
    marginLeft: "2%",
    height: 220,
  },
  innerContainer: {
    alignItems: "center",
  },
  viewimage: {
    marginTop: 30,
    alignItems: 'center',
  },
  viewtexto: {
    position: 'absolute',
    width: "100%",
  },
  texto: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  imagen: {
    width: 150,
    height: 150,
    position: 'absolute',
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  itemContainer: {
    flex: 0.5, // Asigna el 50% del espacio disponible a cada elemento
    padding: 5, // Añade un poco de padding si lo necesitas
    // Añade otros estilos para el contenedor de cada elemento aquí
  },
  favs: {
    position: 'absolute',
    right: 0, // Alineado a la derecha del contenedor padre
    bottom: -170,
  },
});

export default PlantListItem;
