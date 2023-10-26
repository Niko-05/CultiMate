import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import PlantListItem from "./PlantListItem";

const ListaPlantaSinFiltro = ({ data, navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [filteredData, setFilteredData] = useState(data);

  const handleFilterChange = (selectedValue) => {
    setValue(selectedValue);
    setSearchTerm(""); // Restablece el término de búsqueda
    filterData(selectedValue, "");
  };
  const filterData = (selectedValue, searchTerm) => {
    let filteredItems = data;
    if (selectedValue !== null) {
      filteredItems = data.filter(
        (item) => item.EstacionRecomendada === selectedValue
      );
    }
    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredData(filteredItems);
  };
  useEffect(() => {
    if (value === null) {
      // Si seleccionas "Todos", muestra todos los elementos
      setFilteredData(data);
    } else {
      // Filtra los elementos basados en el valor seleccionado
      const filteredItems = data.filter(
        (item) => item.EstacionRecomendada === value
      );
      setFilteredData(filteredItems);
    }
  }, [value, data]);

  const renderItem = ({ item }) => (
    <PlantListItem item={item} navigation={navigation} data={data} />
  );

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar planta..."
        onChangeText={(text) => {
          setSearchTerm(text);
          filterData(value, text);
        }}
        value={searchTerm}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "lightgreen",
    padding: "7%",
    width: "96%",
    borderRadius: 15,
    marginTop: "3%",
    marginLeft: "2%",
    justifyContent: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewimage: {
    justifyContent: "center",
    marginRight: 20,
  },
  viewtexto: {
    width: "100%",
  },
  texto: {
    color: "white",
    fontSize: 24,
  },
  imagen: {
    width: 50, // Ancho de la imagen
    height: 50, // Alto de la imagen
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
});

export default ListaPlantaSinFiltro;
