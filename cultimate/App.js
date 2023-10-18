import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation/navigation';
import HomeScreen from './src/screens/homescreen';
import ButtonTabs from './src/navigation/ventanas';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Infoplanta from './src/screens/infoplanta';
import Ventanas from './src/navigation/ventanas';
import LoginScreen from './src/screens/login/LoginScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RegisterScreen from './src/screens/login/RegisterScreen';

const Stack = createStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Ventanas/>
      </NavigationContainer>
    </SafeAreaProvider>
   
    );
}
