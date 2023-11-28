// ListaPublicacionesForo.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const ListaPublicacionesForo = ({ foroId }) => {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    // Lógica para obtener las publicaciones del foro con ID 'foroId'
    // Puedes utilizar fetch u otra biblioteca para realizar la solicitud al backend

    // Ejemplo de cómo podrías obtener las publicaciones usando fetch
    fetch(`URL_DEL_BACKEND/publicaciones/foro/${foroId}`)
      .then(response => response.json())
      .then(data => {
        setPublicaciones(data);
      })
      .catch(error => console.error('Error al obtener las publicaciones', error));
  }, [foroId]);

  return (
    <View>
      <Text>Publicaciones del foro</Text>
      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.titulo}</Text>
            <Text>{item.cuerpo}</Text>
            {/* Otros elementos de la publicación, como la imagen, podrían mostrarse aquí */}
          </View>
        )}
      />
    </View>
  );
};

export default ListaPublicacionesForo;
