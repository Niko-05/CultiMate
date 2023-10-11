import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import classnames from 'classnames';

const LoginScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Welcome to the HomeScreen!</Text>
    </View>
  );
}

export default LoginScreen;