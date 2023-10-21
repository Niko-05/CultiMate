import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import GridIconos from '../components/GridIconos';


const User = () => {
  const elements = [
    { id: 1, title: 'Logro 1', imageSource: require('../../assets/Fresa.png') },
    { id: 2, title: 'Logro 2', imageSource: require('../../assets/mora.png') },
    { id: 3, title: 'Logro 3', imageSource: require('../../assets/tomate.png') },
    { id: 4, title: 'Logro 4', imageSource: require('../../assets/pepino.png') },
    { id: 5, title: 'Logro 5', imageSource: require('../../assets/pimientos.png') },
    { id: 6, title: 'Logro 6', imageSource: require('../../assets/Fresa.png') },
    { id: 7, title: 'Logro 7', imageSource: require('../../assets/mora.png') },
    // Puedes agregar más logros aquí
  ];


  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.profileImageBackground}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/Fresa.png')} // Ruta de la imagen
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>Nombre del Usuario</Text>
      </View>
      <View style={styles.centeredView}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Logros</Text>
        </View>
        <GridIconos elements={elements}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 10,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  profileImageBackground: {
    borderRadius: 100,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    margin: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  containerTitle: {
    // flexDirection: 'column', // Puedes quitar esta línea si quieres que sea una columna
    textAlign: 'left',
    width: '100%',
    paddingTop: 10,
  },
  // ... Otros estilos
});

export default User;