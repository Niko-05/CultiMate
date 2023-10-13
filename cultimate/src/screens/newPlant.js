import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import ListaPlanta from '../components/ListaPlanta';
import ButtonTabs from '../navigation/ventanas';
import Infoplanta from './infoplanta';


const NewPlant = ({navigation}) => {
  const data = [
    { nombre: 'Juan'},
    { nombre: 'María'},
    { nombre: 'Pedro'},

  ]

  return (
    
   
   
    <ListaPlanta data = {data} navigation = {navigation}/>
    
  
    );
}

export default NewPlant;