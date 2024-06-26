import { createStackNavigator } from "@react-navigation/stack";
import Infoplanta from "../screens/Infoplanta";
import Navigation from "./Navigation";
import GuiaPlantado from "../screens/GuiaPlantado";
import RegisterScreen1 from "../screens/login/RegisterScreen1";
import RegisterScreen2 from "../screens/login/RegisterScreen2";
import LoginScreen from "../screens/login/LoginScreen";
import GuiasPlantado from "../screens/GuiasPlantado";
import ConfigScreen from "../screens/ConfigScreen";
import AccountSettingsScreen from "../screens/AccountSettings";
import ProfilePicture from "../screens/ProfilePicture";
import PreguntasFrecuentes from "../screens/PreguntasFrecuentes";
import ForoPlantaScreen from "../screens/Foro/ForoPlantaScreen";
import ForosScreen from "../screens/Foro/ForosScreen";
import NewPublicationModal from "../screens/Foro/NewPublicationModal";
import NewRespuestaModal from "../screens/Foro/NewRespuestaModal";
import newPlant from "../screens/NewPlant";
import CrearAgrupaciones from "../screens/CrearAgrupaciones";
import ListaPlantadas from "../screens/ListaPlantadas";
import Configuration from "../screens/Configuration";
import PublicationScreen from "../screens/Foro/PublicationScreen";
import Receta from "../screens/receta";

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
        name="RegisterScreen1"
        component={RegisterScreen1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen2"
        component={RegisterScreen2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="navigation"
        component={Navigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="newPlant"
        component={newPlant}
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen name="Settings" component={ConfigScreen} />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="ConfigurationScreen"
        component={Configuration}
        options={{ headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#fff",        
          }}
      />
      <Stack.Screen
        name="ProfilePicture"
        component={ProfilePicture}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Infoplanta"
        component={Infoplanta}
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />

      <Stack.Screen
        name="Receta"
        component={Receta}
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      /> 

      <Stack.Screen 
        name="GuiaPlantado" 
        component={GuiaPlantado}
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#fff",
        }}
        />
      <Stack.Screen name="GuiasPlantado" component={GuiasPlantado} />
      <Stack.Screen
        name="PreguntasFrecuentes"
        component={PreguntasFrecuentes}
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#fff",  
        }}
      />
      <Stack.Screen name="CrearAgrupaciones" component={CrearAgrupaciones} />
      <Stack.Screen name="NewPublicationModal" component={NewPublicationModal} options={{ headerShown: false}} />
      <Stack.Screen name="NewRespuestaModal" component={NewRespuestaModal} options={{headerShown: false}}/>
      <Stack.Screen name="PublicationScreen" component={PublicationScreen} options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#fff",
        }}/>
      <Stack.Screen name="ForosScreen" component={ForosScreen} />
      <Stack.Screen name="ForoPlantaScreen" component={ForoPlantaScreen} options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#fff",
        }}/>
      <Stack.Screen name="ListaPlantadas" component={ListaPlantadas} />
    </Stack.Navigator>
  );
};
export default Ventanas;
