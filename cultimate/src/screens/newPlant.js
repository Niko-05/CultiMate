import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ListaPlanta from '../components/ListaPlanta';
import { createStackNavigator } from '@react-navigation/stack';
import infoplanta from './infoplanta';
import { useNavigation } from '@react-navigation/native';
import ButtonTabs from '../navigation/stacknavigator';



const NewPlant = () => {
  const data = [
    { nombre: 'Juan' },
    { nombre: 'María' },
    { nombre: 'Pedro' },
  ]
 const navigation =ButtonTabs();

  return (
    
   
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
   
    <ListaPlanta data = {data} navigation = {navigation}/>
  
    </View>
    );
}

export default NewPlant;