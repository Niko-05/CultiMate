import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Alert, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { GuiaPlantadoStyles } from "../styles/clase.js";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getPlantPicture } from "../utils/user";

import Regada from "../../assets/iconosSVG/GotaRegada.svg"
import NoRegada from "../../assets/iconosSVG/GotaSinRegar.svg"

import config from '../../config';

const GuiaPlantado = () => {
  const [pasos, setPasos] = useState([]);
  const [pasoActual, setPasoActual] = useState(null);
  const route = useRoute();
  const plantaData = route.params.plantaData;
  const [cargando, setCargando] = useState(true);
  const [refreshKey, setRefreshKey] = useState(1);
  const navigation = useNavigation();
  const [picture, setPicture] = useState(null);

  const screenWidth = Dimensions.get('window').width;

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
    setPicture(getPlantPicture(plantaData.planta_id));
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
      <View style={styles.container}>
        <View style={styles.backgroundLayer}>
          <Image source={require('../../assets/lineales/FASE_1_BLANCO.png')} style={styles.plantImage} />
        </View>
        <ScrollView>
          <Text style={styles.crecimientoText}>CRECIMIENTO</Text>
          <View style={styles.infoLayer}>
            <View style={{marginLeft: 20, marginRight: 20}}>
              <Text style={styles.nombreText}>{plantaData.nombre}</Text>
              <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <Image source={picture} style={{ width: 131, height:  131}} />
                <View  style={styles.descriptionContainer}>
                  {
                    plantaData.regada ?
                      <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                        <Regada width={24} height={24} />
                        <Text style={styles.regadaText}>REGADA</Text>
                      </View>
                    :
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                      <NoRegada width={24} height={24} />
                        <Text style={styles.regadaText}>SIN REGAR</Text>
                    </View>
                  }
                  <Text style={styles.descriptionText}>{pasoActual.descripcion}</Text>
                </View>
              </View>
              <Text style={[styles.nombreText, {marginTop: 30}]}>FASE {plantaData.paso}</Text>
              <View>
                {
                  plantaData.paso == 1 ?
                    <Image source={require('../../assets/fases/fase1.png')} style={styles.faseImage} />
                  :
                  plantaData.paso == 2 ?
                    <Image source={require('../../assets/fases/fase2.png')} style={styles.faseImage} />
                  :
                  plantaData.paso == 3 ?
                    <Image source={require('../../assets/fases/fase3.png')} style={styles.faseImage} />
                  :
                  plantaData.paso == 4 ?
                    <Image source={require('../../assets/fases/fase4.png')} style={styles.faseImage} />
                  :
                    <Image source={require('../../assets/fases/fase5.png')} style={styles.faseImage} />
                }
              </View>
              <View style={styles.row}></View>
              <Text style={styles.nombreText}>CUIDADOS</Text>
              <Text style={styles.infoText}>{pasoActual.cuidados}</Text>
              <View style={styles.row}></View>
              <Text style={styles.nombreText}>¿CUÁNDO PASO A LA SIGUIENTE FASE?</Text>
              <Text style={styles.infoText}>{pasoActual.apariencia}</Text>

              <View style={styles.buttonContainer}>
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
                    <Text style={styles.nextStepButtonText}>Pasar de fase {">>>"}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      /*
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
      */
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  backgroundLayer: {
    backgroundColor: '#09873D', // O el color de fondo verde que desees
    width: '100%',
    height: '50%',
    position: 'absolute',
  },
  infoLayer: {
    backgroundColor: 'white',
    borderRadius: 20, // Ajusta el borde como desees
    paddingTop: 20,
    paddingHorizontal: 5,
    marginTop: 200,
    zIndex: 0,
    height: '100%',
  },
  crecimientoText: {
    color: "#FFF",
    fontFamily: "Integral CF",
    fontSize: 24,
    position: "absolute",
    top: 165,
    left: 30,
    lineHeight: 26,
  },
  nombreText: {
    fontFamily: "Inter",
    fontSize: 15,
    lineHeight: 18.15,
    fontWeight: "bold",
  },
  regadaText: {
    fontFamily: "Inter",
    fontSize: 14,
    lineHeight: 18.15,
    fontWeight: "bold",
  },
  plantImage: {
    marginTop: 0,
    marginLeft: 213,
    width: 270,
    height: 270,
  },
  faseImage: {
    marginTop: 5,
    marginLeft: 10,
    width: "95%",
    height: 40,
    resizeMode: 'contain',
  },
  descriptionContainer: {
    marginLeft: 30,
    flex: 1,
  },
  descriptionText: {
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 20,
  },
  infoText: {
    marginTop:5,
    fontFamily: "Inter",
    fontSize: 14,
    flexWrap: 'wrap',
    textAlign: 'justify',
  },
  buttonContainer: {
    borderWidth: 1, // Grosor del borde
    borderColor: 'black', // Color del borde
    borderRadius: 20, // Redondez del borde
    paddingVertical: 5, // Espacio vertical dentro del botón
    paddingHorizontal: 15, // Espacio horizontal dentro del botón
    alignItems: 'center', // Centra el texto en el botón horizontalmente
    justifyContent: 'center', // Centra el texto en el botón verticalmente
    backgroundColor: 'transparent', // Fondo transparente
    alignSelf: 'flex-end', // Alinea el contenedor hacia la derecha del contenedor padre
    marginEnd: 10,
    marginTop: 30,
    marginBottom: 10,
  },
});

export default GuiaPlantado;