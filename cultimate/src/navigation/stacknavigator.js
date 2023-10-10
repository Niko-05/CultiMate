import { createStackNavigator } from '@react-navigation/stack';
import NewPlant from '../screens/newPlant';
import Infoplanta from '../screens/infoplanta';
import Navigation from './navigation';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
const ButtonTabs = () =>{
  return(
    
    <Stack.Navigator initialRouteName='newPlant'
    screenOptions={{
        headerShown: false}}>
          <Stack.Screen 
            name = 'newPlant'
            component={NewPlant}
          />
      <Stack.Screen
        name='Infoplanta' 
        component={Infoplanta} 
       />
    </Stack.Navigator>
    
  )
}
  export default ButtonTabs;