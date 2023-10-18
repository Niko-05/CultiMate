import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { GuiaPlantadoStyles } from "../styles/clase.js";
import { useRoute } from "@react-navigation/native";

const GuiaPlantado = () => {
  const route = useRoute();
  const { id, data } = route.params;
  const item = data.find((item) => item.id === id);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Elemento no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={GuiaPlantadoStyles.pagina}>
      <View style={GuiaPlantadoStyles.plantInfoContainer}>
        <Text style={GuiaPlantadoStyles.titulo}>Planta: </Text>
        <Text style={GuiaPlantadoStyles.infoText}>{item.nombre}</Text>
      </View>

      <View style={GuiaPlantadoStyles.plantInfoContainer}>
        <Text style={GuiaPlantadoStyles.titulo}>Fecha de Plantado: </Text>
        <Text style={GuiaPlantadoStyles.infoText}>{item.FechaPlantado}</Text>
      </View>

      <View style={GuiaPlantadoStyles.container2}>
        <Image
          style={GuiaPlantadoStyles.image}
          source={require("../../assets/regar.png")}
        />
        <Text style={GuiaPlantadoStyles.infoText}>
          Regar {item.PeriodicidadRegado} veces al día
        </Text>
      </View>

      <View style={GuiaPlantadoStyles.container2}>
        <Image
          style={GuiaPlantadoStyles.image}
          source={require("../../assets/termometro.png")}
        />
        <Text style={GuiaPlantadoStyles.infoText}>{item.CondTemperatura}</Text>
      </View>

      <View>
        <View style={GuiaPlantadoStyles.plantInfoContainer}>
          <Text style={GuiaPlantadoStyles.titulo}>Paso: </Text>
          <Text style={GuiaPlantadoStyles.infoText}>{item.Paso}</Text>
        </View>

        <View style={GuiaPlantadoStyles.plantInfoContainer}>
          <Text style={GuiaPlantadoStyles.titulo}>Detalles: </Text>
          <Text style={GuiaPlantadoStyles.infoText}>{item.Detalles}</Text>
        </View>

        <View style={GuiaPlantadoStyles.plantInfoContainer}>
          <Text style={GuiaPlantadoStyles.titulo}>Estado de la Planta: </Text>
          <Text style={GuiaPlantadoStyles.infoText}>{item.Estado}</Text>
        </View>

        <View style={GuiaPlantadoStyles.separador} />

        <View style={GuiaPlantadoStyles.plantInfoContainer}>
          <View style={GuiaPlantadoStyles.fondobutton}>
            <TouchableOpacity style={GuiaPlantadoStyles.button}>
              <Text style={GuiaPlantadoStyles.textbutton}>
                ¿Qué hago ahora?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default GuiaPlantado;
