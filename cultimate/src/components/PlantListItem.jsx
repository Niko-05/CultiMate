import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import Star from "../../assets/star.svg";
import * as SecureStore from "expo-secure-store";
import config from "../../config";
import { getPlantPicture } from "../utils/user";

function PlantListItem({ item, navigation, data, fav, usuario }) {
  const [check, setCheck] = useState(false);
  const [picture, setPicture] = useState(null);
  const [favorit, setfavoritos] = useState(null);
  useEffect(() => {
    setPicture(getPlantPicture(item.id));
    IconoPlantaFav();
  }, []);

  const IconoPlantaFav = async () => {
    try {
      console.log(fav)
      const api_call32 = await fetch(
        `${config.API}/fav/favoritos?id=${encodeURIComponent(usuario.id)}`,
        { method: "GET" }
      );

      const favLista = await api_call32.json();
      setCheck(await favLista.some((favit) => favit.PlantaID === item.id));
    } catch (e) {
      console.error(e);
      Alert.alert("Network error");
    }
  };

  const PlantaEnfavBoton = async () => {
    try {
      const uid = usuario.id;
      const pid = item.id;

      const api_call1 = await fetch(`${config.API}/fav/Rmfavoritos/${encodeURIComponent(uid)}/${encodeURIComponent(pid)}`, {
        method: "DELETE",
      });

      if (!check) {
        const requestBody = {
          uid: usuario.id,
          pid: item.id,
        };

        const api_call2 = await fetch(`${config.API}/fav/Addfavoritos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
      }

      IconoPlantaFav(); // Move this call here to ensure it's executed after making changes
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