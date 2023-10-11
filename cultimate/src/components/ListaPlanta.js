import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button,StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Infoplanta from '../screens/infoplanta';




const ListaPlanta = ({ data, navigation}) => {
  const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => handleButtonPress()}>
      <View style = {styles.boton}>
      <Text style = {styles.texto}> {item.nombre}</Text>
      </View>
     </TouchableOpacity>    
      
      );

  const handleButtonPress = () => {
    navigation.navigate('GrowingCalendar');
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
                                    padding: 10, 
                                    width: 350,
                                    borderRadius: 15, 
                                    marginTop: 10 },
                                   texto:{                      
                                 color: 'white' }
                                   })
export default ListaPlanta;
  