import React, { useState } from 'react';
import { View, Text, Picker, Switch } from 'react-native';

const ConfigScreen = () => {
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState('Español');
  const [notificacionesActivadas, setNotificacionesActivadas] = useState(true);
  const [modoOscuroActivado, setModoOscuroActivado] = useState(false);

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Configuración
      </Text>
      
      <View style={{ marginBottom: 10 }}>
        <Text>Idioma:</Text>

        <Picker
          selectedValue={idiomaSeleccionado}
          onValueChange={(valor) => setIdiomaSeleccionado(valor)}
        >
          <Picker.Item label="Español" value="Español" />
          <Picker.Item label="Inglés" value="Inglés" />
          <Picker.Item label="Francés" value="Francés" />
        </Picker>
        
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text>Notificaciones:</Text>
        <Switch
          value={notificacionesActivadas}
          onValueChange={() => setNotificacionesActivadas(!notificacionesActivadas)}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Modo Oscuro:</Text>
        <Switch
          value={modoOscuroActivado}
          onValueChange={() => setModoOscuroActivado(!modoOscuroActivado)}
        />
      </View>
    </View>
  );
};

export default ConfigScreen;
