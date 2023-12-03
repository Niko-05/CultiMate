// ConfigScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useModoOscuro } from '../context/ModoOscuroContext';
import { obtenerModoOscuro, guardarModoOscuro, guardarIdioma, obtenerIdioma } from '../utils/storage';
import enTranslations from '../language/en.json';
import esTranslations from '../language/es.json';

import { 
  lightModeBackground, 
  darkModeBackground, 
  lightModeText, 
  darkModeText, 
  lightbuttonBackground, 
  darkbuttonBackground, 
  lightbuttonText, 
  darkbuttonText 
} from "../utils/colores";

const ConfigScreen = ({ navigation }) => {
  const { modoOscuroActivado, toggleModoOscuro } = useModoOscuro();
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [translations, setTranslations] = useState(esTranslations);
  const styles = getStyles(modoOscuroActivado);

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    guardarIdioma(language);
    // Actualiza las traducciones al cambiar el idioma
    switch (language) {
      case 'es':
        setTranslations(esTranslations);
        break;
      case 'en':
        setTranslations(enTranslations);
        break;
      default:
        setTranslations(esTranslations);
        break;
    }
    console.log('Cambiando idioma a:', language);
    //console.log('Traducciones actualizadas:', translations);
  };

  const cargarIdioma = async () => {
    const idiomaGuardado = await obtenerIdioma();
    changeLanguage(idiomaGuardado);
  };

  const cargarModoOscuro = async () => {
    const modoOscuroGuardado = await obtenerModoOscuro();
    toggleModoOscuro(modoOscuroGuardado);
  };

  useEffect(() => {
    cargarModoOscuro();
    cargarIdioma();
  }, []);

  const handleProfileSettings = () => {
    navigation.navigate('AccountSettings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.languagePickerContainer}>
        <Text style={styles.text}>{translations.configuracionScreen.language}</Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => changeLanguage(itemValue)}
        >
          <Picker.Item label="Español" value="es" />
          <Picker.Item label="English" value="en" />
        </Picker>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.text}>{translations.configuracionScreen.notifications}</Text>
        <Switch value={true} onValueChange={() => console.log('Toggle Notifications')} />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.text}>{translations.configuracionScreen.sounds}</Text>
        <Switch value={true} onValueChange={() => console.log('Toggle Sounds')} />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.text}>{translations.configuracionScreen.darkMode}</Text>
        <Switch
          value={modoOscuroActivado}
          onValueChange={(valor) => {
            toggleModoOscuro(valor);
            guardarModoOscuro(valor);
          }}
        />
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleProfileSettings}
        >
          <Text style={styles.buttonText}>{translations.configuracionScreen.accountSettings}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (modoOscuroActivado) => {
  return {
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      backgroundColor: modoOscuroActivado ? darkModeBackground : lightModeBackground,
    },
    languagePickerContainer: {
      width: 200,
      marginTop: 20,
    },
    buttonText: {
      color: modoOscuroActivado ? darkbuttonText : lightbuttonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    text: {
      fontWeight: 'bold',
      fontSize: 16,
      color: modoOscuroActivado ? darkModeText : lightModeText,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    button: {
      backgroundColor: modoOscuroActivado ? darkbuttonBackground : lightbuttonBackground,
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
    },
  };
};

export default ConfigScreen;
