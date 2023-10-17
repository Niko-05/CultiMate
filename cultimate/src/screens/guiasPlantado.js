import React from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity, Button, StyleSheet, Image } from 'react-native';
import ListaMaceta from '../components/ListaMaceta';

const GuiasPlantado = ({navigation}) => {
    const data = [
        { id: 2, nombre: 'Fresas', Image: require('../../assets/Fresa.png'), FechaPlantado: '25/10/2023', PeriodicidadRegado: 3, CondTemperatura: '20ºC - 26ºC', TamMaceta: 'Pequeña', Paso: 2, Detalles: 'Sembrar Semillas', Estado: 'Semillas Sembradas'},
        { id: 2, nombre: 'Fresas', Image: require('../../assets/Fresa.png'), FechaPlantado: '25/10/2023', PeriodicidadRegado: 3, CondTemperatura: '20ºC - 26ºC', TamMaceta: 'Pequeña', Paso: 4, Detalles: 'Cuidado regular de las plantas', Estado: 'Fresas en Crecimiento'},
        { id: 2, nombre: 'Fresas', Image: require('../../assets/Fresa.png'), FechaPlantado: '25/10/2023', PeriodicidadRegado: 3, CondTemperatura: '20ºC - 26ºC', TamMaceta: 'Pequeña', Paso: 6, Detalles: 'Cosechar fresas maduras', Estado: 'Fresas Cosechadas'},
        
    ]
    return (
        <ListaMaceta data = {data} navigation={navigation} />
    )
}

export default GuiasPlantado