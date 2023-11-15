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
    { label: "Favoritos", value: "Favoritos"}
  ]);
  const [filteredData, setFilteredData] = useState(data);

  const handleFilterChange = (selectedValue) => {
    if (selectedValue !== value) {
    setValue(selectedValue);
    setSearchTerm(""); 
  }
};
  const filterData = (selectedValue, searchTerm) => {
    let filteredItems = data;
    if (selectedValue !== null) {
      if(selectedValue !== "Favoritos"){
      filteredItems = data.filter(
        (item) => item.estacion_recomendada == selectedValue
      );
      }else{
        filteredItems = data.filter(
          (item) => item.fav == true);
      }
    }
    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredData(filteredItems);
  };
  useEffect(() => {
      filterData(value, searchTerm);
    }, [value, data, searchTerm]);

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
