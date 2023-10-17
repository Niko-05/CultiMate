import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import ListaPlanta from '../components/ListaPlanta';
import ButtonTabs from '../navigation/ventanas';
import Infoplanta from './infoplanta';


const NewPlant = ({navigation}) => {
  const data = [
    { id: 2, nombre: 'Fresas', Image: require('../../assets/Fresa.png') , Descripcion: 'Las fresas son una planta frutal deliciosa', DificultadPlantado: 2, Tipo: 'Exterior', EstacionRecomendada: 'Primavera', FuncionalidadPlanta: 'Postre/Reposteria' , IniFechaPlantado: '2023-04-01', FinFechaPlantado: '2023-06-30', PeriodicidadRegado: 2, CondLuminosas: 'Luz directa', CondTemperatura: 'Moderada', TamMaceta: 12, CategoriaID: 1 },
    { id: 3, nombre: 'Mora', Image: require('../../assets/mora.png'), Descripcion: 'Las moras son frutas deliciosas y versátiles', DificultadPlantado: 3, Tipo: 'Exterior', EstacionRecomendada: 'Verano', FuncionalidadPlanta: 'Postre/Reposteria' , IniFechaPlantado: '2023-06-01', FinFechaPlantado: '2023-09-30', PeriodicidadRegado: 2, CondLuminosas: 'Luz directa', CondTemperatura: 'Moderada', TamMaceta: 15, CategoriaID: 1 },
    { id: 4, nombre: 'Limonero', Image: require('../../assets/limon.png'), Descripcion: 'El limonero es un árbol frutal conocido por sus limones', DificultadPlantado: 2, Tipo: 'Exterior', EstacionRecomendada: 'Primavera', FuncionalidadPlanta: 'Producción de limones' , IniFechaPlantado: '2023-03-01', FinFechaPlantado: '2023-10-31', PeriodicidadRegado: 3, CondLuminosas: 'Luz directa', CondTemperatura: 'Cálida', TamMaceta: 20, CategoriaID: 1 },
  ]

  return (
    
   
    
      <ListaPlanta data = {data} navigation = {navigation}/>
    
    );
}

export default NewPlant;