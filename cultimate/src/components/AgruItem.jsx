import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Star from "../../assets/star.svg";

function AgruItem({ item, navigation, data }) {


  return (
    <TouchableOpacity
      onPress={() => {
        console.log("Item pressed:", item);
        // navigation.navigate("GuiaPlantado", { id: item.id, data: data });
      }}
    >
      <View style={styles.boton}>
        <View style={styles.innerContainer}>
          <View style={styles.viewtexto}>
            <Text style={styles.texto}>{item.nombre}</Text>
          </View>
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

export default AgruItem;
