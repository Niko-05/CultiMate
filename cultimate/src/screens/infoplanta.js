import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Infoplanta = () => {
  const route = useRoute();
  const { id, data } = route.params;
  const item = data.find(item => item.id === id);

  if (!item) {
    return (
      <View>
        <Text>Elemento no encontrado</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Nombre: {item.nombre}</Text>
      <Text>Descripción: {item.Descripcion}</Text>
    </View>
  );
}

export default Infoplanta;
