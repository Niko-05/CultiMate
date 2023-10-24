import React from "react";
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Infoplanta = () => {
  const route = useRoute();
  const { id, data } = route.params;
  const item = data.find((item) => item.id === id);
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Elemento no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.nombre}</Text>
        <View style={styles.roundedContainer}>
          <Image source={item.Image} style={styles.image} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="format-list-bulleted" size={24} color="gray" />
          <Text style={styles.infoText}>Descripción: {item.Descripcion}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="brightness-auto" size={24} color="gray" />
          <Text style={styles.infoText}>
            Dificultad de plantado: {item.DificultadPlantado}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="leaf" size={24} color="gray" />
          <Text style={styles.infoText}>Tipo: {item.Tipo}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="calendar" size={24} color="gray" />
          <Text style={styles.infoText}>
            Estación recomendada: {item.EstacionRecomendada}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="tools" size={24} color="gray" />
          <Text style={styles.infoText}>
            Funcionalidad: {item.FuncionalidadPlanta}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="calendar-range" size={24} color="gray" />
          <Text style={styles.infoText}>
            Inicio de plantado: {item.IniFechaPlantado}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="calendar-range" size={24} color="gray" />
          <Text style={styles.infoText}>
            Final de plantado: {item.FinFechaPlantado}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="water" size={24} color="gray" />
          <Text style={styles.infoText}>
            Periodicidad de riego: {item.PeriodicidadRegado} días
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="weather-sunny" size={24} color="gray" />
          <Text style={styles.infoText}>
            Condiciones luminosas: {item.CondLuminosas}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="thermometer" size={24} color="gray" />
          <Text style={styles.infoText}>
            Condiciones de temperatura: {item.CondTemperatura}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="flower" size={24} color="gray" />
          <Text style={styles.infoText}>
            Tamaño de maceta: {item.TamMaceta} litros
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="fruit-cherries" size={24} color="gray" />
          <Text style={styles.infoText}>Categoría: fruta</Text>
        </View>
      </View>

      <Text style={styles.gCalendarFont}>Growing calendar</Text>

      <View style = {{marginHorizontal: 10}}>
        <View style={styles.calendarCont}>
          <Text style={styles.month}>JAN</Text>
          <Text style={styles.month}>FEB</Text>
          <Text style={styles.month}>MAR</Text>
          <Text style={styles.month}>APR</Text>
          <Text style={styles.month}>MAY</Text>
          <Text style={styles.month}>JUN</Text>
          <Text style={styles.month}>JUL</Text>
          <Text style={styles.month}>AUG</Text>
          <Text style={styles.month}>SEP</Text>
          <Text style={styles.month}>OCT</Text>
          <Text style={styles.month}>NOV</Text>
          <Text style={styles.month}>DEC</Text>
        </View>
        <View style={styles.calendarCont}>
          {months.map((month, index) => {
            const isMonthActive =
              (item.IniFechaPlantado <= item.FinFechaPlantado &&
                index + 1 >= item.IniFechaPlantado && index + 1 <= item.FinFechaPlantado) ||
              (item.IniFechaPlantado > item.FinFechaPlantado &&
                (index + 1 >= item.IniFechaPlantado || index + 1 <= item.FinFechaPlantado));
            
            return (
              <View style={[styles.monthLine, isMonthActive ? styles.activeMonth : null]} key={month}>
                <Text> </Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  gCalendarFont: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  roundedContainer: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: "gray",
  },
  calendarCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  month: {
    flex: 1,
    textAlign: 'center',
  },
  monthLine: {
    flex: 1,
    textAlign: 'center',
  },
  activeMonth: {
    backgroundColor: 'green',
  },
});

export default Infoplanta;
