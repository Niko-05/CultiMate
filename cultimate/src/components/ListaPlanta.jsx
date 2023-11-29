import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import PlantListItem from "./PlantListItem";
import config from "../../config";

const ListaPlanta = ({ data, navigation, usuario }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Todos", value: null },
    { label: "Invierno", value: "Invierno" },
    { label: "Verano", value: "Verano" },
    { label: "Primavera", value: "Primavera" },
    { label: "Otoño", value: "Otoño" },
    { label: "Favoritos", value: "Favoritos" },
  ]);
  const [filteredData, setFilteredData] = useState([]);
  const [favLista, setFavLista] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFilterChange = (selectedValue) => {
    if (selectedValue !== value) {
      setValue(selectedValue);
      setSearchTerm("");
      filterData(selectedValue, "");
    }
  };

  const fetchData = async (url, method = "GET") => {
    try {
      const api_call = await fetch(url, { method });
      return await api_call.json();
    } catch (error) {
      console.error(error);
      return null;
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
      } else {
        console.log(filteredItems)
        filteredItems = data.filter(
        
          (item) => item.estacion_recomendada === selectedValue
        );
      }
    }
  
    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    console.log(filteredItems)
    setFilteredData(filteredItems);
    setLoading(false);
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

  if (loading) {
    return <Text>Loading...</Text>;
  }

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