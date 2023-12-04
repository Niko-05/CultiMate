import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from 'react';
import { useModoOscuro } from "../context/ModoOscuroContext";
import { lightModeBackground, darkModeBackground, lightModeText, darkModeText } from "../utils/colores";
import { obtenerIdioma } from '../utils/storage';
import esTranslations from "../language/es.json";
import enTranslations from "../language/en.json";

const PreguntasFrecuentes = () => {
    const { modoOscuroActivado } = useModoOscuro();
    const [selectedLanguage, setSelectedLanguage] = useState('es');
    const [translations, setTranslations] = useState(esTranslations);
    const styles = getStyles(modoOscuroActivado);

    const cargarIdioma = async () => {
        const idiomaGuardado = await obtenerIdioma();
        setSelectedLanguage(idiomaGuardado);
    };

    const cargarTraducciones = async () => {
        try {
            let translationsByLanguage;
            switch (selectedLanguage) {
                case 'es':
                    translationsByLanguage = esTranslations;
                    break;
                case 'en':
                    translationsByLanguage = enTranslations;
                    break;
                default:
                    translationsByLanguage = esTranslations; // Por defecto, usa las traducciones en español
            }
            setTranslations(translationsByLanguage);
        } catch (error) {
            console.error('Error cargando traducciones', error);
        }
    };

    useEffect(() => {
        cargarTraducciones();
        cargarIdioma();
    }, [selectedLanguage]);

    const preguntasKeys = Object.keys(translations.preguntasFrecScreen);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Preguntas frecuentes</Text>
            {preguntasKeys.map((preguntaKey, index) => (
                <View key={index} style={styles.preguntaContainer}>
                    <Text style={styles.pregunta}>{translations.preguntasFrecScreen[preguntaKey].pregunta}</Text>
                    <Text style={styles.respuesta}>{translations.preguntasFrecScreen[preguntaKey].respuesta}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const getStyles = (modoOscuroActivado) => {
    return {
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: modoOscuroActivado ? darkModeBackground : lightModeBackground,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            color: modoOscuroActivado ? darkModeText : lightModeText,
            marginBottom: 20,
        },
        preguntaContainer: {
            marginBottom: 20,
        },
        pregunta: {
            fontSize: 18,
            fontWeight: "bold",
            color: modoOscuroActivado ? darkModeText : lightModeText,
            marginBottom: 10,
        },
        respuesta: {
            fontSize: 16,
            color: modoOscuroActivado ? darkModeText : lightModeText,
        },
    };
};

export default PreguntasFrecuentes;
