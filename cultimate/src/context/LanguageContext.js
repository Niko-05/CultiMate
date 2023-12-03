import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { guardarIdiomaAsyncStorage, obtenerIdiomaAsyncStorage } from '../utils/storage';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  useEffect(() => {
    const cargarIdioma = async () => {
      try {
        const idiomaGuardado = await AsyncStorage.getItem('idioma');
        setSelectedLanguage(idiomaGuardado || 'es');
      } catch (error) {
        console.error('Error al cargar el idioma desde AsyncStorage:', error);
      }
    };

    cargarIdioma();
  }, []);

  const changeLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('idioma', language);
      setSelectedLanguage(language);
    } catch (error) {
      console.error('Error al guardar el idioma en AsyncStorage:', error);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ selectedLanguage, changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
