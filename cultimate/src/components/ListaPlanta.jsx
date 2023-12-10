import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, Modal } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from 'react-native-vector-icons/FontAwesome';

import PlantListItem from "./PlantListItem";
import config from "../../config";
import { favoritosData } from "../api/dataplantas";

const ListaPlanta = (props) => {
  const { data, navigation, favoritos} = props;
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
  const [filteredData, setFilteredData] = useState(data);
  const [favoritosActualizados, setFav] = useState(favoritos);
  const [loading, setLoading] = useState(true);
  const handleFilterChange = (selectedValue) => {
    const actualValue = typeof selectedValue === 'function' ? selectedValue() : selectedValue;
    if (String(actualValue) !== String(value)) {
      setValue(selectedValue);
      setSearchTerm("");
      filterData(selectedValue, "");
    }
  };

  const filterData = async (selectedValue, searchTerm) => {
    let filteredItems = await data;
    let updatedFavoritos = await favoritosData();
    
    if (selectedValue !== null) {
      if (selectedValue === "Favoritos") {
        filteredItems = await data.filter((item) =>
          updatedFavoritos.some((favItem) => favItem.PlantaID === item.id)
        );
        setLoading(true);
      } else {
        filteredItems = await data.filter(
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

    setFilteredData(filteredItems);
    setFav(updatedFavoritos); // Update favoritos after filtering
  };

  useEffect(() => {
    const fetchData = async () => {
      filterData(value, searchTerm);
    };
  
    fetchData();
  }, [value, searchTerm]);
  const onLoad = () => {
    setLoading(false);
    console.log("Dejo de cargar" + loading);
  }
  const renderItem = ({ item }) => (
    <PlantListItem item={item} navigation={navigation} data={filteredData} fav={favoritosActualizados } onLoad={onLoad}/>
    
  );

  if (data == []|| favoritosActualizados == []) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchSection}>
        <Icon style={styles.searchIcon} name="search" size={20} color="#000"/>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar planta..."
          onChangeText={(text) => {
            setSearchTerm(text);
            filterData("", text);
          }}
          value={searchTerm}
        />
      </View>
    
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
        numColumns={2} // Esto establecerá la lista en dos columnas
        columnWrapperStyle={styles.row}
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
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    zIndex: 2
  },
  searchIcon: {
    padding: 10,
    color: '#939393'
  },
  searchInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  row: {
    flex: 1,
    justifyContent: "space-around", // Esto distribuirá el espacio uniformemente alrededor de los elementos
  },
});

export default ListaPlanta;