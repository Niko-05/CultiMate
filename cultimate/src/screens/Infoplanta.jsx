import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, Alert, Animated, Dimensions } from "react-native";
import Collapsible from 'react-native-collapsible';
import { useRoute } from "@react-navigation/native";
import { getPlantPicture } from "../utils/user";
import { getUserInfo } from "../api/user";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import config from '../../config';
import { useModoOscuro } from '../context/ModoOscuroContext';
import { 
  lightModeBackground, 
  darkModeBackground, 
  lightModeText, 
  darkModeText, 
  lightbuttonBackground, 
  darkbuttonBackground, 
  lightbuttonText, 
  darkbuttonText 
} from "../utils/colores";

const Infoplanta = ({navigation}) => {
  const route = useRoute();
  const { id, data } = route.params;
  const [guia, setGuia] = useState(null);
  const item = data.find((item) => item.id === id);
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const [picture, setPicture] = useState(null);
  const { modoOscuroActivado }= useModoOscuro();
  const styles = getStyles(modoOscuroActivado); 
  const [userinfo, setUserinfo] = useState(null);
  const [imageSize, setImageSize] = useState(200);
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderOptimalMonths = guia ? (
      <View style={styles.calendarCont}>
        {months.map((month, index) => {
          const isMonthActive =
            (guia.inicio_periodo <= guia.fin_periodo &&
              index + 1 >= guia.inicio_periodo && index + 1 <= guia.fin_periodo) ||
            (guia.inicio_periodo > guia.fin_periodo &&
              (index + 1 >= guia.inicio_periodo || index + 1 <= guia.fin_periodo));

          return (
            <Text
              style={[styles.month, isMonthActive ? styles.activeMonth : styles.inactiveMonth]}
              key={month}
            >
              {month}
            </Text>
          );
        })}
      </View>
    ) : null;

  const renderDifficulty = (difficulty) => {
    let circleText = '';
    let footerText = '';

    switch (difficulty) {
      case 1:
        circleText = 'A';
        footerText = 'FÁCIL';
        break;
      case 2:
        circleText = 'B';
        footerText = 'MEDIO';
        break;
      case 3:
        circleText = 'C';
        footerText = 'DIFÍCIL';
        break;
      default:
        circleText = '?';
        footerText = 'DESCONOCIDO';
    }

    return (
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={styles.circleTop}>DIFICULTAD</Text>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{circleText}</Text>
        </View>
        <Text style={styles.circleBottom}>{footerText}</Text>
        <Text style={styles.regarCada}> </Text>
      </View>
    );
  };

  const AccordionSection = ({ title, content }) => {
    const [collapsed, setCollapsed] = useState(true);
  
    return (
      <View>
        <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
          <View style={styles.desplegables}>
            <Text style={styles.acordion}>{title}</Text>
            <Icon name={collapsed ? 'chevron-down' : 'chevron-up'} size={24} color="gray" />
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={collapsed}>
          <View style={styles.content}>
            <Text>{content}</Text>
          </View>
        </Collapsible>
      </View>
    );
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        // Calcula el nuevo tamaño de la imagen basado en el desplazamiento
        const newSize = 180 - offsetY * 0.5; // Ajusta este valor según quieras
        setImageSize(newSize < 60 ? 60 : newSize); // Establece un tamaño mínimo
      },
    },
  );

  const getGuia = async () => {
    const api_call = await fetch(`${config.API}/planta/guia/${id}`, {
        method: 'GET',
    });

    const result = await api_call.json();
    setGuia(result[0]);
  }

  const setUserInfo = async () => {
    try {
      const userInfoResponse = await getUserInfo();
      setUserinfo(userInfoResponse);
    } catch (error) {
      console.error('Error al obtener userinfo:', error);
    }
  };

  useEffect(() => {
    setUserInfo();
  }, []);


  const handleAddPress = () => {
    Alert.alert(
      "Cultivar Planta",
      "¿Quieres empezar a cultivar esta planta?",
      [
        {
          text: "No",
          onPress: () => console.log("No se iniciará el cultivo"),
          style: "cancel"
        },
        {
          text: "Sí",
          onPress: () => iniciarCultivo() // Reemplaza iniciarCultivo con la función que iniciarás
        }
      ],
      { cancelable: true }
    );
  };
  
  const iniciarCultivo = async () => {
    console.log("Se ha iniciado el cultivo de la planta.");
    try {
        const api_call = await fetch(`${config.API}/planta/addPlant`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: userinfo.id, pid: item.id }),
        });

        const response = await api_call.json();

        if (api_call.ok && response.message === 'Inserción exitosa') {
            Alert.alert("Éxito", "Planta agregada correctamente");
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigation.navigate("Guias de Plantado");
        } else {
            Alert.alert("Error", "No se pudo agregar la planta");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "No se pudo agregar la planta debido a un error en la red o en el servidor");
    }
  };
  

  useEffect(() => {
    getGuia();
    setPicture(getPlantPicture(item.id));
  }, [id]);

  if (!guia) {
    return (
      <View style={styles.container}>
        <Text>Elemento no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundLayer}>
        <Text style={styles.title}>{item.nombre}</Text>
        <Text style={styles.subtitle}>FRUTA - {item.tipo} </Text>
        <Image source={picture} style={[styles.plantImage, { width: imageSize, height: imageSize }]} />
      </View>
      <ScrollView
        style={styles.scrollView}
      >
        <View style={styles.floatingButton}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoLayer}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Image source={require('../../assets/lineales/verano.png')} style={styles.iconEstacion} />
            <Text style={{
              marginLeft: 5,
              color: '#939393',
              fontSize: 14,
            }}>{item.estacion_recomendada}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
            <View style={{
              alignItems: 'center',
              marginTop: 20,

            }}>
              <Text style={styles.circleTop}>REGAR</Text>
              <View style={styles.circle}>
                <Image source={require('../../assets/lineales/infoGota.png')} style={styles.iconGota} />
              </View>
              <Text style={styles.regarCada}>CADA</Text>
              <Text style={styles.circleBottom}>{guia.periodicidad_regado} DIAS</Text>
            </View>

            <View style={styles.divider} />

            {renderDifficulty(item.dificultad_plantado)}
          </View>

          <View style={styles.row}></View>
          <AccordionSection title="DESCRIPCIÓN" content={item.descripcion}/>
          <View style={styles.row}></View>
          <AccordionSection title="CONDICIONES LUMINOSAS" content={guia.condiciones_luminosas}/>
          <View style={styles.row}></View>
          <AccordionSection title="TEMPERATURA" content={guia.condiciones_temperatura}/>
          <View style={styles.row}></View>
          <AccordionSection title="PLANTADO" content={`Inicio del plantado en ${months[guia.inicio_periodo]} - Final del plantado en ${months[guia.fin_periodo]}`}/>
          <View style={styles.row}></View>
          <AccordionSection title="MACETA" content={`Recomendamos plantar en macetas de ${guia.tam_maceta} litros`}/>
          <View style={styles.row}></View>
          <AccordionSection title="CALENDARIO DE CRECIMIENTO" content={renderOptimalMonths}/>

        </View>
      </ScrollView>
    </View>
    /*
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.nombre}</Text>
        <View style={styles.roundedContainer}>
          <Image source={picture} style={styles.image} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="format-list-bulleted" size={24} color="gray" />
          <Text style={styles.infoText}>Descripción: {item.descripcion}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="brightness-auto" size={24} color="gray" />
          <Text style={styles.infoText}>
            Dificultad de plantado: {item.dificultad_plantado}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="leaf" size={24} color="gray" />
          <Text style={styles.infoText}>Tipo: {item.tipo}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="calendar" size={24} color="gray" />
          <Text style={styles.infoText}>
            Estación recomendada: {item.estacion_recomendada}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="tools" size={24} color="gray" />
          <Text style={styles.infoText}>
            Funcionalidad: {item.funcionalidad_planta}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="calendar-range" size={24} color="gray" />
          <Text style={styles.infoText}>
            Inicio de plantado: {guia ? months[guia.inicio_periodo] : 'Cargando...'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="calendar-range" size={24} color="gray" />
          <Text style={styles.infoText}>
            Final de plantado: {guia ? months[guia.fin_periodo] : 'Cargando...'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="water" size={24} color="gray" />
          <Text style={styles.infoText}>
            Periodicidad de riego: {guia ? guia.periodicidad_regado : 'Cargando...'} días
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="weather-sunny" size={24} color="gray" />
          <Text style={styles.infoText}>
            Condiciones luminosas: {guia ? guia.condiciones_luminosas : 'Cargando...'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="thermometer" size={24} color="gray" />
          <Text style={styles.infoText}>
            Condiciones de temperatura: {guia ? guia.condiciones_temperatura : 'Cargando...'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="flower" size={24} color="gray" />
          <Text style={styles.infoText}>
            Tamaño de maceta: {guia ? guia.tam_maceta : 'Cargando...'} litros
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="fruit-cherries" size={24} color="gray" />
          <Text style={styles.infoText}>Categoría: fruta</Text>
        </View>
      </View>

      <Text style={styles.gCalendarFont}>Growing calendar</Text>

      <View style = {{marginHorizontal: 10}}>
        <View style={styles.calendarCont}>
          <Text style={styles.month}>JAN</Text>
          <Text style={styles.month}>FEB</Text>
          <Text style={styles.month}>MAR</Text>
          <Text style={styles.month}>APR</Text>
          <Text style={styles.month}>MAY</Text>
          <Text style={styles.month}>JUN</Text>
          <Text style={styles.month}>JUL</Text>
          <Text style={styles.month}>AUG</Text>
          <Text style={styles.month}>SEP</Text>
          <Text style={styles.month}>OCT</Text>
          <Text style={styles.month}>NOV</Text>
          <Text style={styles.month}>DEC</Text>
        </View>
        {guia ?
          <View style={styles.calendarCont}>
            {months.map((month, index) => {
              const isMonthActive =
                (guia.inicio_periodo <= guia.fin_periodo &&
                  index + 1 >= guia.inicio_periodo && index + 1 <= guia.fin_periodo) ||
                (guia.inicio_periodo > guia.fin_periodo &&
                  (index + 1 >= guia.inicio_periodo || index + 1 <= guia.fin_periodo));
              
              return (
                <View style={[styles.monthLine, isMonthActive ? styles.activeMonth : null]} key={month}>
                  <Text> </Text>
                </View>
              );
            })}
          </View>
          : <View></View>
        }
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </ScrollView>
    */
  );
};

const getStyles = (modoOscuroActivado) => {
  return {
  container: {
    flex: 1,
    backgroundColor: modoOscuroActivado ? darkModeBackground : lightModeBackground,
  },
  header: {
    position: 'absolute',
    alignItems: "center",
    padding: 20,
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: modoOscuroActivado ? darkModeText : lightModeText,
    marginBottom: 0,
  },
  subtitle: {
    marginTop: 0,
    fontSize: 14,
    fontWeight: "bold",
    color: 'grey',
    marginBottom: 10,
  },
  gCalendarFont: {
    fontSize: 18,
    fontWeight: "bold",
    color: modoOscuroActivado ? darkModeText : lightModeText,
    marginBottom: 10,
  },
  roundedContainer: {
    backgroundColor: modoOscuroActivado ? lightModeBackground : 'lightgray',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: modoOscuroActivado ? darkModeText : lightModeText,
  },
  calendarCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  monthLine: {
    flex: 1,
    textAlign: 'center',
  },
  activeMonth: {
    backgroundColor: modoOscuroActivado ? '#00954B' : 'green',
  },
  scrollContainer: {
    flex: 1,
  },
  backgroundLayer: {
    backgroundColor: '#EDE7D9', // O el color de fondo verde que desees
    width: '100%',
    height: '100%',
    alignItems: 'center',
    position: 'absolute', // Posicionamiento absoluto para que quede fijo al desplazar
    top: 0, // Inicio en la parte superior de la pantalla
  },
  plantImage: {
    marginTop: 10,
    width: 180, // Ajusta al tamaño que necesites
    height: 180, // Ajusta al tamaño que necesites
  },
  infoLayer: {
    backgroundColor: 'white',
    borderRadius: 20, // Ajusta el borde como desees
    padding: 20,
    paddingTop: 20, // Espacio en la parte superior para evitar que el contenido se superponga con la imagen
    marginTop: 300,
    zIndex: 0,
  },
  circle: {
    width: 100, // Ajusta el ancho según sea necesario
    height: 100, // Ajusta la altura según sea necesario
    borderRadius: 50, // La mitad del ancho y la altura para hacerlo un círculo perfecto
    borderWidth: 2, // Ajusta el ancho del borde según sea necesario
    borderColor: 'gray', // Ajusta el color del borde según sea necesario
    justifyContent: 'center', // Centra la imagen en el círculo
    alignItems: 'center', // Centra la imagen en el círculo
    marginVertical: 10,
  },
  iconGota: {
    width: 50, // Ajusta según el tamaño de tu icono
    height: 50, // Ajusta según el tamaño de tu icono
    resizeMode: 'contain', // Asegúrate de que la imagen se escale correctamente
  },
  iconEstacion: {
    width: 24, // Ajusta según el tamaño de tu icono
    height: 24, // Ajusta según el tamaño de tu icono
    resizeMode: 'contain', // Asegúrate de que la imagen se escale correctamente
  },
  circleTop: {
    fontSize: 15,
    fontWeight: "bold",
  },
  circleBottom: {
    fontSize: 16,
    fontWeight: '900',
  },
  regarCada: {
    fontSize: 12,
    color: '#939393',
    fontWeight: "bold",
    marginBottom: -4,
  },
  divider: {
    height: '80%',
    width: 1,
    backgroundColor: '#939393',
    marginHorizontal: 50,
  },
  circleText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  desplegables: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  acordion: {
    fontSize: 16,
    fontWeight: `bold`
  },
  content: {
    padding: 20,
  },
  calendarCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // Asegúrate de tener suficiente espacio vertical para ver el color de fondo
    paddingVertical: 10,
  },
  month: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 1,
    // Estilos comunes para todos los meses
  },
  activeMonth: {
    backgroundColor: 'green', // o cualquier otro color que represente un mes óptimo
    color: 'white', // si quieres que el texto se vea claro con el fondo oscuro
  },
  inactiveMonth: {
    // Estilos para los meses que no son óptimos
    backgroundColor: 'transparent', // o el color de fondo del contenedor
    color: 'black', // color del texto para los meses no óptimos
  },
  addButton: {
    width: 69, // Tamaño del botón
    height: 69, // Tamaño del botón
    borderRadius: 39, // Hace el botón circular
    backgroundColor: '#2EC26A', // Color de fondo del botón
    justifyContent: 'center', // Centra el icono en el botón
    alignItems: 'center', // Centra el icono en el botón
    elevation: 8, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // Sombra para iOS
    shadowOpacity: 0.25, // Sombra para iOS
    shadowRadius: 3.84, // Sombra para iOS
  },
  floatingButton: {
    position: 'absolute',
    right: 30, // Ajusta según la necesidad de tu diseño
    marginTop: 263,
    zIndex: 10,
  },
  addButtonText: {
    fontSize: 60,
    color: 'white',
    marginTop: -8,
  }
}};

export default Infoplanta;
