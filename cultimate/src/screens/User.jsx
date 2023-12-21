import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import GridIconos from "../components/GridIconos";
import Gear from "../../assets/gear-solid.svg";
import Mas from "../../assets/gear-solid.svg";
import { getUserInfo } from "../api/user";
import { getAvatarPictureSource } from "../utils/user";
import { useIsFocused } from "@react-navigation/native";
import { useModoOscuro } from "../context/ModoOscuroContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import config from "../../config";
import Close from "../../assets/login/close.svg";
import ArrowRight from "../../assets/login/arrow_right_small.svg";

import ListaAgru from "../components/ListaAgru";
import AgruItem from "../components/AgruItem";

const User = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState([]);
  const { modoOscuroActivado } = useModoOscuro();
  const [avatarPicture, setAvatarPicture] = useState(null);

  const isFocused = useIsFocused();

  const setUserInfo = async () => {
    const userinfo = await getUserInfo();
    console.log(await userinfo);
    setUser(await userinfo);
    setAvatarPicture(getAvatarPictureSource(await userinfo.profilePictureId));
  };

  useEffect(() => {
    setUserInfo();
  }, []);

  useEffect(() => {
    isFocused && setUserInfo();
  }, [isFocused]);

  if (Object.keys(user).length === 0) {
    return (
      <View className="flex-1 content-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {/* <TouchableOpacity
          style={[styles.closeButton, { marginTop: insets.top }]}
        >
          <Close />
        </TouchableOpacity> */}
        <View style={[styles.profileImageContainer, { marginTop: insets.top }]}>
          <View style={styles.profileImageBackground}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfilePicture", {
                  profilePictureId: user.profilePictureId,
                })
              }
            >
              {avatarPicture ? (
                <Image
                  source={avatarPicture} // Ruta de la imagen
                  style={styles.profileImage}
                />
              ) : (
                <></>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.modal}>
        <Image
          style={styles.lemon}
          source={require("../../assets/login/lemon.png")}
        />
        <Image
          style={styles.carrot}
          source={require("../../assets/login/carrot.png")}
        />
        <View style={styles.names}>
          <Text style={styles.fullName}>{user.fullName}</Text>
          <Text style={styles.userName}>@{user.username}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AccountSettings")}
        >
          <Text>MIS DATOS PERSONALES</Text>
          <ArrowRight />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ConfigurationScreen")}
        >
          <Text>CONFIGURACIÓN</Text>
          <ArrowRight />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09873D",
  },
  top: {
    flex: 0.3,
  },
  modal: {
    flex: 0.7,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    left: 22,
  },
  lemon: {
    width: 141,
    height: 157,
    position: "absolute",
    bottom: "20%",
    left: -5,
  },
  carrot: {
    width: 132,
    height: 132,
    position: "absolute",
    bottom: "40%",
    right: -23,
  },
  names: {
    alignItems: "center",
    marginTop: 75,
    marginBottom: 75,
  },
  fullName: {
    color: "#000",
    fontFamily: "Integral CF",
    fontSize: 20,
    marginBottom: 6,
    lineHeight: 22,
  },
  userName: {
    color: "#939393",
    fontFamily: "Inter",
    fontSize: 14,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "80%",
    marginBottom: 20,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImageBackground: {
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    margin: 8,
  },
});

export default User;
