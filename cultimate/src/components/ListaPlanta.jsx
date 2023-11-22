import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image, 
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import PlantListItem from "./PlantListItem";
import * as SecureStore from "expo-secure-store";
import config from "../../config";
const ListaPlanta = ({ data, favLista, navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Todos", value: null },
    { label: "Invierno", value: "Invierno" },
    { label: "Verano", value: "Verano" },
    { label: "Primavera", value: "Primavera" },
    { label: "Otoño", value: "Otoño" },
    { label: "Favoritos", value: "Favoritos" }
  ]);
  const [filteredData, setFilteredData] = useState(data);
  const [favList, setFav] = useState(favLista);
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    try {
      // This is the way to access the token
      const token = await SecureStore.getItemAsync("accesstoken");
      const api_call = await fetch(`${config.API}/user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!api_call.ok) {
        // Handle non-OK response status
        Alert.alert(
          "API error",
          `Failed to fetch user data. Status: ${api_call.status}`
        );
        return;
      }

      const result = await api_call.json();
      return result;
    } catch (e) {
      console.error(e);
      Alert.alert("Network error");
    }
  };

  const handleFilterChange = (selectedValue) => {
    if (selectedValue !== value) {
      setValue(selectedValue);
      setSearchTerm("");
      filterData(selectedValue, "");
    }
  };

  const filterData = async (selectedValue, searchTerm) => {
    setLoading(true); // Set loading to true when fetching data
    const user = await getUserInfo();
    let filteredItems = data;

    if (selectedValue !== null) {
      if (selectedValue !== "Favoritos") {
        setFav(favLista);
        filteredItems = data.filter(
          (item) => item.estacion_recomendada === selectedValue
        );
      } else {
        const api_call3 = await fetch(
          `${config.API}/fav/favoritos?id=${encodeURIComponent(
            user.id
          )}`,
          { method: "GET" }
        );
        const favLista = await api_call3.json();
        setFav(favLista);
        filteredItems = data.filter((item) =>
        favLista.some((favItem) => favItem.PlantaID === item.id)
        );
      }
    }

    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filteredItems);
    setLoading(false); // Set loading to false after fetching data
  };

  useEffect(() => {
    filterData(value, searchTerm);
  }, [value, data, searchTerm, favLista]);

  const renderItem = ({ item }) => (
    <PlantListItem item={item} navigation={navigation} data={data} fav={favLista} />
  );

  if (loading) {
    return <Text>Loading...</Text>; // Render a loading indicator
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
