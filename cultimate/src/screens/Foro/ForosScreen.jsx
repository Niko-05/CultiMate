import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import config from '../../../config';

const ForosScreen = ({ navigation }) => {
  const [foros, setForos] = useState([]);

  useEffect(() => {
    const obtenerForos = async () => {
      try {
        const response = await fetch(`${config.API}/foro`);
        
        if (!response.ok) {
          console.error('Error al obtener los foros', response.status);
          Alert.alert('Error', 'Hubo un problema al obtener los foros'); // Asegúrate de importar Alert
          return;
        }

        const data = await response.json();
        setForos(data);
      } catch (error) {
        console.error('Error al obtener los foros', error);
        Alert.alert('Error', 'Hubo un problema al obtener los foros'); // Asegúrate de importar Alert
      }
    };

    obtenerForos();
  }, []);

  
  


  const navigateToForo = (foroId) => {
    navigation.navigate('ForoPlantaScreen', { foroId });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {foros.map((foro) => (
        <TouchableOpacity
          key={foro.id}
          style={styles.foroCard}
          onPress={() => navigateToForo(foro.id)}
        >
          <Image
            source={foro.imagen ? { uri: foro.imagen } : require('../../../assets/tomate.png')}
            style={styles.imagenForo}
          />
          <Text style={styles.nombreForo}>{foro.nombre}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  foroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff', // Color de fondo de la tarjeta
    borderRadius: 8,
    overflow: 'hidden', // Para asegurarse de que las esquinas redondeadas se apliquen correctamente
    elevation: 4, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imagenForo: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  nombreForo: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
});

export default ForosScreen;
