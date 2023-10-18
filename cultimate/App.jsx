import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ventanas from "./src/navigation/Ventanas";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Ventanas />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
