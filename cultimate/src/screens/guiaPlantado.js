import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { GuiaPlantadoStyles } from '../styles/clase.js';

  

const GuiaPlantado = () => {
return (
    <View style={GuiaPlantadoStyles.container}>
      <Text style={GuiaPlantadoStyles.headerText}>Guía de Plantado</Text>
      <View style={GuiaPlantadoStyles.plantInfoContainer}>
        <Text style={GuiaPlantadoStyles.infoLabel}>Planta:</Text>
        <Text style={GuiaPlantadoStyles.infoText}>Tomate</Text>
      </View>
      <View style={GuiaPlantadoStyles.plantInfoContainer}>
        <Text style={GuiaPlantadoStyles.infoLabel}>Fecha de Plantado:</Text>
        <Text style={GuiaPlantadoStyles.infoText}>25 de octubre, 2023</Text>
      </View>
      {/* Otros elementos aquí */}
    </View>
    );
}

export default GuiaPlantado;
