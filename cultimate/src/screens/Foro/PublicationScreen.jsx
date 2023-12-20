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
  console.log('PublicacionId:', publicacionId);
  const [refreshing, setRefreshing] = useState(false);
  const [publicacion, setPublicacion] = useState({});
  const [UserInfo, setUserInfo] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [username, setUsername] = useState("");
  const [isRespuestaModalVisible, setIsRespuestaModalVisible] = useState(false);

  const openRespuestaModal = () => {
    setIsRespuestaModalVisible(true);
  };

  const obtenerPublicacionbyId = async () => {
    try {
      const response = await fetch(`${config.API}/publicacion/usuario/${publicacionId}`);
      const data = await response.json();

      if (response.ok) {
        setPublicacion(data);
        console.log('Publicacion:', data);
      } else {
        console.error('Error al obtener publicacion', response.status);
      }
    } catch (error) {
      console.error('Error al obtener publicacion', error);
    } finally {
      setRefreshing(false);
    }
  };

  const closeRespuestaModal = () => {
    setIsRespuestaModalVisible(false);
    obtenerRespuestas(); // Actualiza las respuestas después de cerrar el modal
  };

  const onRefresh = useCallback(() => {
    obtenerRespuestas();
  }, [publicacionId]);

  const obtenerRespuestas = async () => {
    try {
      const response = await fetch(`${config.API}/publicacion/respuestas/${publicacionId}`);
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
      obtenerPublicacionbyId();
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
              <View style={styles.constainer_row}>
                <Icon name="account-circle" style={styles.iconoUsuario} />
                <Text style={styles.titulo}>{publicacion.titulo}</Text>
              </View>
              <Text style={styles.cuerpo}>{publicacion.cuerpo}</Text>
              <View style={styles.comentarioContainer}>
                <TouchableOpacity onPress={openRespuestaModal} style={styles.comentarContainer}>
                  <View style={styles.ComentarContainer}>
                    <Icon name="comment" style={styles.iconoComentario} />
                    <Text style={styles.textoComentario}>Añadir comentario</Text>
                  </View>
                </TouchableOpacity>
                {isRespuestaModalVisible && (
                  <NewRespuestaModal
                    publicacionId={publicacionId}
                    isVisible={isRespuestaModalVisible}
                    onClose={closeRespuestaModal}
                    onRespuestaCreated={obtenerRespuestas} // Puedes pasar cualquier dato necesario
                  />
                )}
              </View>
            </View>
            {respuestas.length === 0 ? (
              <View style={styles.avisoContainer}>
                <View style={styles.row}/>
                <Text style={styles.avisoTextoMargin}>Aún no hay comentarios.</Text>
                <Text style={styles.avisoTexto}>¡Añade uno!</Text>
              </View>
            ) : null}
            {respuestas &&
              respuestas.map((respuesta) => (
                
                <>
                <View style={styles.row}/>
                  <View key={respuesta.id} style={styles.respuestaContainer}>
                    <View style={styles.respuestaHeader}>
                      <View style={styles.constainer_row}>
                        <Icon name="account-circle" style={styles.iconoRespuesta} />
                        <Text style={styles.respuestaUsuario}>Usuario {respuesta.autor}</Text>
                      </View>
                    </View>
                    <Text style={styles.respuestaTexto}>{respuesta.cuerpo}</Text>
                  </View>
                </>
              ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

// Estilos existentes
const styles = StyleSheet.create({
  avisoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  avisoTexto: {
    fontSize: 16,
    textAlign: 'center',
  },  
  avisoTextoMargin: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 8,
  },  
  container: {
    flex: 1,
    backgroundColor: '#09873D',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconoRespuesta: {
    fontSize: 28,
    marginRight: 8,
  },
  iconoUsuario: {
    fontSize: 40,
    marginRight: 8,
  },
  constainer_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    alignItems: 'flex-end',
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
    paddingLeft: 50,
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
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    flexShrink: 1,
    marginBottom: 8,
    justifyContent: 'flex-start',
  },
  cuerpo: {
    fontSize: 18,
    color: '#333',
    paddingLeft: 50,
  },
  respuestaContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff', // Color de fondo
    borderRadius: 8,
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
    paddingLeft: 37
  },
});

export default PublicationScreen;
