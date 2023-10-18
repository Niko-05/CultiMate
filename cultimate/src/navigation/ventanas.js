import { createStackNavigator } from '@react-navigation/stack';
import Infoplanta from '../screens/infoplanta';
import Navigation from './navigation';
import GuiaPlantado from '../screens/guiaPlantado';
import RegisterScreen from '../screens/login/RegisterScreen';
import LoginScreen from '../screens/login/LoginScreen';
import GuiasPlantado from '../screens/guiasPlantado';

const Stack = createStackNavigator();
const Ventanas = () =>{
  return(
    
    <Stack.Navigator initialRouteName='LoginScreen'>
    {/* Otras pantallas */}
    <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }}/>
    <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }}/>
    <Stack.Screen name='navigation' component={Navigation}  options={{ headerShown: false }}/>
    <Stack.Screen name='Infoplanta' component={Infoplanta} />
    <Stack.Screen name='GuiaPlantado' component={GuiaPlantado} />
    <Stack.Screen name='GuiasPlantado' component={GuiasPlantado} />  
      
  </Stack.Navigator>
    
  )
}
  export default  Ventanas;