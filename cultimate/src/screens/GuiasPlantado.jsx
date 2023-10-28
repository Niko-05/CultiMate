import React from "react";
import ListaPlantaSinFiltro from "../components/ListaPlantaSinFiltro";
import { SafeAreaView, Text } from "react-native";

const GuiasPlantado = ({ navigation }) => {
  const data = [
    {
      id: 1,
      nombre: "Fresa",
      Image: require("../../assets/Fresa.png"),
      FechaPlantado: "17/11/2022",
      PeriodicidadRegado: 3,
      CondTemperatura: "15ºC-25ºC",
      TamMaceta: "Mediana",
      Paso: 3,
      Detalles: "Cuidar brotes y aplicar fertilizante",
      Estado: "En desarrollo",
      EstacionRecomendada: "Primavera"
    },
    {
      id: 2,
      nombre: "Mora",
      Image: require("../../assets/mora.png"),
      FechaPlantado: "27/10/2023",
      PeriodicidadRegado: 2,
      CondTemperatura: "20ºC-30ºC",
      TamMaceta: "Pequeña",
      Paso: 1,
      Detalles: "Proporcionar soporte vertical y riego moderado",
      Estado: "Creciendo fuerte",
      EstacionRecomendada: "Otoño"
    },
    {
      id: 3,
      nombre: "Tomate",
      Image: require("../../assets/tomate.png"),
      FechaPlantado: "22/10/2021",
      PeriodicidadRegado: 4,
      CondTemperatura: "20ºC-30ºC",
      TamMaceta: "Pequeña",
      Paso: 4,
      Detalles: "Podar para un crecimiento óptimo",
      Estado: "En floración",
      EstacionRecomendada: "Verano",
    },
    {
      id: 4,
      nombre: "Pepino",
      Image: require("../../assets/pepino.png"),
      FechaPlantado: "21/05/2023",
      PeriodicidadRegado: 3,
      CondTemperatura: "18ºC-28ºC",
      TamMaceta: "Pequeña",
      Paso: 2,
      Detalles: "Fomentar ramificación y proporcionar sombra",
      Estado: "Desarrollando frutos",
      EstacionRecomendada: "Verano"
    },
    {
      id: 5,
      nombre: "Pimiento",
      Image: require("../../assets/pimientos.png"),
      FechaPlantado: "07/01/2023",
      PeriodicidadRegado: 5,
      CondTemperatura: "20ºC-30ºC",
      TamMaceta: "Grande",
      Paso: 5,
      Detalles: "Asegurar polinización y aumentar riego",
      Estado: "Madurando frutos",
      EstacionRecomendada: "Verano"
    },
    {
      id: 6,
      nombre: "Lechuga",
      Image: require("../../assets/lechuga.png"),
      FechaPlantado: "15/08/2023",
      PeriodicidadRegado: 2,
      CondTemperatura: "10ºC-22ºC",
      TamMaceta: "Pequeña",
      Paso: 3,
      Detalles: "Cosechar hojas exteriores y mantener humedad",
      Estado: "Listo para cosecha",
      EstacionRecomendada: "Primavera"
    },
    {
      id: 7,
      nombre: "Cebolla",
      Image: require("../../assets/cebolla.png"),
      FechaPlantado: "10/03/2022",
      PeriodicidadRegado: 2,
      CondTemperatura: "10ºC-25ºC",
      TamMaceta: "Mediana",
      Paso: 3,
      Detalles: "Cuidar del bulbo y proporcionar riego moderado",
      Estado: "Formando bulbos",
      EstacionRecomendada: "Invierno"
    },
    {
      id: 8,
      nombre: "Zanahoria",
      Image: require("../../assets/zanahoria.png"),
      FechaPlantado: "05/04/2023",
      PeriodicidadRegado: 3,
      CondTemperatura: "15ºC-24ºC",
      TamMaceta: "Pequeña",
      Paso: 2,
      Detalles: "Aflojar el suelo y proporcionar riego regular",
      Estado: "Desarrollando raíces",
      EstacionRecomendada: "Otoño"
    },
    {
      id: 9,
      nombre: "Espinaca",
      Image: require("../../assets/espinaca.png"),
      FechaPlantado: "12/09/2022",
      PeriodicidadRegado: 2,
      CondTemperatura: "10ºC-25ºC",
      TamMaceta: "Pequeña",
      Paso: 3,
      Detalles: "Cosechar hojas y mantener suelo húmedo",
      Estado: "En crecimiento continuo",
      EstacionRecomendada: "Otoño"
    },
    {
      id: 10,
      nombre: "Calabacín",
      Image: require("../../assets/calabacin.png"),
      FechaPlantado: "20/06/2023",
      PeriodicidadRegado: 4,
      CondTemperatura: "18ºC-30ºC",
      TamMaceta: "Mediana",
      Paso: 4,
      Detalles: "Podar para un crecimiento controlado y aumentar riego",
      Estado: "Produciendo frutos",
      EstacionRecomendada: "Primavera"
    },
    {
      id: 12,
      nombre: "Brócoli",
      Image: require("../../assets/brocoli.png"),
      FechaPlantado: "08/11/2022",
      PeriodicidadRegado: 3,
      CondTemperatura: "15ºC-25ºC",
      TamMaceta: "Mediana",
      Paso: 4,
      Detalles: "Cuidar de los brotes y aplicar fertilizante",
      Estado: "Formando cabezas",
      EstacionRecomendada: "Otoño"
    },
    {
      id: 11,
      nombre: "Frambuesa",
      Image: require("../../assets/frambuesa.png"),
      FechaPlantado: "15/03/2022",
      PeriodicidadRegado: 2,
      CondTemperatura: "15ºC-30ºC",
      TamMaceta: "Grande",
      Paso: 3,
      Detalles: "Proporcionar soporte vertical y riego moderado",
      Estado: "Cosechando frutos",
      EstacionRecomendada: "Primavera"
    },
    {
      id: 13,
      nombre: "Limón",
      Image: require("../../assets/limon.png"),
      FechaPlantado: "10/04/2023",
      PeriodicidadRegado: 3,
      CondTemperatura: "20ºC-30ºC",
      TamMaceta: "Grande",
      Paso: 3,
      Detalles: "Cuidar brotes y aplicar fertilizante",
      Estado: "En desarrollo",
      EstacionRecomendada: "Primavera"
    }

];

  return (
    
      <ListaPlantaSinFiltro data={data} navigation={navigation} />
    
  
  );
};

export default GuiasPlantado;
