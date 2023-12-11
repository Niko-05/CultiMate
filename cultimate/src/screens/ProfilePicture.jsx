import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { profilePictures } from "../utils/user";
import { CommonActions } from "@react-navigation/native";
import { changeProfilePicture } from "../api/user";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowBack from "../../assets/login/arrow_back.svg";

function ProfilePicture({ route, navigation }) {
  const { profilePictureId } = route.params;
  const [id, setId] = useState(profilePictureId);
  const insets = useSafeAreaInsets();

  const handlePress = (id) => {
    setId(id);
  };

  const handleSave = async () => {
    await changeProfilePicture(id);
    navigation.dispatch(CommonActions.goBack());
  };

  const renderAchievement = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="justify-center items-center m-[3]"
        onPress={() => handlePress(index + 1)}
      >
        {id === index + 1 ? (
          <View className="border-2 border-blue-500 rounded-md">
            <Image source={item.imageSource} className="w-[90] h-[90] m-[5]" />
          </View>
        ) : (
          <View className="border-2 border-white">
            <Image source={item.imageSource} className="w-[90] h-[90] m-[5]" />
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.bg}>
      <View style={styles.top}>
        <TouchableOpacity
          style={[styles.arrow, { marginTop: insets.top }]}
          onPress={() => navigation.navigate("navigation")}
        >
          <ArrowBack />
        </TouchableOpacity>
        <Text style={styles.formularioText}>IMAGEN DE PERFIL</Text>
      </View>
      <View style={styles.modal}>
        <View style={{ marginBottom: insets.bottom }}>
          <FlatList
            data={profilePictures}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            renderItem={renderAchievement}
            contentContainerStyle={styles.gridContainer}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => handleSave()}
          >
            <Text style={styles.saveText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  bg: {
    backgroundColor: "#09873D",
    flex: 1,
  },
  top: {
    flex: 0.2,
  },
  modal: {
    backgroundColor: "white",
    flex: 0.8,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    top: 10,
    left: 30,
  },
  formularioText: {
    color: "#FFF",
    fontFamily: "Integral CF",
    fontSize: 24,
    position: "absolute",
    bottom: 12,
    left: 30,
    lineHeight: 26,
  },
  saveButton: {
    backgroundColor: "#09873D",
    borderRadius: 50,
    padding: 10,
    margin: 10,
  },
  saveText: {
    color: "white",
    fontFamily: "Inter-Bold",
    fontSize: 22,
    textAlign: "center",
  },
});

export default ProfilePicture;
