import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//screens
import ForosScreen from "../screens/Foro/ForosScreen";
import newPlant from "../screens/NewPlant";
import user from "../screens/User";
import GuiasPlantado from "../screens/GuiasPlantado";
import HuertoSimulado from "../screens/huertoSimulado";
import Tienda from "../screens/tienda";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "green",
      }}
    >
      <Tab.Screen
        name="Usuario"
        component={user}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),

          headerTintColor: "green",
        }}
      />
      <Tab.Screen
        name="Foro"
        component={ForosScreen}
        options={{
          tabBarLabel: "Foro",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="forum" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Nueva Planta"
        component={newPlant}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="flower" size={size} color={color} />
          ),
          headerTintColor: "green",
        }}
      />

      <Tab.Screen
        name="Tienda"
        component={Tienda}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={size} />
          ),

          headerTintColor: "green",
        }}
      />

      <Tab.Screen
        name="Guias de Plantado"
        component={HuertoSimulado/*GuiasPlantado*/}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-checks"
              color={color}
              size={size}
            />
          ),

          headerTintColor: "green",
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return <MyTabs />;
}
