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
          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            margin: 20,
            borderRadius: 20,
            padding: 30,
            elevation: 5,
            width: Dimensions.get("window").width - 50,
          }}
          className="flex-1 items-center"
        >
          <Pressable
            onPress={closeModal}
            style={{
              backgroundColor: "lightgreen",
              padding: 10,
              borderRadius: 20,
              elevation: 2,
            }}
            className="absolute left-3 top-6"
          >
            <Text>Back</Text>
          </Pressable>

          <Text style={styles.titleText}>Surgencias</Text>
          <View className="flex-1 justify-center">
            <View className="space-y-2 mb-6">
              <Text>Nombre de la planta</Text>
              <TextInput style={styles.input} placeholder="Nombre" />
            </View>
            <View className="space-y-2 mb-6">
              <Text>Descripción</Text>
              <TextInput
                style={styles.input}
                placeholder="Max 30 caracteres."
              />
            </View>
            <View className="space-y-2 mb-6 items-center">
              <Pressable
                onPress={closeModal}
                style={{
                  backgroundColor: "lightgreen",
                  padding: 10,
                  borderRadius: 20,
                  elevation: 2,
                }}
                className="px-6"
              >
                <Text>Enviar</Text>
              </Pressable>
            </View>
          </View>
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
