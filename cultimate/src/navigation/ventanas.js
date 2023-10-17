import { createStackNavigator } from '@react-navigation/stack';
import Infoplanta from '../screens/infoplanta';
import Navigation from './navigation';
import GuiaPlantado from '../screens/guiaPlantado';
import RegisterScreen from '../screens/login/RegisterScreen';
import LoginScreen from '../screens/login/LoginScreen';

const Stack = createStackNavigator();
const Ventanas = () =>{
  return(
    
    <Stack.Navigator initialRouteName='navigation'>
    {/* Otras pantallas */}
    <Stack.Screen name='navigation' component={Navigation}  options={{ headerShown: false }}/>
    <Stack.Screen name='Infoplanta' component={Infoplanta} />
    <Stack.Screen name='GuiaPlantado' component={GuiaPlantado} />  
    <Stack.Screen name='RegisterScreen' component={GuiaPlantado} /> 
    <Stack.Screen name='LoginScreen' component={LoginScreen} />
      
  </Stack.Navigator>
    
  )
}
  export default  Ventanas;