import React, { useState, useEffect } from "react";
import { useModoOscuro } from "../context/ModoOscuroContext";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import config from "../../config";
import {
  lightModeBackground,
  darkModeBackground,
  lightModeText,
  darkModeText,
  lightbuttonBackground,
  darkbuttonBackground,
  lightbuttonText,
  darkbuttonText,
} from "../utils/colores";

import { useNavigation } from "@react-navigation/native";

const Tienda = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { modoOscuroActivado } = useModoOscuro();
  const styles = getStyles(modoOscuroActivado);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const api_call = await fetch(`${config.API}/productos`, {
        method: "GET",
      });
      if (!api_call.ok) {
        // Handle non-OK response status
        Alert.alert(
          "API error",
          `Failed to fetch user data. Status: ${api_call.status}`
        );
        return;
      }
      const response = await api_call.json();
      setProducts(response); // Set the fetched product data
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openProductLink = (productUrl) => {
    // Open URL in the default browser
    Linking.openURL(productUrl);
  };

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
          source={require("../../assets/brocoli_transparent.png")}
          style={styles.brocoli}
        />
        <Text style={styles.titulo}>TIENDA</Text>
      </View>
      <View style={styles.modal}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productContainer}
              onPress={() => openProductLink(product.url)}
            >
              <Image
                source={{ uri: product.imagen }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{product.nombre}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>{product.precio}€</Text>
              </View>
              <Text style={styles.productDescription}>
                {product.descripcion}
              </Text>
            </TouchableOpacity>
          ))}
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
    brocoli: {
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
      marginBottom: 10,
    },
    productName: {
      fontSize: 16,
      fontFamily: "Inter-Bold",
      marginTop: 5,
      marginBottom: 5,
      color: "black",
    },
    priceContainer: {
      backgroundColor: "#2EC26A",
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginTop: 5,
      marginBottom: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    productPrice: {
      fontSize: 16,
      fontFamily: "Inter-Bold",
      //color: modoOscuroActivado ? darkModeText : lightModeText,
      color: "#FFFFFF",
    },
    productDescription: {
      fontSize: 14,
      textAlign: "center",
      fontFamily: "Inter",
      color: "#939393",
    },
  };
};

export default Tienda;
