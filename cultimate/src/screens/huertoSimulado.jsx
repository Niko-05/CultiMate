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
  ScrollView,
} from "react-native";
import config from "../../config";
import { getUserInfo } from "../api/user";
import { getPlantPicture } from "../utils/user";
import * as SecureStore from "expo-secure-store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useModoOscuro } from "../context/ModoOscuroContext";
import NoRegada from "../../assets/iconosSVG/GotaSinRegar.svg"

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
  centerImage: require("../../assets/mas.png"),
  topRightImage: require("../../assets/iconosSVG/GotaSinRegar.svg"),
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
            return { ...item, centerImage: imageResource };
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require("../../assets/lineales/mora-linea-blanca.png")}
          style={styles.plantImage}
        />
        <Text style={styles.heading}>MI HUERTO</Text>
        <TouchableOpacity
          style={styles.FAQButton}
          onPress={() => navigation.navigate("PreguntasFrecuentes")}
        >
          <Text style={styles.FAQButtonText}>FAQ</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoLayer}>
        <ScrollView>
          <View style={{ marginTop: 20 }}>
            {/* Contenido principal */}
            <View style={styles.grid}>
              {filledGridData.map((planta, index) => (
                <View key={index} style={styles.row}>
                  {planta && planta.id !== undefined ? (
                    <TouchableOpacity
                      style={styles.square}
                      onPress={() => handlePress(planta)}
                    >
                      <Image
                        source={require("../../assets/Maceta.png")}
                        style={styles.maceta}
                      />
                      <Image
                        source={planta.centerImage}
                        style={styles.centeredImage}
                      />
                      {planta.regada == 0 ?
                        <TouchableOpacity
                          onPress={() => handleWateringPress(planta)}
                          style={styles.topRightImage}
                        >
                          <NoRegada width={34} height={34} />
                        </TouchableOpacity>
                        :
                        <View></View>
                      }
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.square}
                      onPress={() => navigation.navigate("newPlant")}
                    >
                      <Image
                        source={defaultSquareData.centerImage}
                        style={styles.centeredAdd}
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
    },
    top: {
      backgroundColor: "#09873D",
      width: "100%",
      height: "100%",
      position: "absolute",
    },
    heading: {
      flex: 0.3,
      color: "#FFF",
      fontFamily: "Integral CF",
      fontSize: 24,
      position: "absolute",
      top: 165,
      left: 30,
      lineHeight: 26,
    },
    infoLayer: {
      flex: 1,
      backgroundColor: "white",
      marginTop: 200,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: "center",
      paddingTop: 30
    },
    plantImage: {
      marginTop: 10,
      marginLeft: 243,
      width: 180, // Ajusta al tamaño que necesites
      height: 180, // Ajusta al tamaño que necesites
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
    square: {
      width: 110,
      height: 128,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#D1EAD0",
      borderRadius: 15,
      margin: 5,
    },
    centeredImage: {
      top: -5,
      width: 70, // Adjust the size as needed
      height: 70, // Adjust the size as needed
    },
    centeredAdd: {
      width: 50, // Adjust the size as needed
      height: 50, // Adjust the size as needed
    },
    topRightImage: {
      position: "absolute",
      top: -10, // Ajusta a 0 o a un valor que posicione la imagen correctamente
      right: 53, // Ajusta a 0 o a un valor que posicione la imagen correctamente
      width: 60, // Ajusta el tamaño como sea necesario
      height: 60, // Ajusta el tamaño como sea necesario
    },
    maceta: {
      position: "absolute",
      width: 85, // Ajusta el tamaño como sea necesario
      height: 85,
      top: 35,
    },
    FAQButton: {
      backgroundColor: "#D1EAD0",
      padding: 10,
      borderRadius: 50,
      margin: 30,
      alignItems: "center",
      position: "absolute",
    },
    FAQButtonText: {
      color: "#black",
      fontSize: 16,
      fontWeight: "bold",
    },
  };
};

export default HuertoSimulado;
