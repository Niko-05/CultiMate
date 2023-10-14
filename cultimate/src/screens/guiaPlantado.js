import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, Image } from 'react-native';
import { GuiaPlantadoStyles } from '../styles/clase.js';

  

const GuiaPlantado = () => {
return (
    <View style={GuiaPlantadoStyles.container}>
      <View style={GuiaPlantadoStyles.plantInfoContainer}>
        <Text style={GuiaPlantadoStyles.infoLabel}>Planta: </Text>
        <Text style={GuiaPlantadoStyles.infoText}>Tomate</Text>
      </View>

      <View style={GuiaPlantadoStyles.plantInfoContainer}>
        <Text style={GuiaPlantadoStyles.infoLabel}>Fecha de Plantado: </Text>
        <Text style={GuiaPlantadoStyles.infoText}>25 de octubre, 2023</Text>
      </View>
      
      <View style={GuiaPlantadoStyles.containerFila}>
        <Image style = {GuiaPlantadoStyles.image} source= {require("../../assets/regar.png")}/>
        <Text style={GuiaPlantadoStyles.infoText}>Regar 2 veces al día</Text>
      </View>

      <View style={GuiaPlantadoStyles.containerFila}>
        <Image style = {GuiaPlantadoStyles.image} source= {require("../../assets/termometro.png")}/>
        <Text style={GuiaPlantadoStyles.infoText}>20ºC - 25ºC</Text>
      </View>

      <View style={GuiaPlantadoStyles.containerFila}>
        <Image style = {GuiaPlantadoStyles.image} source= {require("../../assets/planta.png")}/>
        <Text style={GuiaPlantadoStyles.infoText}>Maceta mediana</Text>
      </View>
      
      <View>
        <View style={GuiaPlantadoStyles.plantInfoContainer}>
          <Text style={GuiaPlantadoStyles.infoLabel}>Paso: </Text>
          <Text style={GuiaPlantadoStyles.infoText}> 1</Text>
        </View>

        <View style={GuiaPlantadoStyles.plantInfoContainer}>
          <Text style={GuiaPlantadoStyles.infoLabel}>Detalles: </Text>
          <Text style={GuiaPlantadoStyles.infoText}> Preparar la maceta y el sustrato</Text>
        </View>

        <View style={GuiaPlantadoStyles.plantInfoContainer}>
          <Text style={GuiaPlantadoStyles.infoLabel}>Estado de la Planta: </Text>
          <Text style={GuiaPlantadoStyles.infoText}> Preparar la maceta y el sustrato</Text>
        </View>

        <View style={GuiaPlantadoStyles.plantInfoContainer}>
          <Button color={'#5ac15d'} title='¿Qué hago ahora?'/>
        </View>

      </View>
    </View>
    );
}

export default GuiaPlantado;
