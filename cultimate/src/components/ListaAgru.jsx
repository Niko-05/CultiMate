import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import AgruItem from "./AgruItem";
const ListaAgru = ({ data, navigation }) => {
  const renderItem = ({ item }) => (
    <AgruItem item={item} navigation={navigation} data={data} />
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

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
    marginRight: 20,
  },
  viewtexto: {
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

export default ListaAgru;
