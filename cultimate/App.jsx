import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ventanas from "./src/navigation/Ventanas";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ModoOscuroProvider } from "./src/context/ModoOscuroContext";
import { LanguageProvider } from "./src/context/LanguageContext";

const Stack = createStackNavigator();
export default function App() {
  return (
    <LanguageProvider>
      <ModoOscuroProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Ventanas />
          </NavigationContainer>
        </SafeAreaProvider>
      </ModoOscuroProvider>
    </LanguageProvider>
  );
}
