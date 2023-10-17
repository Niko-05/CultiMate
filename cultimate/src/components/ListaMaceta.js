import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Infoplanta from '../screens/infoplanta';
import DropDownPicker from 'react-native-dropdown-picker';

const ListaPlanta = ({ data, navigation }) => {

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('GuiaPlantado', { id: item.id, data: data })}>
      <View style={styles.boton}>
        <View style={styles.innerContainer}>
          <View style={styles.viewimage}>
            <Image source={item.Image} style={styles.imagen} />
          </View>
          <View style={styles.viewtexto}>
            <Text style={styles.texto}>{item.nombre}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
    </View>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: 'lightgreen',
    padding: '7%',
    width: '96%',
    borderRadius: 15,
    marginTop: '3%',
    marginLeft: '2%',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewimage: {
    justifyContent: 'center',
    marginRight: 10,
  },
  viewtexto: {
    width: '100%',
  },
  texto: {
    color: 'white',
    fontSize: 24,
  },
  imagen: {
    width: 50, // Ancho de la imagen
    height: 50, // Alto de la imagen
  },
});

export default ListaPlanta;