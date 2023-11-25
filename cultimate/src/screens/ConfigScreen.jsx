import React, { useState,useEffect } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Picker } from "@react-native-picker/picker";


const ConfigScreen = ({ navigation }) => {
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState('Español');
  const [notificacionesActivadas, setNotificacionesActivadas] = useState(true);
  const [modoOscuroActivado, setModoOscuroActivado] = useState(false);
  const [sonidoActivado, setSonidoActivado] = useState(true);

  const saveConfiguration = async () => {
    try {
      const config = {
        idiomaSeleccionado,
        notificacionesActivadas,
        sonidoActivado,
        modoOscuroActivado,
      };

      await AsyncStorage.setItem('config', JSON.stringify(config));
      console.log('Configuración guardada:', config);
    } catch (error) {
      console.error('Error al guardar la configuración:', error);
    }
  };

  const loadConfiguration = async () => {
    try {
      const configString = await AsyncStorage.getItem('config');
      if (configString) {
        const config = JSON.parse(configString);
        setIdiomaSeleccionado(config.idiomaSeleccionado);
        setNotificacionesActivadas(config.notificacionesActivadas);
        setSonidoActivado(config.sonidoActivado);
        setModoOscuroActivado(config.modoOscuroActivado);
      }
    } catch (error) {
      console.error('Error al cargar la configuración:', error);
    }
  };

  useEffect(() => {
    // Cargar la configuración al abrir la pantalla
    loadConfiguration();
  }, []);

  const handleProfileSettings = async () => {
    await saveConfiguration();
    navigation.navigate('Account settings');
  };

  return (
    <View style={[styles.container, modoOscuroActivado && styles.modoOscuro]}>
      <View style={styles.languageContainer}>
        <Text style={styles.languageText}>Language:</Text>
        <Picker
          selectedValue={idiomaSeleccionado}
          onValueChange={(valor) => setIdiomaSeleccionado(valor)}
        >
          <Picker.Item label="Español" value="Español" />
          <Picker.Item label="English" value="English" />
        </Picker>
      </View>

      <View style={styles.notificationRow}>
        <Text style={styles.boldText}>Notifications:</Text>
        <Switch
          value={notificacionesActivadas}
          onValueChange={() =>
            setNotificacionesActivadas(!notificacionesActivadas)
          }
        />
      </View>

      <View style={styles.notificationRow}>
        <Text style={styles.boldText}>Sonido:</Text>
        <Switch
          value={sonidoActivado}
          onValueChange={() =>
            setSonidoActivado(!sonidoActivado)
          }
        />
      </View>

      <View style={styles.notificationRow}>
        <Text style={styles.boldText}>Dark mode:</Text>
        <Switch
          value={modoOscuroActivado}
          onValueChange={() => setModoOscuroActivado(!modoOscuroActivado)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleProfileSettings()}
        >
          <Text style={styles.buttonText}>Account settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfigScreen;


const styles = {

  modoOscuro: {
    backgroundColor: modoOscuroActivado ? '#000' : '#fff',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  languageContainer: {
    width: 80,
    marginTop: 6,
  },
  languageText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginHorizontal: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4B5563', 
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
};
