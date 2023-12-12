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

import { useNavigation } from '@react-navigation/native';

const Tienda = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { modoOscuroActivado }= useModoOscuro();
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


  useEffect(() => {
    // Set navigation options when the component is focused
    const setNavigationOptions = () => {
      navigation.setOptions({
        headerTitle: 'TIENDA',
        headerTitleStyle: {
          color: '#FFF',
          fontSize: 22,
          fontFamily: "Inter-Bold",
        },
        headerStyle: {
          backgroundColor: '#09873D',
          height: 100,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
        headerRight: () => (
          <Image
            source={require('../../assets/BROCOLI_LINEA_BLANCA.png')}
            style={{ width: 100, height: 100, marginRight: 10 }} // Adjust image size and spacing
          />
        ),
      });
    };
    const unsubscribeFocus = navigation.addListener('focus', setNavigationOptions);
    return unsubscribeFocus;
  }, [navigation]);




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
              <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>{product.precio}€</Text>
              </View>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollView: {
    paddingTop: 10, 
    paddingHorizontal: 10,
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
  },
  productContainer: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: modoOscuroActivado ? darkModeText : 'lightgray',
    borderRadius: 10, 
    padding: 10,
    backgroundColor: '#D1EAD0', 
  },
  productImage: {
    width: '100%', // Adjust image size as needed
    aspectRatio: 1,  // Adjust image size as needed
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    marginTop: 5,
    marginBottom: 5,
    color: modoOscuroActivado ? darkModeText : lightModeText,
  },
  priceContainer: {
    backgroundColor: '#2EC26A',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    marginBottom: 5,
    //color: modoOscuroActivado ? darkModeText : lightModeText,
    color: '#FFFFFF',
  },
  productDescription: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Inter",
    color: modoOscuroActivado ? darkModeText : lightModeText,
  },
}};

export default Tienda;
