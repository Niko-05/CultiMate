import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import config from '../../config';
import { NavigationContainerRefContext } from '@react-navigation/native';


const gridData = [
  { id: 1, centerImage: require('../../assets/tomate.png'), topRightImage: require('../../assets/gotas_agua.png'), opacity: 1, nombre: 'Tomate', FechaPlantado: '2023-11-01', PeriodicidadRegado: 2, CondTemperatura: '25°C', Paso: 'Plantar', Detalles: 'Details', Estado: 'Healthy' },
  { id: 2, centerImage: require('../../assets/Fresa.png'), topRightImage: require('../../assets/gotas_agua.png'), opacity: 0, nombre: 'Fresa', FechaPlantado: '2023-10-15', PeriodicidadRegado: 3, CondTemperatura: '22°C', Paso: 'Regar', Detalles: 'Details', Estado: 'Healthy'},
  { id: 3, centerImage: require('../../assets/tomate.png'), topRightImage: require('../../assets/gotas_agua.png'), opacity: 1, nombre: 'Tomate', FechaPlantado: '2023-11-01', PeriodicidadRegado: 2, CondTemperatura: '25°C', Paso: 'Cosechar', Detalles: 'Details', Estado: 'Healthy'},
  { id: 4, centerImage: require('../../assets/Fresa.png'), topRightImage: require('../../assets/gotas_agua.png'), opacity: 0, nombre: 'Fresa', FechaPlantado: '2023-10-15', PeriodicidadRegado: 3, CondTemperatura: '22°C', Paso: 'Cosechar', Detalles: 'Details', Estado: 'Healthy' },
]

//const gridData2 = useRef([]);

const defaultSquareData = {
  centerImage: require('../../assets/mas.png'),
  topRightImage: require('../../assets/gotas_agua.png'),
  opacity: 0,
};

const createDefaultSquares = (count) => {
  const defaultSquares = [];
  for (let i = 0; i < count; i++) {
    defaultSquares.push({ ...defaultSquareData });
  }
  return defaultSquares;
};
  
const fillDataToCompleteRow = (data) => {
    const dataCount = data.length;
    const squaresToAdd = 3 - (dataCount % 3);
    if (squaresToAdd > 0 && squaresToAdd < 3) {
      data.push(...createDefaultSquares(squaresToAdd));
    }
    return data;
};

const setGridData = async () => {
    try {
        const api_call = await fetch(`${config.API}/planta/plantadas?userId=${userId}`);
        const result = await api_call.json();
        gridData2.current = result;
        console.log(result);
    } catch(e) {
        Alert.alert('Problema de red', 'No se ha podido mostrar el listado de plantas debido a un problema de red.');
      }
}

const HuertoSimulado = ({navigation}) => {
    //setGridData();
    const filledGridData = fillDataToCompleteRow([...gridData]);
    const rowsToAdd = 3 - Math.ceil(filledGridData.length / 3);

    for (let i = 0; i < rowsToAdd; i++) {
      filledGridData.push(...createDefaultSquares(3));
    }

    return (
        <View style={styles.container}>
          <View style={styles.grid}>
            {filledGridData.map((data, index) => (
              <View key={index} style={styles.row}>
                {data && data.id !== undefined ? (
                  <TouchableOpacity style={styles.square} onPress={() =>  navigation.navigate("GuiaPlantado", { id: 2, data: data })}>
                    <Image source={data.centerImage} style={styles.centeredImage} />
                    <Image source={data.topRightImage} style={[styles.topRightImage, { opacity: data.opacity }]} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.square} onPress={() =>  navigation.navigate("RegisterScreen")}>
                    <Image source={defaultSquareData.centerImage} style={styles.centeredImage} />
                    <Image source={defaultSquareData.topRightImage} style={[styles.topRightImage, { opacity: defaultSquareData.opacity }]} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>
      );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row', // Create squares in a row
    flexWrap: 'wrap', // Allow them to wrap to the next row
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row', // Each row is a row of squares
    marginBottom: 5, // Adjust the margin between rows
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 15,
    margin: 5,
  },
  centeredImage: {
    width: 50, // Adjust the size as needed
    height: 50, // Adjust the size as needed
  },
  topRightImage: {
    position: 'absolute',
    top: 5, // Adjust the top position
    right: 5, // Adjust the right position
    width: 20, // Adjust the size as needed
    height: 20, // Adjust the size as needed
  },
});
    

export default HuertoSimulado