import React, { useState, useEffect, useRef} from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Animated} from "react-native";
import Collapsible from 'react-native-collapsible';
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import config from '../../config';
import { useModoOscuro } from '../context/ModoOscuroContext';

const Receta = ({navigation}) => {
  const route = useRoute();
  const { id, data } = route.params;
  const item = data.find((item) => item.id === id);
  const { modoOscuroActivado }= useModoOscuro();
  const styles = getStyles(modoOscuroActivado);
  const [imageSize, setImageSize] = useState(200);

  const renderDifficulty = (difficulty) => {
    let circleText = '';
    let footerText = '';

    switch (difficulty) {
      case 1:
        circleText = 'A';
        footerText = 'FÁCIL';
        break;
      case 2:
        circleText = 'B';
        footerText = 'MEDIO';
        break;
      case 3:
        circleText = 'C';
        footerText = 'DIFÍCIL';
        break;
      default:
        circleText = '?';
        footerText = 'DESCONOCIDO';
    }

    return (
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={styles.circleTop}>DIFICULTAD</Text>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{circleText}</Text>
        </View>
        <Text style={styles.circleBottom}>{footerText}</Text>
        <Text style={styles.regarCada}> </Text>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.backgroundLayer}>
        <Text style={styles.title}>{item.nombre}</Text>
        <Text style={styles.subtitle}>{item.plantaRelacionada} </Text>
        <Image source={{uri: item.imagen}} style={[styles.plantImage, { width: imageSize, height: imageSize }]} />
      </View>
      <ScrollView
        style={styles.scrollView}
      >
        <View style={styles.floatingButton}>
        </View>
        <View style={styles.infoLayer}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text style={{
              marginLeft: 5,
              color: '#939393',
              fontSize: 14,
            }}>{item.estacion_recomendada}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
            <View style={{
              alignItems: 'center',
              marginTop: 20,

            }}>
              <Text style={styles.circleTop}>DURACIÓN</Text>
              <View style={styles.circle}>
              <Text style={styles.circleText}>{item.tiempoTotal}'</Text>
              </View>
              <Text style={styles.regarCada}></Text>
              <Text style={styles.circleBottom}></Text>
            </View>

            <View style={styles.divider} />
            {renderDifficulty(item.dificultad)}

          </View>

          <View style={styles.row}></View>


          <Text style={{fontSize: 7}}></Text>
          <Text style={styles.acordion}>Descripción</Text>
          <Text style={{fontSize: 3}}></Text>
          
          <Text style = {styles.textodespl}>{item.descripcion}</Text>
          <Text style={{fontSize: 7}}></Text>


          <View style={styles.row}></View>


          <Text style={{fontSize: 7}}></Text>
          <Text style={styles.acordion}>Ingredientes</Text>
          <Text style={{fontSize: 3}}></Text>

          <Text style = {styles.textodespl}>{item.ingredientes}</Text>
          <Text style={{fontSize: 7}}></Text>


          <View style={styles.row}></View>
          

          <Text style={{fontSize: 7}}></Text>
          <Text style={styles.acordion}>Pasos</Text>
          <Text style={{fontSize: 3}}></Text>

          <Text style = {styles.textodespl}>{item.pasos}</Text>
          <Text style={{fontSize: 7}}></Text>


          <View style={styles.row}></View>

        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = (modoOscuroActivado) => {
  return {
  container: {
    flex: 1,
    backgroundColor: '#EDE7D9'
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
    marginTop:70,
    fontFamily: "Inter",
  },
  subtitle: {
    marginTop: 0,
    fontSize: 14,
    fontWeight: "bold",
    color: 'grey',
    marginBottom: 10,
    fontFamily: "Inter",
  },
  roundedContainer: {
    backgroundColor: 'lightgray',
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
  },
  scrollContainer: {
    flex: 1,
  },
  backgroundLayer: {
    backgroundColor: '#EDE7D9', // O el color de fondo verde que desees
    width: '100%',
    height: '100%',
    alignItems: 'center',
    position: 'absolute', // Posicionamiento absoluto para que quede fijo al desplazar
    top: 0, // Inicio en la parte superior de la pantalla
  },
  plantImage: {
    marginTop: 10,
    width: 180, // Ajusta al tamaño que necesites
    height: 180, // Ajusta al tamaño que necesites
  },
  infoLayer: {
    backgroundColor: 'white',
    borderRadius: 20, // Ajusta el borde como desees
    padding: 20,
    paddingTop: 20, // Espacio en la parte superior para evitar que el contenido se superponga con la imagen
    marginTop: 370,
    zIndex: 0,
  },
  circle: {
    width: 100, // Ajusta el ancho según sea necesario
    height: 100, // Ajusta la altura según sea necesario
    borderRadius: 50, // La mitad del ancho y la altura para hacerlo un círculo perfecto
    borderWidth: 2, // Ajusta el ancho del borde según sea necesario
    borderColor: 'gray', // Ajusta el color del borde según sea necesario
    justifyContent: 'center', // Centra la imagen en el círculo
    alignItems: 'center', // Centra la imagen en el círculo
    marginVertical: 10,
    fontFamily: "Inter",
  },
  circleTop: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  circleBottom: {
    fontSize: 16,
    fontWeight: '900',
    fontFamily: "Inter",
  },
  regarCada: {
    fontSize: 12,
    color: '#939393',
    fontWeight: "bold",
    marginBottom: -4,
    fontFamily: "Inter",
  },
  divider: {
    height: '80%',
    width: 1,
    backgroundColor: '#939393',
    marginHorizontal: 50,
  },
  circleText: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: "Inter",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  desplegables: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    fontFamily: "Inter",
  },
  acordion: {
    fontSize: 18,
    fontWeight: `bold`,
    fontFamily: "Inter",
  },
  content: {
    padding: 20,
  },
  addButton: {
    width: 69, // Tamaño del botón
    height: 69, // Tamaño del botón
    borderRadius: 39, // Hace el botón circular
    backgroundColor: '#2EC26A', // Color de fondo del botón
    justifyContent: 'center', // Centra el icono en el botón
    alignItems: 'center', // Centra el icono en el botón
    elevation: 8, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // Sombra para iOS
    shadowOpacity: 0.25, // Sombra para iOS
    shadowRadius: 3.84, // Sombra para iOS
  },
  floatingButton: {
    position: 'absolute',
    right: 30, // Ajusta según la necesidad de tu diseño
    marginTop: 333,
    zIndex: 10,
  },
  addButtonText: {
    fontSize: 60,
    color: 'white',
    marginTop: -8,
  },
  textodespl:{
    fontFamily: "Inter",
    fontSize:14.5,
  }
}};

export default Receta;
