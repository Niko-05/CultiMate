import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import config from "../../../config";

const imagenes = {
  cebolla: require("../../../assets/cebolla.png"),
  cherry: require("../../../assets/cherry.png"),
  espinaca: require("../../../assets/espinaca.png"),
  frambuesa: require("../../../assets/frambuesa.png"),
  fresa: require("../../../assets/fresa.png"),
  lechuga: require("../../../assets/lechuga.png"),
  limon: require("../../../assets/limon.png"),
  menta: require("../../../assets/menta.png"),
  mora: require("../../../assets/mora.png"),
  pepino: require("../../../assets/pepino.png"),
  pimientos: require("../../../assets/pimientos.png"),
  tomate: require("../../../assets/tomate.png"),
  zanahoria: require("../../../assets/zanahoria.png"),
  calabacin: require("../../../assets/calabacin.png"),
  brocoli: require("../../../assets/brocoli.png"),
  albahaca: require("../../../assets/albahaca.png"),
};

const ForosScreen = ({ navigation }) => {
  const [foros, setForos] = useState([]);

  useEffect(() => {
    const obtenerForos = async () => {
      try {
        const response = await fetch(`${config.API}/foro`);

        if (!response.ok) {
          console.error("Error al obtener los foros", response.status);
          Alert.alert("Error", "Hubo un problema al obtener los foros");
          return;
        }

        const data = await response.json();
        setForos(data);
      } catch (error) {
        console.error("Error al obtener los foros", error);
        Alert.alert("Error", "Hubo un problema al obtener los foros");
      }
    };

    obtenerForos();
  }, []);

  const navigateToForo = (foroId, nombreplanta) => {
    navigation.navigate("ForoPlantaScreen", { foroId, nombreplanta });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundLayer}>
        <Image
          source={require("../../../assets/lineales/mora-linea-blanca.png")}
          style={styles.plantImage}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.forosTitle}>FOROS</Text>
        <View style={styles.infoLayer}>
          {foros.map((foro) => {
            const nombrePlantaLimpiado = foro.nombre
              .toLowerCase()
              .replace(/\s+/g, "")
              .replace(/^forode/, "");
            const imagenPlanta = imagenes[nombrePlantaLimpiado];

            return (
              <TouchableOpacity
                key={foro.id}
                style={styles.foroCard}
                onPress={() => navigateToForo(foro.id, nombrePlantaLimpiado)}
              >
                <View style={styles.foroCardContent}>
                  <View style={styles.profileImageContainer}>
                    <Image source={imagenPlanta} style={styles.imagenForo} />
                  </View>
                  <Text style={styles.nombreForo}>{foro.nombre}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundLayer: {
    backgroundColor: "#09873D",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  forosTitle: {
    color: "#FFF",
    fontFamily: "Integral CF",
    fontSize: 24,
    position: "absolute",
    top: 165,
    left: 30,
    lineHeight: 26,
  },
  infoLayer: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 5,
    marginTop: 200,
    marginBottom: 80,
    zIndex: 0,
    paddingBottom: 20, // Añadí un espacio adicional al final
  },
  scrollViewContent: {
    flexGrow: 1, // Ajusté la propiedad para permitir el scroll
  },
  foroCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#F5F5F5", // Fondo ligeramente más oscuro
    borderRadius: 15,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 10, // Espaciado interno para separar las tarjetas
  },
  foroCardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 12,
  },
  imagenForo: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  plantImage: {
    marginTop: 10,
    marginLeft: 243,
    width: 180,
    height: 180,
  },
  nombreForo: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter", // Agregué la fuente Inter-Bold'
    paddingLeft: 20,
  },
});

export default ForosScreen;