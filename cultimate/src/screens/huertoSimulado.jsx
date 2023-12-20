import React, { useRef, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import config from "../../config";
import { getUserInfo } from "../api/user";
import { getPlantPicture, getPlantPaso} from "../utils/user";
import * as SecureStore from "expo-secure-store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useModoOscuro } from "../context/ModoOscuroContext";
import NoRegada from "../../assets/iconosSVG/GotaSinRegar.svg";

const gridData2 = [
  {
    id: 1,
    centerImage: require("../../assets/tomate.png"),
    topRightImage: require("../../assets/iconosSVG/GotaSinRegar.svg"),
    opacity: 1,
    nombre: "Tomate",
    FechaPlantado: "2023-11-01",
    PeriodicidadRegado: 2,
    CondTemperatura: "25°C",
    Paso: "Plantar",
    Detalles: "Details",
    Estado: "Healthy",
  },
  {
    id: 2,
    centerImage: require("../../assets/fresa.png"),
    topRightImage: require("../../assets/gotas_agua.png"),
    opacity: 0,
    nombre: "Fresa",
    FechaPlantado: "2023-10-15",
    PeriodicidadRegado: 3,
    CondTemperatura: "22°C",
    Paso: "Regar",
    Detalles: "Details",
    Estado: "Healthy",
  },
  {
    id: 3,
    centerImage: require("../../assets/tomate.png"),
    topRightImage: require("../../assets/gotas_agua.png"),
    opacity: 1,
    nombre: "Tomate",
    FechaPlantado: "2023-11-01",
    PeriodicidadRegado: 2,
    CondTemperatura: "25°C",
    Paso: "Cosechar",
    Detalles: "Details",
    Estado: "Healthy",
  },
  {
    id: 4,
    centerImage: require("../../assets/fresa.png"),
    topRightImage: require("../../assets/gotas_agua.png"),
    opacity: 0,
    nombre: "Fresa",
    FechaPlantado: "2023-10-15",
    PeriodicidadRegado: 3,
    CondTemperatura: "22°C",
    Paso: "Cosechar",
    Detalles: "Details",
    Estado: "Healthy",
  },
];

const defaultSquareData = {
  centerImage: require("../../assets/huerto/AnadirMaceta.png"),
  topRightImage: require("../../assets/iconosSVG/GotaSinRegar.svg"),
  marcadores: require("../../assets/huerto/Marcadores.png"),
  opacity: 0,
};

const createDefaultSquares = (count) => {
  const defaultSquares = [];
  for (let i = 0; i < count; i++) {
    defaultSquares.push({ ...defaultSquareData });
  }
  return defaultSquares;
};

const fillDataToCompleteRow = (data) => {
  const dataCount = data.length;
  const squaresToAdd = 3 - (dataCount % 3);
  if (squaresToAdd > 0 && squaresToAdd < 3) {
    data.push(...createDefaultSquares(squaresToAdd));
  }
  return data;
};

const HuertoSimulado = ({ navigation }) => {
  const gridData = useRef([]);
  const [updatedGridData, setUpdatedGridData] = useState([]);
  const [userinfo, setUserinfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updateTriggered, setUpdateTriggered] = useState(false);
  const insets = useSafeAreaInsets();
  const { modoOscuroActivado } = useModoOscuro();
  const styles = getStyles(modoOscuroActivado);

  const handleWateringPress = (planta) => {
    Alert.alert(
      "Regar Planta",
      "¿Has regado esta planta?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: () => handlePlantWatering(planta),
        },
      ],
      { cancelable: false }
    );
  };

  const handlePlantWatering = (planta) => {
    regarPlanta(planta);
    console.log("Planta regada:", planta.nombre);
    navigation.navigate("Tienda");
    navigation.navigate("Huerto");
    // Puedes llamar a una función aquí para actualizar el estado de la planta en la base de datos
  };

  const regarPlanta = async (planta) => {
    setUpdateTriggered(true);
    try {
      const response = await fetch(`${config.API}/planta/regar/${planta.id}`, {
        method: "PUT",
      });
      console.log(planta.id);
      setUpdateTriggered(false);
    } catch (error) {
      console.error(error);
      setUpdateTriggered(false);
    }
  };

  const setUserInfo = async () => {
    try {
      const userInfoResponse = await getUserInfo();
      setUserinfo(userInfoResponse);
      setGridData(userInfoResponse);
    } catch (error) {
      console.error("Error al obtener userinfo:", error);
    }
  };

  useEffect(() => {
    setUserInfo();
  }, []);

  const setGridData = async (userinfo) => {
    if (!userinfo) return;

    try {
      const url = `${config.API}/planta/plantadas?userId=${userinfo.id}`;
      const api_call = await fetch(url);
      const result = await api_call.json();
      gridData.current = result;
      setIsLoading(false);
    } catch (e) {
      console.error("Error al obtener datos:", e);
      Alert.alert(
        "Problema de red",
        "No se ha podido mostrar el listado de plantas debido a un problema de red."
      );
      setIsLoading(false);
    }
  };

  const loadData = async () => {
    setIsLoading(true);

    try {
      const userInfoResponse = await getUserInfo();
      setUserinfo(userInfoResponse);

      if (userInfoResponse) {
        const url = `${config.API}/planta/plantadas?userId=${userInfoResponse.id}`;
        const api_call = await fetch(url);
        const result = await api_call.json();
        gridData.current = result;

        const updatedData = await Promise.all(
          gridData.current.map(async (item) => {
            const imageResource = getPlantPicture(item.planta_id);
            const plantaPaso = getPlantPaso (item.planta_id, item.paso);
            return { ...item, centerImage: imageResource, pasofoto: plantaPaso };
          })
        );
        setUpdatedGridData(updatedData);
      }
    } catch (e) {
      console.error("Error al obtener datos:", e);
      Alert.alert(
        "Problema de red",
        "No se ha podido mostrar el listado de plantas debido a un problema de red."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleScreenFocus = () => {
    loadData();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleScreenFocus);
    return () => {
      unsubscribe();
    };
  }, [navigation, updateTriggered]);

  let filledGridData = [];

  if (updatedGridData && updatedGridData.length > 0) {
    filledGridData = fillDataToCompleteRow([...updatedGridData]);
    const rowsToAdd = 3 - Math.ceil(filledGridData.length / 3);

    for (let i = 0; i < rowsToAdd; i++) {
      filledGridData.push(...createDefaultSquares(3));
    }
  }

  const rowsToAdd = 3 - Math.ceil(filledGridData.length / 3);

  for (let i = 0; i < rowsToAdd; i++) {
    filledGridData.push(...createDefaultSquares(3));
  }

  const handlePress = (planta) => {
    console.log("envio: " + JSON.stringify(planta));
    navigation.navigate("GuiaPlantado", { plantaData: planta });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <ActivityIndicator size="large" color="#09873D" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.heading}>MI HUERTO</Text>
        <TouchableOpacity
          style={[styles.FAQButton, { top: insets.top + 10 }]}
          onPress={() => navigation.navigate("PreguntasFrecuentes")}
        >
          <Text style={styles.FAQButtonText}>FAQ</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoLayer}>
        <ScrollView>
          <View style={styles.grid}>
            {filledGridData.map((planta, index) => (
              <View key={index} style={styles.row}>
                {planta && planta.id !== undefined ? (
                  <TouchableOpacity
                    style={styles.macetaContainer}
                    onPress={() => handlePress(planta)}
                  >
                    <Image
                         source={
                          Math.floor(Math.random() * 3) + 1 === 1
                            ? require("../../assets/huerto/MacetaA.png")
                            : Math.floor(Math.random() * 3) + 1 === 2
                            ? require("../../assets/huerto/MacetaB.png")
                            : require("../../assets/huerto/MacetaC.png")
                        }
                        style={styles.maceta}
                    />
                    <Image
                         source={planta.pasofoto}
                        style={styles.plantImage}
                    />
                    <Image
                      source={defaultSquareData.marcadores}
                      style={styles.layer}
                    />
                    <View style={styles.numeroContainer}>
                      <Text style={styles.numero}>{planta.paso}</Text>
                    
                    </View>
                    <View style={styles.imagenMarcadorContainer}>
                      <Image style={styles.imagenMarcador} source={planta.centerImage}/>     
                    </View>
                    {planta.regada == 0 ? (
                      <TouchableOpacity
                        onPress={() => handleWateringPress(planta)}
                        style={styles.topRightImage}
                      >
                        <NoRegada width={34} height={34} />
                      </TouchableOpacity>
                    ) : (
                      <View></View>
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.macetaContainer}
                    onPress={() => navigation.navigate("newPlant")}
                  >
                    <Image
                      source={ Math.floor(Math.random() * 3) + 1 === 1
                            ? require("../../assets/huerto/MacetaA.png")
                            : Math.floor(Math.random() * 3) + 1 === 2
                            ? require("../../assets/huerto/MacetaB.png")
                            : require("../../assets/huerto/MacetaC.png")
                        }
                      style={styles.maceta}
                    />
                    <Image
                      source={defaultSquareData.centerImage}
                      style={styles.layer}
                    />
                    <Image
                      source={defaultSquareData.topRightImage}
                      style={[
                        styles.topRightImage,
                        { opacity: defaultSquareData.opacity },
                      ]}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const getStyles = (modoOscuroActivado) => {
  return {
    container: {
      flex: 1,
      backgroundColor: "#09873D",
    },
    top: {
      flex: 0.25,
    },
    heading: {
      color: "#FFF",
      fontFamily: "Integral CF",
      fontSize: 24,
      position: "absolute",
      bottom: 22,
      left: 30,
      lineHeight: 26,
    },
    infoLayer: {
      flex: 0.75,
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: "center",
      paddingTop: 30,
    },
    plantImage: {
      marginTop: 10,
      marginLeft: 243,
      width: 108,
      height: 137,
      position: "absolute", // Ajusta al tamaño que necesites
      resizeMode: 'contain'
    },
    grid: {
      flexDirection: "row", // Create squares in a row
      flexWrap: "wrap", // Allow them to wrap to the next row
      justifyContent: "center",
    },
    row: {
      flexDirection: "row", // Each row is a row of squares
      marginBottom: 5, // Adjust the margin between rows
    },
    macetaContainer: {
      width: 108,
      height: 137,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 15,
      margin: 5,
      
    },
    centeredImage: {
      top: -5,
      width: 70, // Adjust the size as needed
      height: 70, // Adjust the size as needed
    },
    centeredAdd: {
      width: 118, // Adjust the size as needed
      height: 150, // Adjust the size as needed
      position: "absolute",
    },
    topRightImage: {
      position: "absolute",
      bottom:71, // Ajusta a 0 o a un valor que posicione la imagen correctamente
      left: 83, // Ajusta a 0 o a un valor que posicione la imagen correctamente
      width: 60, // Ajusta el tamaño como sea necesario
      height: 60, // Ajusta el tamaño como sea necesario
      resizeMode: 'contain'
    },
    maceta: {width: 108,
      height: 137,
      resizeMode: 'contain'},
    FAQButton: {
      backgroundColor: "#D1EAD0",
      padding: 10,
      borderRadius: 50,
      right: 30,
      alignItems: "center",
      position: "absolute",
    },
    FAQButtonText: {
      color: "black",
      fontSize: 16,
      
    },
    layer: {
      width: 118,
      height: 150,
      position: "absolute",

    },
    plantaMarcador: {
      width: 118,
      height: 150,
      position: "absolute",
      resizeMode: 'contain'
    },
    numeroContainer: {
      position: "absolute",
      bottom: 40,
      left: 21,
      width: 8,
      height: 11.25,
    },
    numero: {
      color: "white",
      fontFamily: "Inter",
      fontSize: 10,
    },
    imagenMarcadorContainer: {
      position: "absolute",
      bottom: 34,
      left: 70,
      width: 19,
      height: 20,
    },
    imagenMarcador: {
      width: 19,
      height: 20,
      resizeMode: 'contain'
    },
  };
};

export default HuertoSimulado;
