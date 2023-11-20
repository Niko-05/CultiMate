import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

const ConfigScreen = ({ navigation }) => {
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState("Español");
  const [notificacionesActivadas, setNotificacionesActivadas] = useState(true);
  const [modoOscuroActivado, setModoOscuroActivado] = useState(false);

  const handleProfileSettings = () => {
    navigation.navigate("Account settings");
  };

  return (
    <View className="flex-1 flex-col items-center">
      <View className="w-80 mt-6">
        <Text className="text-center font-bold">Language:</Text>

        <Picker
          selectedValue={idiomaSeleccionado}
          onValueChange={(valor) => setIdiomaSeleccionado(valor)}
        >
          <Picker.Item label="Español" value="Español" />
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Francés" value="Francés" />
        </Picker>
      </View>

      <View className="flex-row items-center mb-4 space-x-2">
        <Text className="font-bold">Notifications:</Text>
        <Switch
          value={notificacionesActivadas}
          onValueChange={() =>
            setNotificacionesActivadas(!notificacionesActivadas)
          }
        />
      </View>
      <View className="flex-row items-center mb-4 space-x-2">
        <Text className="font-bold">Dark mode:</Text>
        <Switch
          value={modoOscuroActivado}
          onValueChange={() => setModoOscuroActivado(!modoOscuroActivado)}
        />
      </View>
      <View>
        <TouchableOpacity
          className="bg-slate-400 p-4 rounded-md"
          onPress={() => handleProfileSettings()}
        >
          <Text className="font-bold">Profile settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfigScreen;
