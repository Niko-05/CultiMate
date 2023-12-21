import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
  Image,
} 
from 'react-native';
import config from '../../../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getUserInfo } from '../../api/user';
import { getProfilePictureSource } from '../../utils/user';
import NewPublication from './NewPublicationModal';

const ForoPlantaScreen = ({ route, navigation }) => {
  const { foroId, nombreplanta } = route.params;
  const [publicaciones, setPublicaciones] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasPublications, setHasPublications] = useState(true);

  const handleNewPublicationPress = () => {
    setIsModalVisible(true);
    //console.log(publicaciones);
  };

  const obtenerPublicaciones = async () => {
    try {
      const response = await fetch(`${config.API}/publicacion/foro/${foroId}`);
      const data = await response.json();
      setPublicaciones(data);
      setHasPublications(data.length > 0);
    } catch (error) {
      console.error('Error al obtener las publicaciones', error);
      Alert.alert('Error', 'Hubo un problema al obtener las publicaciones');
    } finally {
      setRefreshing(false);
    }
  };

  const handlePublicacionClick = (publicationid) => {
    //console.log('publicationid desde la screen del foro:', publicationid);
    navigation.navigate('PublicationScreen', { publicacionId: publicationid, nombreplanta });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    obtenerPublicaciones();
  }, [foroId]);

  useEffect(() => {
    obtenerPublicaciones();
  }, [foroId]);

  const navigateToNewRespuesta = (publicacionId) => {
    navigation.navigate('NewRespuesta', { publicacionId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <Text style={styles.foroTitle}>FORO {nombreplanta.toUpperCase()}</Text>
      <View style={styles.greenBackground}>
        <View style={styles.container2}>
          {refreshing && <ActivityIndicator size="large" color="#0000ff" />}
          {!hasPublications && !refreshing && (
            <Text style={styles.noPublicationsText}>Aún no hay publicaciones en este foro.</Text>
          )}
          {!hasPublications && !refreshing && (
            <Text style={styles.noPublicationsText}>¡Escribe la primera!</Text>
          )}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {publicaciones.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handlePublicacionClick(item.id)}
                >
                  <View key={item.id} style={styles.publicacionContainer}>
                    <View style={styles.publicacionHeader}></View>
                    <View style={{flexDirection: "row"}}>
                      <View style={{borderRadius: 15, marginRight: 10, marginTop: 3}}>
                        <Image source={require('../../../assets/zanahoria.png')} style={{ width: 20, height: 20 }} />
                      </View>
                      <View>
                        <Text style={styles.autor}>{item.autor}</Text>
                      </View>
                    </View>
                    <Text style={styles.titulo}>{item.titulo}</Text>
                    <View style={{flexDirection: "row", alignSelf: 'flex-end', marginTop: 5, alignItems: "center"}}>
                      <Icon name="comment" style={styles.iconoComentario} />
                      <Text style={styles.cuerpo}>{item.contador_respuestas}</Text>
                    </View>
                  </View>
                < View style={styles.row}></View>
                </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity onPress={handleNewPublicationPress} style={styles.botonMas}>
          <Icon name="plus" style={styles.textoBotonMas} />
        </TouchableOpacity>
        {isModalVisible && (
          <NewPublication
            route={route}
            foroId={foroId}
            nombreplanta={nombreplanta}
            isVisible={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
              obtenerPublicaciones(); // Actualiza la lista después de cerrar el modal
            }}
          />
        )}
      </View>
    </View>
  );
};

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
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  autor: {
    fontSize: 18,
    marginBottom: 8,
  },
  cuerpo: {
    fontSize: 16,
  },
  botonMas: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#09873D',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotonMas: {
    color: '#fff',
    fontSize: 40,
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
  noPublicationsText: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#ddd',
  },
});

export default ForoPlantaScreen;