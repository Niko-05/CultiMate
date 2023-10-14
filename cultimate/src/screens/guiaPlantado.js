import React from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity, Button, StyleSheet, Image } from 'react-native';
import { GuiaPlantadoStyles } from '../styles/clase.js';

  

const GuiaPlantado = () => {
return (
    <ScrollView style={GuiaPlantadoStyles.pagina}>
      <View style={GuiaPlantadoStyles.plantInfoContainer}>
        <Text style={GuiaPlantadoStyles.titulo}>Planta: </Text>
        <Text style={GuiaPlantadoStyles.infoText}>Tomate</Text>
      </View>

      <View style={GuiaPlantadoStyles.plantInfoContainer}>
        <Text style={GuiaPlantadoStyles.titulo}>Fecha de Plantado: </Text>
        <Text style={GuiaPlantadoStyles.infoText}>25 de octubre, 2023</Text>
      </View>

      
      <View style={GuiaPlantadoStyles.container2}>
        <Image style = {GuiaPlantadoStyles.image} source= {require("../../assets/regar.png")}/>
        <Text style={GuiaPlantadoStyles.infoText}>Regar 2 veces al día</Text>
      </View>


      <View style={GuiaPlantadoStyles.container2}>
        <Image style = {GuiaPlantadoStyles.image} source= {require("../../assets/termometro.png")}/>
        <Text style={GuiaPlantadoStyles.infoText}>20ºC - 25ºC </Text>
      </View>


      <View style={GuiaPlantadoStyles.container2}>
        <Image style = {GuiaPlantadoStyles.image} source= {require("../../assets/planta.png")}/>
        <Text style={GuiaPlantadoStyles.infoText}>Maceta mediana</Text>
      </View>

        
      <View>
        <View style={GuiaPlantadoStyles.plantInfoContainer}>
          <Text style={GuiaPlantadoStyles.titulo}>Paso: </Text>
          <Text style={GuiaPlantadoStyles.infoText}> 1</Text>
        </View>
        
        <View style={GuiaPlantadoStyles.plantInfoContainer}>
          <Text style={GuiaPlantadoStyles.titulo}>Detalles: </Text>
          <Text style={GuiaPlantadoStyles.infoText}>Preparar la maceta y el sustrato </Text>
        </View>

        <View style={GuiaPlantadoStyles.plantInfoContainer}>
          <Text style={GuiaPlantadoStyles.titulo}>Estado de la Planta: </Text>
          <Text style={GuiaPlantadoStyles.infoText}>Preparar la maceta y el sustrato </Text>
        </View>

        <View style={GuiaPlantadoStyles.separador} />

        <View style={GuiaPlantadoStyles.plantInfoContainer}>
          <View style={GuiaPlantadoStyles.fondobutton}>
            <TouchableOpacity style={GuiaPlantadoStyles.button}>
              <Text style={GuiaPlantadoStyles.textbutton}>¿Qué hago ahora?</Text>
              </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
    );
}

export default GuiaPlantado;