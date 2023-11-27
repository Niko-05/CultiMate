import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SecureStore } from 'react-native';
import { getUserInfo } from '../api/user';
import config from '../../config';
import { CommonActions } from "@react-navigation/native";
const CrearAgrupaciones = ({ route, navigation }) => {
  const [nombreAgrupacion, setNombreAgrupacion] = useState('');
  const handleGuardarAgrupacion = async ()  => {
    try{
        const user = route.params
        const requestBody = {
            uid: user.id,
            nombre: nombreAgrupacion
          };
  
        const api_call2 = await fetch(`${config.API}/agrupaciones/AddAgrupaciones`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
        const result = await api_call2.json();
        console.log(result);
        console.log('Agrupación guardada:', nombreAgrupacion);
        navigation.dispatch(CommonActions.goBack());
      if (!api_call2.ok) {
        // Handle non-OK response status
        Alert.alert(
          "API error",
          `Failed to fetch user data. Status: ${api_call2.status}`
        );
      }
    
     
    } catch (e) {
      console.error(e);
      Alert.alert("Network error");
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nueva Agrupación</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la agrupación"
        onChangeText={(text) => setNombreAgrupacion(text)}
        value={nombreAgrupacion}
      />
      <Button title="Guardar" onPress={handleGuardarAgrupacion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
});

export default CrearAgrupaciones;