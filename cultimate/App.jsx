import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ventanas from "./src/navigation/Ventanas";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ModoOscuroProvider } from "./src/context/ModoOscuroContext";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    "Integral CF": require("./assets/fonts/Integralcf-Medium.otf"),
    Inter: require("./assets/fonts/Inter-Medium.otf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.otf"),
  });

  if (!fontsLoaded) {
    return (
      <View className="items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ModoOscuroProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Ventanas />
        </NavigationContainer>
      </SafeAreaProvider>
    </ModoOscuroProvider>
  );
}
