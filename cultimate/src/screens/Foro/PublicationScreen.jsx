import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image
  
} from "react-native";
import config from "../../../config";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NewRespuestaModal from './NewRespuestaModal';
import { createIconSetFromFontello } from "react-native-vector-icons";
import { getAvatarPictureSource } from "../../utils/user";


const PublicationScreen = ({ route }) => {
  const { publicacionId, nombreplanta } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [publicacion, setPublicacion] = useState({});
  const [UserInfo, setUserInfo] = useState([]);
  const [autor, setAutor] = useState(''); // Agrega este estado
  const [profilePictureId, setProfilePictureId] = useState(''); // Agrega este estado
  const [respuestas, setRespuestas] = useState([]);
  const [username, setUsername] = useState("");
  const [isRespuestaModalVisible, setIsRespuestaModalVisible] = useState(false);

  const openRespuestaModal = () => {
    setIsRespuestaModalVisible(true);
  };

  useEffect(() => {
    obtenerRespuestas();
    obtenerPublicacionbyId();
  }, [publicacionId]);

  const obtenerPublicacionbyId = async () => {
    try {
      setRefreshing(true); // Activamos el indicador de actualización
      const response = await fetch(`${config.API}/publicacion/publi/${publicacionId}`);
      const data = await response.json();
  
      if (response.ok) {
        setPublicacion(data[0]); // Actualiza el estado con el objeto de publicación
        setAutor(data[0].autor); // Actualiza el estado del autor
        setProfilePictureId(data[0].ProfilePictureId); // Actualiza el estado del ProfilePictureId
        console.log(data);
      } else {
        console.error('Error al obtener publicacion', response.status);
      }
    } catch (error) {
      console.error('Error al obtener publicacion', error);
    } finally {
      setRefreshing(false); // Desactivamos el indicador de actualización, independientemente de si hubo éxito o error
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
      <View style={styles.greenBackground}>
        <View style={styles.container2}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <View style={styles.publicacionContainer}>
              <View style={styles.constainer_row}>
                <View style={{borderRadius: 15, marginRight: 10, marginTop: 3}}>
                  {
                    publicacion.ProfilePictureId ?
                      <Image source={getAvatarPictureSource(publicacion.ProfilePictureId)} style={{ width: 70, height: 70, borderRadius: 15, }} />
                    :
                      <View></View>
                  }
                  
                </View>
                <View>
                  <Text style={styles.titulo}>{publicacion.titulo}</Text>
                  <Text style={styles.cuerpo}>{publicacion.cuerpo}</Text>
                </View>
              </View>
              
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
                <View key={respuesta.id} style={styles.respuestaContainer}>
                <>
                <View style={styles.row}/>
                  <View key={respuesta.id} style={styles.respuestaContainer}>
                    <View style={styles.respuestaHeader}>
                      <View style={styles.constainer_row}>
                        <View style={{borderRadius: 15, marginRight: 10, marginTop: 3}}>
                          <Image source={getAvatarPictureSource(respuesta.ProfilePictureId)} style={{ width: 40, height: 40, borderRadius: 15, }} />
                        </View>
                        <Text style={styles.respuestaUsuario}>{respuesta.autor}</Text>
                      </View>
                    </View>
                    <Text style={styles.respuestaTexto}>{respuesta.cuerpo}</Text>
                  </View>
                </>
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
    borderBottomWidth: 3,
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
  },
  header: {
    backgroundColor: '#09873D',
    padding: 16,
    height: 80,
    justifyContent: 'flex-end',
  },
  foroTitle: {
    color: "#FFF",
    fontSize: 24,
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
    marginTop: 33,
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
    paddingVertical: 16,
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
  },
  respuestaContainer: {
    padding: 16,
    backgroundColor: '#fff', // Color de fondo
    borderRadius: 8,
  },
  respuestaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  textoComentario: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  }, 
  respuestaUsuario: {
    fontSize: 18,
    color: '#3498db', // Color del usuario
    fontWeight: 'bold',
  },
  respuestaTexto: {
    fontSize: 16,
    color: '#333', // Color del texto
    paddingLeft: 17
  },
});

export default PublicationScreen;