import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import PlantListItem from "./PlantListItem";
import config from "../../config";
import { favoritosData } from "../api/dataplantas";

const ListaPlanta = ({ data, favLista, navigation, usuario }) => {
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
  const [filteredData, setFilteredData] = useState(data);
  const [favList, setFav] = useState(favLista);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingFav, setLoadingFav] = useState(true);
  const handleFilterChange = (selectedValue) => {
    const actualValue =
      typeof selectedValue === "function" ? selectedValue() : selectedValue;
    if (String(actualValue) !== String(value)) {
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

  const filterData = async (selectedValue, searchTerm) => {
    let filteredItems = data;

    if (selectedValue !== null) {
      if (selectedValue === "Favoritos") {
        const favLista = await fetchData(
          `${config.API}/fav/favoritos?id=${encodeURIComponent(usuario.id)}`
        );
        setFav(loadingData || loadingFav);
        filteredItems = data.filter((item) =>
          favLista.some((favItem) => favItem.PlantaID === item.id)
        );
        setLoading(true);
      } else {
        filteredItems = data.filter(
          (item) => item.estacion_recomendada === selectedValue
        );
        setLoading(true);
      }
    }

    if (searchTerm) {
      console.log(filteredItems);
      filteredItems = await filteredItems.filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filteredItems);
  };

  useEffect(() => {
    filterData(value, searchTerm);
    if (data != []) {
      console.log(data);
      setLoadingData(false);
    } else {
      setLoadingData(true);
    }
    if (favLista != []) {
      console.log(favLista);
      setLoadingFav(false);
    } else {
      setLoadingData(true);
    }
  }, [value, data, searchTerm, favLista]);

  const renderItem = ({ item }) => (
    <PlantListItem
      item={item}
      navigation={navigation}
      data={data}
      fav={favLista}
      usuario={usuario}
    />
  );

  if (loadingData || loadingFav) {
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
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "white",
            overflow: "hidden",
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
    zIndex: 2,
  },
});

export default ListaPlanta;
