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
import DropDownPicker from "react-native-dropdown-picker";
import PlantListItem from "./PlantListItem";

const ListaPlanta = ({ data, navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Todos", value: null },
    { label: "Invierno", value: "Invierno" },
    { label: "Verano", value: "Verano" },
    { label: "Primavera", value: "Primavera" },
    { label: "Otoño", value: "Otoño" },
  ]);
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
      <Text style={{ justifyContent: "center" }}>Seleccionar Filtro:</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={handleFilterChange}
        setItems={setItems}
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
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
});

export default ListaPlanta;
