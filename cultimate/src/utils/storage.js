import AsyncStorage from '@react-native-async-storage/async-storage';

export const guardarModoOscuro = async (modoOscuro) => {
  try {
    await AsyncStorage.setItem('modoOscuro', JSON.stringify(modoOscuro));
  } catch (error) {
    console.error('Error al guardar el modo oscuro:', error);
  }
};

export const obtenerModoOscuro = async () => {
  try {
    const modoOscuroString = await AsyncStorage.getItem('modoOscuro');
    return modoOscuroString ? JSON.parse(modoOscuroString) : false;
  } catch (error) {
    console.error('Error al obtener el modo oscuro:', error);
    return false;
  }
};
