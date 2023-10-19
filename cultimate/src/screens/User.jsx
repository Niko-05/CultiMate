import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const User = () => {
  const [userPhoto, setUserPhoto] = useState(); // Reemplaza 'URL_DE_LA_FOTO' con la URL real de la foto del usuario.

  const handleChangePhoto = () => {
    // Implementa la lógica para cambiar la foto del usuario aquí.
    
  };

  return (
    <View style={styles.container}>
      {/* Foto del usuario y botón para cambiarla */}
      <View style={styles.header}>
        <Image
          style={styles.userPhoto}
          source={require("../../assets/termometro.png")}
        />
        <TouchableOpacity onPress={handleChangePhoto} style={styles.changePhotoButton}>
          <Text>Cambiar Foto</Text>
        </TouchableOpacity>
      </View>

      {/* Nombre de usuario */}
      <Text style={styles.username}>Nombre de Usuario</Text>

      {/* Título de Plantas Favoritas */}
      <Text style={styles.favoritesTitle}>Plantas Favoritas</Text>
      {/* Implementa la lógica para mostrar la lista de plantas favoritas aquí. */}
    </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '100%',
    },
    userPhoto: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    changePhotoButton: {
      marginLeft: 10,
      backgroundColor: '#DDDDDD',
      padding: 5,
      borderRadius: 5,
    },
    username: {
      marginTop: 10,
      fontSize: 18,
    },
    favoritesTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
    },
  });
  
export default User;