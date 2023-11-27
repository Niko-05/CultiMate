import { createStackNavigator } from "@react-navigation/stack";
import Infoplanta from "../screens/Infoplanta";
import Navigation from "./Navigation";
import GuiaPlantado from "../screens/GuiaPlantado";
import RegisterScreen from "../screens/login/RegisterScreen";
import LoginScreen from "../screens/login/LoginScreen";
import GuiasPlantado from "../screens/GuiasPlantado";
import HuertoSimulado from "../screens/huertoSimulado";
import ConfigScreen from "../screens/ConfigScreen";
import AccountSettingsScreen from "../screens/AccountSettings";
import ProfilePicture from "../screens/ProfilePicture";
import PreguntasFrecuentes from "../screens/PreguntasFrecuentes";
import newPlant from "../screens/NewPlant";
import CrearAgrupaciones from "../screens/CrearAgrupaciones";
import ListaPlantadas from "../screens/ListaPlantadas";
const Stack = createStackNavigator();
const Ventanas = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      {/* Otras pantallas */}
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="navigation"
        component={Navigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="newPlant" component={newPlant}/>
      <Stack.Screen name="Settings" component={ConfigScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
      <Stack.Screen name="Profilepicture" component={ProfilePicture} />
      <Stack.Screen name="Infoplanta" component={Infoplanta} />
      <Stack.Screen name="GuiaPlantado" component={GuiaPlantado} />
      <Stack.Screen name="GuiasPlantado" component={GuiasPlantado} />
      <Stack.Screen name="PreguntasFrecuentes" component={PreguntasFrecuentes} />
        <Stack.Screen name="CrearAgrupaciones" component={CrearAgrupaciones} />
        <Stack.Screen name="ListaPlantadas" component={ListaPlantadas} />
    </Stack.Navigator>
  );
};
export default Ventanas;
