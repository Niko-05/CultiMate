import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import config from "../../../config";
import { getUserInfo } from "../../api/user";

const NewPublicationModal = ({ route, isVisible, onClose }) => {
  const { foroId, nombreplanta } = route.params;
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [tipo, setTipo] = useState("Pregunta");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!titulo || !contenido) {
      Alert.alert("Campos Vacíos", "Por favor, completa todos los campos.");
      return;
    }

    try {
      const userInfoResponse = await getUserInfo();
      const requestData = {
        foroId: foroId,
        titulo: titulo,
        cuerpo: contenido,
        userId: userInfoResponse.id,
        onClose: onClose,
      };

      const response = await fetch(
        `${config.API}/publicacion/crearPublicacion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        console.log("Publicación creada con éxito");
        // Resto del código después de la creación exitosa...
        Alert.alert("Éxito", "La publicación se creó correctamente", [
          { text: "OK", onPress: onClose }, // Cerrar el modal después de crear la publicación
        ]);
      } else {
        console.error("Error al crear la publicación", response.status);
        // Resto del código después de un error...
      }
    } catch (error) {
      console.error("Error al enviar la publicación", error);
      // Resto del código después de un error...
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose} // Cierra el modal cuando tocas fuera de él
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Nueva publicación</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTitulo}
            value={titulo}
          />
          <Text style={styles.label}>Contenido</Text>
          <TextInput
            style={styles.contentInput}
            onChangeText={setContenido}
            value={contenido}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Publicar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0, // Margen cero para ocupar toda la pantalla
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Fondo blanco semi-transparente
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#09873D",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#c51445", // Puedes cambiar a tu color deseado
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    maxHeight: 200,
  },
});

export default NewPublicationModal;
