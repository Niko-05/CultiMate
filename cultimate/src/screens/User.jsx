import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button
} from "react-native";
import GridIconos from "../components/GridIconos";
import Gear from "../../assets/gear-solid.svg";
import Mas from "../../assets/gear-solid.svg"
import { getUserInfo } from "../api/user";
import { getProfilePictureSource } from "../utils/user";
import { useIsFocused } from "@react-navigation/native";
import config from "../../config";

import ListaAgru from "../components/ListaAgru";
const User = ({ navigation }) => {
  const [user, setUser] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);

  const elements = [
    { id: 1, title: "balcon", imageSource: require("../../assets/Fresa.png") },
    { id: 2, title: "cuarto", imageSource: require("../../assets/mora.png") },
    {
      id: 3,
      title: "cocina",
      imageSource: require("../../assets/tomate.png"),
    },
    {
      id: 4,
      title: "terraza",
      imageSource: require("../../assets/pepino.png"),
    },
    {
      id: 5,
      title: "Comedor",
      imageSource: require("../../assets/pimientos.png"),
    },
    { id: 6, title: "Agru6", imageSource: require("../../assets/Fresa.png") },
    { id: 7, title: "Livingroom", imageSource: require("../../assets/mora.png") },
    // Puedes agregar más logros aquí
  ];


  const isFocused = useIsFocused();

  const setUserInfo = async () => {
    const userinfo = await getUserInfo();
    console.log(await userinfo);
    setUser(await userinfo);
    setProfilePicture(getProfilePictureSource(await userinfo.profilePictureId));
  };
  const setElementsInfo = async () => {
    try{
      const users = await getUserInfo();
      const api_call = await fetch(
      `${config.API}/agrupaciones/agru?id=${encodeURIComponent(
        users.id
      )}`,
      { method: "GET" }
    );
   const result = await api_call.json();
    console.log(await result);
    elements = await result 
    console.log("elements")
    console.log(elements)
    
 } catch (e) {
    console.error(e);
    Alert.alert("Network error");
  }
  };
  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  useEffect(() => {
    setUserInfo();
    setElementsInfo();
  }, []);

  useEffect(() => {
    isFocused && setUserInfo();
  }, [isFocused]);

  return (
    <View style={styles.container}>
                  
      {Object.keys(user) !== 0 ? (
        <>
          <View style={styles.centeredView}>
            <View style={styles.profileImageBackground}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile picture", {
                    profilePictureId: user.profilePictureId,
                  })
                }
              >
                {profilePicture ? (
                  <Image
                    source={profilePicture} // Ruta de la imagen
                    style={styles.profileImage}
                  />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
        
            <TouchableOpacity
              className="w-7 h-7 absolute left-3 top-3"
              onPress={() => handleSettings()}
            >
              <Gear />
            </TouchableOpacity>
            <Text style={styles.userName}>{user.username}</Text>
            <Text style={styles.userName}>{user.email}</Text>
          </View>
          <View style={styles.centeredView}>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>Agrupaciones</Text>
              <TouchableOpacity
              className="w-7 h-7 absolute right-3 top-3"
              onPress={() => {navigation.navigate("CrearAgrupaciones", {
                user: user,
              })}}
            >
              <Gear />
            </TouchableOpacity>
            </View>
            <ListaAgru data={elements} />
          </View>
        </>
      ) : (
        <View className="flex-1 content-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 10,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
  },
  profileImageBackground: {
    borderRadius: 100,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    margin: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  containerTitle: {
    // flexDirection: 'column', // Puedes quitar esta línea si quieres que sea una columna
    textAlign: "left",
    width: "100%",
    paddingTop: 10,
  },
  configButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },

  configIcon: {
    width: 30,
    height: 30,
  },
  // ... Otros estilos
});

export default User;
