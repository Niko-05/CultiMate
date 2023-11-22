import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Tienda = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.API}/products`);
        const data = await response.json();
        setProducts(data); // Set the fetched product data
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? ( // Show loading indicator while fetching data
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productContainer}>
              <Image source={require(product.imagen)} style={styles.productImage} />
              <Text style={styles.productName}>{product.nombre}</Text>
              <Text style={styles.productPrice}>${product.precio}</Text>
              <Text style={styles.productDescription}>{product.descripcion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  productContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    padding: 10,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Tienda;
