import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getPlantPicture } from "../utils/user";
import { getUserInfo } from "../api/user";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import config from '../../config';
import { useModoOscuro } from '../context/ModoOscuroContext';
import { 
  lightModeBackground, 
  darkModeBackground, 
  lightModeText, 
  darkModeText, 
  lightbuttonBackground, 
  darkbuttonBackground, 
  lightbuttonText, 
  darkbuttonText 
} from "../utils/colores";

const Infoplanta = ({navigation}) => {
  const route = useRoute();
  const { id, data } = route.params;
  const [guia, setGuia] = useState(null);
  const item = data.find((item) => item.id === id);
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const [picture, setPicture] = useState(null);
  const { modoOscuroActivado }= useModoOscuro();
  const styles = getStyles(modoOscuroActivado); 
  const [userinfo, setUserinfo] = useState(null);

  const getGuia = async () => {
    const api_call = await fetch(`${config.API}/planta/guia/${id}`, {
        method: 'GET',
    });

    const result = await api_call.json();
    setGuia(result[0]);
  }

  const setUserInfo = async () => {
    try {
      const userInfoResponse = await getUserInfo();
      setUserinfo(userInfoResponse);
    } catch (error) {
      console.error('Error al obtener userinfo:', error);
    }
  };

  useEffect(() => {
    setUserInfo();
  }, []);


  const handleAddPress = () => {
    Alert.alert(
      "Cultivar Planta",
      "¿Quieres empezar a cultivar esta planta?",
      [
        {
          text: "No",
          onPress: () => console.log("No se iniciará el cultivo"),
          style: "cancel"
        },
        {
          text: "Sí",
          onPress: () => iniciarCultivo() // Reemplaza iniciarCultivo con la función que iniciarás
        }
      ],
      { cancelable: true }
    );
  };
  
  const iniciarCultivo = async () => {
    console.log("Se ha iniciado el cultivo de la planta.");
    try {
        const api_call = await fetch(`${config.API}/planta/addPlant`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: userinfo.id, pid: item.id }),
        });

        const response = await api_call.json();

        if (api_call.ok && response.message === 'Inserción exitosa') {
            Alert.alert("Éxito", "Planta agregada correctamente");
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigation.navigate("Guias de Plantado");
        } else {
            Alert.alert("Error", "No se pudo agregar la planta");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "No se pudo agregar la planta debido a un error en la red o en el servidor");
    }
  };
  

  useEffect(() => {
    getGuia();
    setPicture(getPlantPicture(item.id));
  }, [id]);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Elemento no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.nombre}</Text>
        <View style={styles.roundedContainer}>
          <Image source={picture} style={styles.image} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="format-list-bulleted" size={24} color="gray" />
          <Text style={styles.infoText}>Descripción: {item.descripcion}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="brightness-auto" size={24} color="gray" />
          <Text style={styles.infoText}>
            Dificultad de plantado: {item.dificultad_plantado}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="leaf" size={24} color="gray" />
          <Text style={styles.infoText}>Tipo: {item.tipo}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="calendar" size={24} color="gray" />
          <Text style={styles.infoText}>
            Estación recomendada: {item.estacion_recomendada}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="tools" size={24} color="gray" />
          <Text style={styles.infoText}>
            Funcionalidad: {item.funcionalidad_planta}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="calendar-range" size={24} color="gray" />
          <Text style={styles.infoText}>
            Inicio de plantado: {guia ? months[guia.inicio_periodo] : 'Cargando...'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="calendar-range" size={24} color="gray" />
          <Text style={styles.infoText}>
            Final de plantado: {guia ? months[guia.fin_periodo] : 'Cargando...'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="water" size={24} color="gray" />
          <Text style={styles.infoText}>
            Periodicidad de riego: {guia ? guia.periodicidad_regado : 'Cargando...'} días
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="weather-sunny" size={24} color="gray" />
          <Text style={styles.infoText}>
            Condiciones luminosas: {guia ? guia.condiciones_luminosas : 'Cargando...'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="thermometer" size={24} color="gray" />
          <Text style={styles.infoText}>
            Condiciones de temperatura: {guia ? guia.condiciones_temperatura : 'Cargando...'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="flower" size={24} color="gray" />
          <Text style={styles.infoText}>
            Tamaño de maceta: {guia ? guia.tam_maceta : 'Cargando...'} litros
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="fruit-cherries" size={24} color="gray" />
          <Text style={styles.infoText}>Categoría: fruta</Text>
        </View>
      </View>

      <Text style={styles.gCalendarFont}>Growing calendar</Text>

      <View style = {{marginHorizontal: 10}}>
        <View style={styles.calendarCont}>
          <Text style={styles.month}>JAN</Text>
          <Text style={styles.month}>FEB</Text>
          <Text style={styles.month}>MAR</Text>
          <Text style={styles.month}>APR</Text>
          <Text style={styles.month}>MAY</Text>
          <Text style={styles.month}>JUN</Text>
          <Text style={styles.month}>JUL</Text>
          <Text style={styles.month}>AUG</Text>
          <Text style={styles.month}>SEP</Text>
          <Text style={styles.month}>OCT</Text>
          <Text style={styles.month}>NOV</Text>
          <Text style={styles.month}>DEC</Text>
        </View>
        {guia ?
          <View style={styles.calendarCont}>
            {months.map((month, index) => {
              const isMonthActive =
                (guia.inicio_periodo <= guia.fin_periodo &&
                  index + 1 >= guia.inicio_periodo && index + 1 <= guia.fin_periodo) ||
                (guia.inicio_periodo > guia.fin_periodo &&
                  (index + 1 >= guia.inicio_periodo || index + 1 <= guia.fin_periodo));
              
              return (
                <View style={[styles.monthLine, isMonthActive ? styles.activeMonth : null]} key={month}>
                  <Text> </Text>
                </View>
              );
            })}
          </View>
          : <View></View>
        }
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const getStyles = (modoOscuroActivado) => {
  return {
  container: {
    flex: 1,
    backgroundColor: modoOscuroActivado ? darkModeBackground : lightModeBackground,
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: modoOscuroActivado ? darkModeText : lightModeText,
    marginBottom: 10,
  },
  gCalendarFont: {
    fontSize: 18,
    fontWeight: "bold",
    color: modoOscuroActivado ? darkModeText : lightModeText,
    marginBottom: 10,
  },
  roundedContainer: {
    backgroundColor: modoOscuroActivado ? lightModeBackground : 'lightgray',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: modoOscuroActivado ? darkModeText : lightModeText,
  },
  calendarCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  month: {
    flex: 1,
    textAlign: 'center',
    color: modoOscuroActivado ? darkModeText : lightModeText,
  },
  monthLine: {
    flex: 1,
    textAlign: 'center',
  },
  activeMonth: {
    backgroundColor: modoOscuroActivado ? '#00954B' : 'green',
  },
  
}};

export default Infoplanta;
