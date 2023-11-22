import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const Producto = ({ route }) => {
  const { product } = route.params; // Assuming the product data is passed through navigation params

  const handleBuyOnAmazon = () => {
    // Replace 'product.amazonLink' with the actual Amazon link or the external URL to buy the product
    if (product.amazonLink) {
      Linking.openURL(product.amazonLink);
    } else {
      // Provide a fallback or alert if the link is not available
      alert('Buy link not available for this product.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.productName}>{product.name}</Text>
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <Text style={styles.productDescription}>{product.description}</Text>
      <TouchableOpacity style={styles.buyButton} onPress={handleBuyOnAmazon}>
        <Text style={styles.buyButtonText}>Buy on Amazon</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Producto;
