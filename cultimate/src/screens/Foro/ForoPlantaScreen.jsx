import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import config from '../../../config';

const ForoScreen = ({ route, navigation }) => {
  const { foroId } = route.params;
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const obtenerPublicaciones = async () => {
      try {
        const response = await fetch(`${config.API}/publicacion/foro/${foroId}`);
        const data = await response.json();
        setPublicaciones(data);
      } catch (error) {
        console.error('Error al obtener las publicaciones', error);
        Alert.alert('Error', 'Hubo un problema al obtener las publicaciones');
      }
    };

    obtenerPublicaciones();
  }, [foroId]);

  const navigateToNewPublication = () => {
    navigation.navigate('NewPublication', { foroId }); // Asegúrate de tener esta pantalla registrada en tu sistema de navegación
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {publicaciones.map((item) => (
        <View key={item.id} style={styles.publicacionContainer}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.cuerpo}>{item.cuerpo}</Text>
          {/* Otros elementos de la publicación, como la imagen, podrían mostrarse aquí */}
        </View>
      ))}
      <TouchableOpacity style={styles.botonMas} onPress={navigateToNewPublication}>
        <Text style={styles.textoBotonMas}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80, // Espacio suficiente para el botón en la parte inferior
  },
  publicacionContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cuerpo: {
    fontSize: 16,
  },
  botonMas: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: [{ translateX: -25 }], // Para centrar el botón
    backgroundColor: '#007bff', // Color del fondo del botón
    borderRadius: 50, // Para hacer un botón redondo
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  textoBotonMas: {
    color: '#fff', // Color del texto del botón
    fontSize: 24,
  },
});

export default ForoScreen;
