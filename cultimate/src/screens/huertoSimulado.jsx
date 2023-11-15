import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
//import ;

const gridData = [
    { centerImage: require('../../assets/limon.png'), topRightImage: require('../../assets/gotas_agua.png'), opacity: 1 },
    { centerImage: require('../../assets/Fresa.png'), topRightImage: require('../../assets/gotas_agua.png'), opacity: 0 },
    { centerImage: require('../../assets/limon.png'), topRightImage: require('../../assets/gotas_agua.png'), opacity: 1 },
    { centerImage: require('../../assets/Fresa.png'), topRightImage: require('../../assets/gotas_agua.png'), opacity: 0 },
]

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

const HuertoSimulado = () => {
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
                {data ? (
                  <TouchableOpacity style={styles.square}>
                    <Image source={data.centerImage} style={styles.centeredImage} />
                    <Image source={data.topRightImage} style={[styles.topRightImage, { opacity: data.opacity }]} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.square}>
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