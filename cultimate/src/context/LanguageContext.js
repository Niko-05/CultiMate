import React, { createContext, useState, useEffect, useContext } from 'react';
import { guardarIdioma, obtenerIdioma} from '../utils/storage';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('es');

    useEffect(() => {
        obtenerIdioma().then((idiomaGuardado) => {
        setSelectedLanguage(idiomaGuardado);
        });
    }, []);

    const toggleLanguage = (valor) => {

        setSelectedLanguage(valor);
        guardarIdioma(valor);
    };


  return (
    <LanguageContext.Provider value={{ selectedLanguage, toggleLanguage }}>
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
