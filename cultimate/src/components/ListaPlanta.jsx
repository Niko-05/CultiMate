import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import PlantListItem from "./PlantListItem";
import config from "../../config";
import { favoritosData } from "../api/dataplantas";

const ListaPlanta = ({ data, navigation, usuario }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Todos", value: null },
    { label: "INVIERNO", value: "INVIERNO" },
    { label: "VERANO", value: "VERANO" },
    { label: "PRIMAVERA", value: "PRIMAVERA" },
    { label: "OTOÑO", value: "OTOÑO" },
    { label: "Favoritos", value: "Favoritos" },
  ]);
  const [filteredData, setFilteredData] = useState([]);
  const [favLista, setFavLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleFilterChange = (selectedValue) => {
    const actualValue = typeof selectedValue === 'function' ? selectedValue() : selectedValue;
    if (String(actualValue) !== String(value)) {
      setValue(selectedValue);
      setSearchTerm("");
      filterData(selectedValue, "");
    }
  };

  const filterData = (selectedValue, searchTerm) => {
    setLoading(true);
  
    let filteredItems = data;
  
    if (selectedValue !== null) {
      if (selectedValue === "Favoritos") {
        filteredItems = favLista.map((favItem) =>
          data.find((item) => favItem.PlantaID === item.id)
        );
        setLoading(true);
      } else {
        console.log(filteredItems)
        filteredItems = data.filter(
        
          (item) => item.estacion_recomendada === selectedValue
          
        );
        setLoading(true);
      }
    }
  
    if (searchTerm) {
      console.log(filteredItems)
      filteredItems = await filteredItems.filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    console.log(filteredItems)
    setFilteredData(filteredItems);
    setFav(updatedFavoritos); // Update favoritos after filtering
  };

  useEffect(() => {
    const fetchDataAndFavorites = async () => {
      const favLista = await fetchData(
        `${config.API}/fav/favoritos?id=${encodeURIComponent(usuario.id)}`
      );
      setFavLista(favLista);
      const initialFilteredData = data.filter((item) =>
        favLista.some((favItem) => favItem.PlantaID === item.id)
      );
      setFilteredData(initialFilteredData);
      setLoading(false);
    };

    fetchDataAndFavorites();
  }, [data, usuario.id]);

  const renderItem = ({ item }) => (
    <PlantListItem
      item={item}
      navigation={navigation}
      data={data}
      fav={favLista}
      usuario={usuario}
    />
  );

  if (data == []|| favoritosActualizados == []) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
    <TextInput
      style={styles.searchInput}
      placeholder="Buscar planta..."
      onChangeText={(text) => {
        setSearchTerm(text);
        filterData("", text);
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
  
    {loading && (
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'white', overflow: 'hidden', zIndex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )}
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
    zIndex: 2
  },
});

export default ListaPlanta;