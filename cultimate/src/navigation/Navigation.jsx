import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
//screens
import ForosScreen from "../screens/Foro/ForosScreen";
import newPlant from "../screens/NewPlant";
import user from "../screens/User";
import GuiasPlantado from "../screens/GuiasPlantado";
import HuertoSimulado from "../screens/huertoSimulado";
import Tienda from "../screens/tienda";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom,
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
        name="Usuario"
        component={user}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../assets/usuario.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FFC300" : "#FFFFFF",
                }}
              />
            </View>
          ),
          headerShown: false,
          headerTintColor: "green",
        }}
      />

      <Tab.Screen
        name="Foro"
        component={ForosScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../assets/foro.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FFC300" : "#FFFFFF",
                }}
              />
            </View>
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Nueva Planta"
        component={newPlant}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../assets/nueva_planta.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FFC300" : "#FFFFFF",
                }}
              />
            </View>
          ),
          headerTintColor: "green",
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Tienda"
        component={Tienda}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../assets/tienda.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FFC300" : "#FFFFFF",
                }}
              />
            </View>
          ),
          
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Guias de Plantado"
        component={HuertoSimulado /*GuiasPlantado*/}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../assets/huerto.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FFC300" : "#FFFFFF",
                }}
              />
            </View>
          ),
          headerShown: false,
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
