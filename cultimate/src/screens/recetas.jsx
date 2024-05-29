import React, { useState, useEffect } from "react";
import { useModoOscuro } from "../context/ModoOscuroContext";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import config from "../../config";

import { useNavigation } from "@react-navigation/native";

const Recetas = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { modoOscuroActivado } = useModoOscuro();
  const styles = getStyles(modoOscuroActivado);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const api_call = await fetch(`${config.API}/recetas`, {
        method: "GET",
      });
      if (!api_call.ok) {
        Alert.alert(
          "API error",
          `Failed to fetch user data. Status: ${api_call.status}`
        );
        return;
      }
      const response = await api_call.json();
      setRecipes(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require("../../assets/lineales/AGUACATES_LINEA_BLANCA.png")}
          style={styles.awacate}
        />
        <Text style={styles.titulo}>RECETAS</Text>
      </View>
      <View style={styles.modal}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {recipes.map((recipe) => (
            
            <TouchableOpacity
              key={recipe.id}
              style={styles.productContainer}
              onPress={() =>  navigation.navigate("Receta", {id: recipe.id, data: recipes})}
            >
              <Image
                source={{ uri: recipe.imagen }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{recipe.nombre}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const getStyles = () => {
  return {
    container: {
      flex: 1,
      backgroundColor: "#09873D",
    },
    top: {
      flex: 0.2,
    },
    modal: {
      flex: 0.8,
      backgroundColor: "white",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    scrollView: {
      paddingTop: 10,
      paddingHorizontal: 10,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      paddingBottom: 75,
    },
    awacate: {
      width: 192,
      height: 203,
      position: "absolute",
      top: -5,
      right: -10,
    },
    titulo: {
      color: "#FFF",
      fontFamily: "Integral CF",
      fontSize: 24,
      position: "absolute",
      bottom: 12,
      left: 30,
      lineHeight: 26,
    },
    productContainer: {
      width: "48%",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      borderRadius: 10,
      padding: 10,
      backgroundColor: "#D1EAD0",
    },
    productImage: {
      width: "100%", // Adjust image size as needed
      aspectRatio: 1, // Adjust image size as needed
      resizeMode: "contain",
    },
    productName: {
      fontSize: 16,
      fontFamily: "Inter-Bold",
      color: "black",
      textAlign: "center",
    },
    productDescription: {
      fontSize: 14,
      textAlign: "center",
      fontFamily: "Inter",
      color: "#939393",
    },
  };
};

export default Recetas;
