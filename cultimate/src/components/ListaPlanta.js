import React from 'react';
import { View, Text, FlatList, TouchableOpacity,StyleSheet, Image } from 'react-native';
import Infoplanta from '../screens/infoplanta';




const ListaPlanta = ({ data, navigation}) => {
  const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => handleButtonPress()}>
      <View style = {styles.boton}>
        <View style = {styles.viewimage}>
          <Image source={require('../../assets/Fresa.png')}
          style={styles.imagen}/>
        </View>
        <View style = {styles.viewtexto}>
          <Text style = {styles.texto}> {item.nombre}</Text>
        </View>
      </View>
     </TouchableOpacity>    
      
      );

  const handleButtonPress = () => {
    navigation.navigate('Infoplanta');
    }
  

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
    
  );
}
const styles = StyleSheet.create({boton:{backgroundColor: 'lightgreen', 
                                    padding: '7%', 
                                    width: "96%",
                                    borderRadius: 15, 
                                    marginTop: '3%', 
                                    marginLeft: '2%',
                                    alignItems: 'center'},
                                  viewimage:{
                                    alignContent: 'center',
                                    justifyContent: 'center'},
                                  viewtexto:{
                                    justifyContent: 'center'
                                  },
                                  texto:{                      
                                    color: 'white', 
                                    marginLeft: '25%',
                                  },
                                  imagen:{
                                    width:10, // Ancho de la imagen
                                    height: 10, // Alto de la imagen
                                  }
                                   })
export default ListaPlanta;
  