// ModoOscuroContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { guardarModoOscuro, obtenerModoOscuro } from '../utils/storage';

const ModoOscuroContext = createContext();

export const ModoOscuroProvider = ({ children }) => {
  const [modoOscuroActivado, setModoOscuroActivado] = useState(false);

  useEffect(() => {
    obtenerModoOscuro().then((modoOscuroGuardado) => {
      setModoOscuroActivado(modoOscuroGuardado);
    });
  }, []);

  const toggleModoOscuro = (valor) => {
    setModoOscuroActivado(valor);
    guardarModoOscuro(valor);
  };

  return (
    <ModoOscuroContext.Provider value={{ modoOscuroActivado, toggleModoOscuro }}>
      {children}
    </ModoOscuroContext.Provider>
  );
};

export const useModoOscuro = () => {
  const context = useContext(ModoOscuroContext);
  if (!context) {
    throw new Error('useModoOscuro debe ser utilizado dentro de un ModoOscuroProvider');
  }
  return context;
};
