import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

const GridIconos = ({ elements }) => {
  const renderAchievement = ({ item, index }) => {
    if (index < 5) {
      return (
        <TouchableOpacity style={styles.achievementContainer}   onPress={() =>
          navigation.navigate("ListaPlantadas", {
            profilePictureId: user.profilePictureId,
          })}>
          <Image
            source={item.imageSource}
            style={{
              width: 100,
              height: 100,
              margin: 5,
            }}
          />
          <Text style={styles.achievementTitle}>{item.title}</Text>
        </TouchableOpacity>
      );
    } else if (index === 5) {
      const remainingCount = elements.length - 5;
      return (
        <View style={[styles.achievementContainer, styles.ContadorRestoLogros]}>
          <Text style={styles.TextoContadorRestoLogros}>+{remainingCount}</Text>
        </View>
      );
    }
  };

  return (
    <FlatList
      data={elements}
      keyExtractor={(item) => item.id.toString()}
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
  achievementTitle: {
    // Estilos del título si es necesario
  },
  gridContainer: {
    flexGrow: 1,
  },
  ContadorRestoLogros: {
    backgroundColor: "lightgrey",
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  TextoContadorRestoLogros: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default GridIconos;