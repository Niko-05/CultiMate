module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest",
    },
    transformIgnorePatterns: [
      "node_modules/(?!(expo-secure-store|react-native|expo(nent)?/.*|@react-navigation/.*)/)"
    ],
    // Otras configuraciones que podrías necesitar...
  };
  