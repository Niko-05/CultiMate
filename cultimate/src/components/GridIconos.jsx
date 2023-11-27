import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

const GridIconos = ({ elements }) => {
  console.log("asgjhdsajkghkjasdhgkjasd" + elements);

  const renderAchievement = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.achievementContainer}>
        <Text style={{ width: 100, height: 100, margin: 5 }}>{item.nombre}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={elements}
      keyExtractor={(item) => item.id_agrupacion.toString()} // Utiliza id_agrupacion como clave única
      numColumns={3}
      renderItem={renderAchievement}
      contentContainerStyle={styles.gridContainer}
    />
  );
};

const styles = StyleSheet.create({
  achievementContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
  },
  gridContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default GridIconos;