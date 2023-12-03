import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_IDIOMA = 'idioma';
const STORAGE_KEY_MODOOSCURO = 'modoOscuro';

export const guardarModoOscuro = async (modoOscuro) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_MODOOSCURO, JSON.stringify(modoOscuro));
  } catch (error) {
    console.error('Error al guardar el modo oscuro:', error);
  }
};

export const obtenerModoOscuro = async () => {
  try {
    const modoOscuroString = await AsyncStorage.getItem(STORAGE_KEY_MODOOSCURO);
    return modoOscuroString ? JSON.parse(modoOscuroString) : false;
  } catch (error) {
    console.error('Error al obtener el modo oscuro:', error);
    return false;
  }
};

export const guardarIdioma = async (valor) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_IDIOMA, JSON.stringify(valor));
    console.log('Idioma guardado en AsyncStorage:', valor);
  } catch (error) {
    console.error('Error al guardar en AsyncStorage:', error);
  }
};


export const obtenerIdioma = async () => {
  try {
    const valorGuardado = await AsyncStorage.getItem(STORAGE_KEY_IDIOMA);
    return valorGuardado !== null ? JSON.parse(valorGuardado) : 'es';
  } catch (error) {
    console.error('Error al obtener de AsyncStorage:', error);
    return 'es';
  }
};
