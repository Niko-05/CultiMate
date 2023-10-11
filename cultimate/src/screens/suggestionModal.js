import React from "react";
import {
  Modal,
  Text,
  View,
  Pressable,
  Dimensions,
  TextInput,
  StyleSheet,
} from "react-native";

export const SuggestionModal = ({ isVisible, closeModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 22,
          backgroundColor: "trasnparent",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            margin: 20,
            borderRadius: 20,
            padding: 30,
            elevation: 5,
            width: Dimensions.get("window").width - 50,
          }}
        >
          <Text style={styles.titleText}>Surgencias</Text>
          <Text>Nombre de la planta</Text>
          <TextInput style={styles.input} placeholder="Nombre" />
          <Text>Descripción</Text>
          <TextInput style={styles.input} placeholder="Max 30 caracteres." />
          <Pressable
            onPress={closeModal}
            style={{
              backgroundColor: "lightgreen",
              padding: 10,
              borderRadius: 20,
              elevation: 2,
            }}
          >
            <Text>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
