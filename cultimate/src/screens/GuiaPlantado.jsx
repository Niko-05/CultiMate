import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { GuiaPlantadoStyles } from "../styles/clase.js";
import { useRoute, useNavigation } from "@react-navigation/native";
import config from '../../config';

const GuiaPlantado = () => {
  const [pasos, setPasos] = useState([]);
  const [pasoActual, setPasoActual] = useState(null);
  const route = useRoute();
  const plantaData = route.params.plantaData;
  const [cargando, setCargando] = useState(true);
  const [refreshKey, setRefreshKey] = useState(1);
  const navigation = useNavigation();

  const delPlantada = async () => {
    try {
      await fetch(`${config.API}/planta/delPlantada/${plantaData.id}`, {
        method: 'DELETE'
      });
      // Volver a la pantalla anterior
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo finalizar el plantado.');
    }
  };

  const esUltimoPaso = () => {
    if (pasos.length === 0) return false;
    const ultimoPaso = pasos[pasos.length - 1].paso;
    return pasoActual.paso === ultimoPaso;
  };

  const getPasos = async () => {
    try {
      console.log(plantaData.id);
      const url = `${config.API}/planta/pasos?id=${plantaData.planta_id}`;
      const api_call = await fetch(url);
      const result = await api_call.json();
      setPasos(result);
    } catch (e) {
      Alert.alert('Problema de red', 'No se ha podido mostrar el paso de plantado debido a un problema de red.');
    } finally {
      setCargando(false);
    }
  }

  const siguientePaso = async () => {
    try {
      const response = await fetch(`${config.API}/planta/nextStep/${plantaData.id}`, { 
        method: 'PUT',
      });
      if (response.ok) {
        plantaData.paso++;
        getPasos(); // Vuelve a obtener los pasos para actualizar pasoActual
      } else {
        console.error("Error al actualizar el paso");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPasos();
    console.log('los datos que vienen desde el huerto', pasos);
  }, []);

  useEffect(() => {
    const pasoEncontrado = pasos.find(paso => paso.paso === plantaData.paso);
    setPasoActual(pasoEncontrado);
  }, [pasos, plantaData.paso]);

  if (!pasoActual) {
    return (
      <View style={GuiaPlantadoStyles.cargandoContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  if (!plantaData) {
    return (
      <View style={GuiaPlantadoStyles.container}>
        <Text>Elemento no encontrado</Text>
      </View>
    );
  }

  if (cargando) {
    return (
      <View style={GuiaPlantadoStyles.cargandoContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!cargando) {

    return (
      <ScrollView key={refreshKey} style={GuiaPlantadoStyles.pagina}>
        <View style={GuiaPlantadoStyles.plantInfoContainer}>
          <Text style={GuiaPlantadoStyles.titulo}>Planta: </Text>
          <Text style={GuiaPlantadoStyles.infoText}>{plantaData.nombre}</Text>
        </View>

        <View style={GuiaPlantadoStyles.plantInfoContainer}>
          <Text style={GuiaPlantadoStyles.titulo}>Fecha de Plantado: </Text>
          <Text style={GuiaPlantadoStyles.infoText}>{plantaData.fechaPlantada}</Text>
        </View>

        <View style={GuiaPlantadoStyles.container2}>
          <Image
            style={GuiaPlantadoStyles.image}
            source={require("../../assets/regar.png")}
          />
          <Text style={GuiaPlantadoStyles.infoText}>
            Regar {plantaData.periodicidad_regado} veces al día
          </Text>
        </View>

        <View style={GuiaPlantadoStyles.container2}>
          <Image
            style={GuiaPlantadoStyles.image}
            source={require("../../assets/termometro.png")}
          />
          <Text style={GuiaPlantadoStyles.infoText}>{plantaData.condiciones_temperatura}</Text>
        </View>

        <View>
          <View style={GuiaPlantadoStyles.plantInfoContainer}>
            <Text style={GuiaPlantadoStyles.titulo}>Paso: </Text>
            <Text style={GuiaPlantadoStyles.infoText}>{plantaData.paso}</Text>
          </View>

          <View style={GuiaPlantadoStyles.plantInfoContainer}>
            <Text style={GuiaPlantadoStyles.titulo}>Descripcion: </Text>
            <Text style={GuiaPlantadoStyles.infoText}>{pasoActual.descripcion}</Text>
          </View>
          
          <View style={GuiaPlantadoStyles.separador} />

          <View style={GuiaPlantadoStyles.plantInfoContainer}>
            <Text style={GuiaPlantadoStyles.titulo}>Cuidados: </Text>
            <Text style={GuiaPlantadoStyles.infoText}>{pasoActual.cuidados}</Text>
          </View>

          <View style={GuiaPlantadoStyles.separador} />

          <View style={GuiaPlantadoStyles.plantInfoContainer}>
            <Text style={GuiaPlantadoStyles.titulo}>¿Cuando devo pasar al siguiente paso? </Text>
            <Text style={GuiaPlantadoStyles.infoText}>{pasoActual.apariencia}</Text>
          </View>


          <View style={styles.nextStepButtonContainer}>
            {esUltimoPaso() ? (
              <TouchableOpacity 
                style={styles.nextStepButton} 
                onPress={() => {delPlantada(), navigation.goBa}}
              >
                <Text style={styles.nextStepButtonText}>Finalizar plantado</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.nextStepButton} 
                onPress={siguientePaso}
              >
                <Text style={styles.nextStepButtonText}>Siguiente paso</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  nextStepButtonContainer: {
      margintop: 10,
      bottom: 20,
      marginBottom: 10,
      marginTop: 15
  },
  nextStepButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
  },
  nextStepButtonText: {
      color: 'white',
      textAlign: 'center',
  },
});

export default GuiaPlantado;