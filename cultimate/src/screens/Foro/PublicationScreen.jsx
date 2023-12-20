import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  
} from "react-native";
import config from "../../../config";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NewRespuestaModal from './NewRespuestaModal';


const PublicationScreen = ({ route }) => {
  const { publicacionId, nombreplanta } = route.params;
  const [publicacionid, setPublicacionid] = useState(publicacionId);
  const [refreshing, setRefreshing] = useState(false);
  const [UserInfo, setUserInfo] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [username, setUsername] = useState("");
  const [isRespuestaModalVisible, setIsRespuestaModalVisible] = useState(false);

  const openRespuestaModal = () => {
    setIsRespuestaModalVisible(true);
  };

  const closeRespuestaModal = () => {
    setIsRespuestaModalVisible(false);
    obtenerRespuestas(); // Actualiza las respuestas después de cerrar el modal
  };

  const onRefresh = useCallback(() => {
    obtenerRespuestas();
  }, [publicacionid]);

  const obtenerRespuestas = async () => {
    try {
      const response = await fetch(`${config.API}/publicacion/respuestas/${publicacionid}`);
      const data = await response.json();

      if (response.ok) {
        setRespuestas(data);
        console.log('Respuestas:', data);
      } else {
        console.error('Error al obtener respuestas', response.status);
      }
    } catch (error) {
      console.error('Error al obtener respuestas', error);
    } finally {
      setRefreshing(false);
    }
  };

  /** const obtenerUserInfo = async () => {
    try {
      const userInfoData = await getUserInfo();
      setUserInfo(userInfoData);

      // Verificar si hay información de usuario y si tiene la propiedad _j
      if (userInfoData && userInfoData._j) {
        // Extraer el nombre de usuario y actualizar el estado 'username'
        setUsername(userInfoData._j.username);

        // Ahora que tenemos el nombre de usuario, podemos obtener las respuestas
        obtenerRespuestas();
      }

      console.log("UserInfo:", userInfoData);
    } catch (error) {
      console.error('Error al obtener la información del usuario', error);
    }
  };
**/
    useEffect(() => {
      obtenerRespuestas();
      //obtenerUserInfo();
      //setUsername(UserInfo.username);
      //console.log('Username:', username);
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
              <Text style={styles.titulo}>Tendria que ponerse aqui el titulo</Text>
              <Text style={styles.cuerpo}>Por para ello habia que usar un metodo del backend nuevo que no está ne el docker por lo que wacho tiene que actualizar el docker para que peuda usar el metodo gracias</Text>
              <View style={styles.comentarioContainer}>
                    <TouchableOpacity onPress={openRespuestaModal} style={styles.comentarContainer}>
                      <View style={styles.ComentarContainer}>
                        <Icon name="comment" style={styles.iconoComentario} />
                        <Text style={styles.textoComentario}>Añadir comentario</Text>
                      </View>
                    </TouchableOpacity>
                    {isRespuestaModalVisible && (
                      <NewRespuestaModal
                        publicacionId={publicacionid}
                        isVisible={isRespuestaModalVisible}
                        onClose={closeRespuestaModal}
                        onRespuestaCreated={obtenerRespuestas} // Puedes pasar cualquier dato necesario
                      />
                    )}
                  </View>
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
    fontSize: 26,
    position: "absolute",
    top: 80,
    left: 30,
    lineHeight: 26,
  },
  comentarioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  iconoComentario: {
    fontSize: 24,
    marginRight: 8,
  },
  ComentarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
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
