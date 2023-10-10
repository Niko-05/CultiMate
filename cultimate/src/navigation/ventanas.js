import { createStackNavigator } from '@react-navigation/stack';
import NewPlant from '../screens/newPlant';
import Infoplanta from '../screens/infoplanta';
import Navigation from './navigation';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
const Ventanas = () =>{
  return(
    
    <Stack.Navigator initialRouteName='navigation'>
    {/* Otras pantallas */}
    <Stack.Screen name='navigation' component={Navigation} />
    <Stack.Screen name='Infoplanta' component={Infoplanta} />
  </Stack.Navigator>
    
  )
}
  export default  Ventanas;