import { createStackNavigator } from "@react-navigation/stack";
import Infoplanta from "../screens/Infoplanta";
import Navigation from "./Navigation";
import GuiaPlantado from "../screens/GuiaPlantado";
import RegisterScreen from "../screens/login/RegisterScreen";
import LoginScreen from "../screens/login/LoginScreen";
import GuiasPlantado from "../screens/GuiasPlantado";
import ConfigScreen from "../screens/ConfigScreen";
import AccountSettingsScreen from "../screens/AccountSettings";
import ProfilePicture from "../screens/ProfilePicture";

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
      <Stack.Screen name="Settings" component={ConfigScreen} />
      <Stack.Screen name="Account settings" component={AccountSettingsScreen} />
      <Stack.Screen name="Profile picture" component={ProfilePicture} />
      <Stack.Screen name="Infoplanta" component={Infoplanta} />
      <Stack.Screen name="GuiaPlantado" component={GuiaPlantado} />
      <Stack.Screen name="GuiasPlantado" component={GuiasPlantado} />
    </Stack.Navigator>
  );
};
export default Ventanas;
