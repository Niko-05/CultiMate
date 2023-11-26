import React, { useState, useEffect } from "react";
import { useModoOscuro } from '../context/ModoOscuroContext';
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
  darkbuttonText 
} from "../utils/colores";

const Tienda = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { modoOscuroActivado }= useModoOscuro();
  const styles = getStyles(modoOscuroActivado);

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

  return (
    <View style={styles.container}>
      {loading ? ( // Show loading indicator while fetching data
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
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
              <Text style={styles.productPrice}>{product.precio}€</Text>
              <Text style={styles.productDescription}>
                {product.descripcion}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const getStyles = (modoOscuroActivado) => {
  return {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: modoOscuroActivado ? darkModeBackground: lightModeBackground,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  productContainer: {
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: modoOscuroActivado ? darkModeText : 'lightgray',
    borderRadius: 8,
    padding: 10,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: modoOscuroActivado ? darkModeText : lightModeText,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: modoOscuroActivado ? darkModeText : lightModeText,
  },
  productDescription: {
    fontSize: 14,
    textAlign: "center",
    color: modoOscuroActivado ? darkModeText : lightModeText,
  },
}};

export default Tienda;
