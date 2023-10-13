import { createStackNavigator } from '@react-navigation/stack';
import Infoplanta from '../screens/infoplanta';
import Navigation from './navigation';
import GuiaPlantado from '../screens/guiaPlantado';

const Stack = createStackNavigator();
const Ventanas = () =>{
  return(
    
    <Stack.Navigator initialRouteName='navigation'>
    {/* Otras pantallas */}
    <Stack.Screen name='navigation' component={Navigation}  options={{ headerShown: false }}/>
    <Stack.Screen name='Infoplanta' component={Infoplanta} />
    <Stack.Screen name='GuiaPlantado' component={GuiaPlantado} />  
      
  </Stack.Navigator>
    
  )
}
  export default  Ventanas;