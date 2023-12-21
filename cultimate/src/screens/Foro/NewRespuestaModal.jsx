import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import config from "../../../config";
import { getUserInfo } from "../../api/user";

const NewRespuestaModal = ({ publicacionId, isVisible, onClose, onRespuestaCreated}) => {
  const [contenido, setContenido] = useState("");

  const handleSubmit = async () => {
    try {
      const userInfoResponse = await getUserInfo();
      console.log("userInfoResponse", userInfoResponse);
      const requestData = {
        publicacionId: publicacionId, 
        cuerpo: contenido,
        userId: userInfoResponse.id,
        autor: userInfoResponse.username, 
        ProfilePictureId: userInfoResponse.profilePictureId,
      };

      const response = await fetch(`${config.API}/publicacion/crearRespuesta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log("Respuesta creada con éxito");
        // Resto del código después de la creación exitosa...
        onClose(); // Cierra el modal después de crear la respuesta
        onRespuestaCreated(); // Puedes pasar cualquier dato necesario para la actualización del componente padre
        Alert.alert("Éxito", "La respuesta se creó correctamente");
      } else {
        console.error("Error al crear la respuesta", response.status);
        // Resto del código después de un error...
        Alert.alert("Error", "Hubo un problema al crear la respuesta");
      }
    } catch (error) {
      console.error("Error al enviar la respuesta", error);
      // Resto del código después de un error...
      Alert.alert("Error", "Hubo un problema al enviar la respuesta");
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Nueva respuesta</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Contenido</Text>
          <TextInput
            style={styles.contentInput}
            onChangeText={setContenido}
            value={contenido}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Crear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    maxHeight: 200,
  },
  button: {
    backgroundColor: "#09873D",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#c51445",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default NewRespuestaModal;