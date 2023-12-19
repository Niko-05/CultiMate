import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import config from "../../../config";

const PublicationScreen = ({ route }) => {
  const { publicacionId, nombreplanta } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [respuestas, setRespuestas] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    const obtenerRespuestas = async () => {
      try {
        const response = await fetch(`${config.API}/publicacion/respuestas/${publicacionId}`);
        const data = await response.json();

        if (response.ok) {
          setRespuestas(data); // Actualizado para usar directamente el array de respuestas
          console.log('Respuestas:', data); // Muestra toda la respuesta
        } else {
          console.error('Error al obtener respuestas', response.status);
        }
      } catch (error) {
        console.error('Error al obtener respuestas', error);
      } finally {
        setRefreshing(false);
      }
    };

    obtenerRespuestas();
  }, [publicacionId]);

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <Text style={styles.foroTitle}>FORO {nombreplanta.toUpperCase()}</Text>
      <View style={styles.greenBackground}>
        <View style={styles.container2}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <View style={styles.publicacionContainer}>
              <Text style={styles.titulo}>Título</Text>
              <Text style={styles.cuerpo}>Cuerpo</Text>
            </View>
            {respuestas &&
              respuestas.map((respuesta) => (
                <View key={respuesta.id} style={styles.respuestaContainer}>
                  <View style={styles.respuestaHeader}>
                    <Text style={styles.respuestaUsuario}>Usuario #{respuesta.usuario_id}</Text>
                  </View>
                  <Text style={styles.respuestaTexto}>{respuesta.cuerpo}</Text>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

// Estilos existentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09873D',
  },
  header: {
    backgroundColor: '#09873D',
    padding: 16,
    height: 130,
    justifyContent: 'flex-end',
  },
  foroTitle: {
    color: "#FFF",
    fontFamily: "Integral CF",
    fontSize: 24,
    position: "absolute",
    top: 80,
    left: 30,
    lineHeight: 26,
  },
  container2: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
  },
  greenBackground: {
    backgroundColor: '#09873D',
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  publicacionContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cuerpo: {
    fontSize: 16,
  },
  respuestaContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff', // Color de fondo
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  respuestaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  respuestaUsuario: {
    fontSize: 14,
    color: '#3498db', // Color del usuario
    fontWeight: 'bold',
  },
  respuestaTexto: {
    fontSize: 16,
    color: '#333', // Color del texto
  },
});

export default PublicationScreen;
