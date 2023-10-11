import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation/navigation';
import LoginScreen from './src/screens/login/loginScreen';

export default function App() {
  return (
    <LoginScreen />
    // <Navigation/>
  );
}
