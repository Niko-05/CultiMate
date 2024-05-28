import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Image } from "react-native";

import ForosScreen from "../screens/Foro/ForosScreen";
import newPlant from "../screens/NewPlant";
import user from "../screens/User";
import HuertoSimulado from "../screens/huertoSimulado";
import Tienda from "../screens/tienda";
import Recetas from "../screens/recetas";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

import ActiveHuerto from "../../assets/iconosSVG/IconoHuerto_Relleno.svg"
import InactiveHuerto from "../../assets/iconosSVG/IconoHuerto.svg"
import ActiveUser from "../../assets/iconosSVG/IconoPerfil_Relleno.svg"
import InactiveUser from "../../assets/iconosSVG/IconoPerfil.svg"
import ActivePlants from "../../assets/iconosSVG/IconoPlantas_Relleno.svg"
import InactivePlants from "../../assets/iconosSVG/IconoPlantas.svg"
import ActiveShop from "../../assets/iconosSVG/IconoTienda_Relleno.svg"
import InactiveShop from "../../assets/iconosSVG/IconoTienda.svg"

const Tab = createBottomTabNavigator();

function MyTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Huerto"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "android" ? insets.bottom + 10 : insets.bottom,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#09873D",
          borderRadius: 15,
          height: 50,
          paddingBottom: 5,
          ...styles.shadow,
        },
      }}
    >
      
      <Tab.Screen
        name="Huerto"
        component={HuertoSimulado /*GuiasPlantado*/}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? <ActiveHuerto width={24} height={24} /> : <InactiveHuerto width={24} height={24} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Nueva Planta"
        component={newPlant}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? <ActivePlants width={24} height={24} /> : <InactivePlants width={24} height={24} />
          ),
          headerTintColor: "green",
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Foro"
        component={ForosScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ?
              <View>
                <Image
                  source={require("../../assets/iconosSVG/foro_relleno.png")}
                  resizeMode="contain"
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: "#FFFFFF",
                  }}
                />
              </View>
            :
              <View>
                <Image
                  source={require("../../assets/iconosSVG/foro.png")}
                  resizeMode="contain"
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: "#FFFFFF",
                  }}
                />
              </View>

          ),
          headerShown: false,
        }}
      />
      
      <Tab.Screen
        name="Tienda"
        component={Tienda}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? <ActiveShop width={24} height={24} /> : <InactiveShop width={24} height={24} />
          ),

          headerTintColor: "green",
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Recetas"
        component={Recetas}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ?
              <View>
                <Image
                  source={require("../../assets/iconosSVG/recetas_Relleno.png")}
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,
                    tintColor: "#FFFFFF",
                  }}
                />
              </View>
            :
              <View>
                <Image
                  source={require("../../assets/iconosSVG/recetas.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "#FFFFFF",
                  }}
                />
              </View>
          ),
          headerShown: false,
          headerTintColor: "green",
        }}
      />

      <Tab.Screen
        name="Usuarios"
        component={user}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? <ActiveUser width={24} height={24} /> : <InactiveUser width={24} height={24} />
          ),
          headerShown: false,
          headerTintColor: "green",
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return <MyTabs />;
}

//color barra #09873D

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#036925",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
