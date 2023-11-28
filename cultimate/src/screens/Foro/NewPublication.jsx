import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import config from '../../../config';

const NewPublication = ({ route }) => {
  const { foroId } = route.params;
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleImageUpload = () => {
    // Establecer un URL ficticio para simular la carga de una imagen
    const fakeImageUrl = 'https://example.com/fake-image.jpg';
    setImage(fakeImageUrl);
  };

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        foroId: foroId,
        //usuarioId: usuarioId,
        titulo: title,
        cuerpo: description,
        imagen: image, // Utilizar el URL ficticio o proporcionar la lógica real aquí
      };

      const response = await fetch(`${config.API}/publicacion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
        
      if (response.ok) {
        console.log('Publicación creada con éxito');
        // Resto del código después de la creación exitosa...
      } else {
        console.error('Error al crear la publicación', response.status);
        // Resto del código después de un error...
      }
    } catch (error) {
      console.error('Error al enviar la publicación', error);
      // Resto del código después de un error...
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImageUpload}>
        <Text style={styles.input}>Seleccionar imagen (ficticia)</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TextInput
        value={title}
        onChangeText={handleTitleChange}
        placeholder="Title"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={handleDescriptionChange}
        placeholder="Description"
        style={styles.input}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // Puedes cambiar esto según tu estilo
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#000', // Puedes cambiar esto según tu estilo
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    color: '#000', // Puedes cambiar esto según tu estilo
  },
  button: {
    backgroundColor: '#007BFF', // Puedes cambiar esto según tu estilo
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff', // Puedes cambiar esto según tu estilo
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewPublication;