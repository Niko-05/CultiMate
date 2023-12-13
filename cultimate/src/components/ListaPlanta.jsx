import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from 'react-native-vector-icons/FontAwesome';

import PlantListItem from "./PlantListItem";
import config from "../../config";
import { favoritosData } from "../api/dataplantas";

const ListaPlanta = (props) => {
  const { data, navigation, favoritos } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Todos", value: null },
    { label: "Invierno", value: "INVIERNO" },
    { label: "Verano", value: "VERANO" },
    { label: "Primavera", value: "PRIMAVERA" },
    { label: "Otoño", value: "OTOÑO" },
    { label: "Favoritos", value: "Favoritos" },
  ]);

  const [filteredData, setFilteredData] = useState(data);
  const [favoritosActualizados, setFav] = useState(favoritos);
  const [loading, setLoading] = useState(true);
  const [forceRender, setForceRender] = useState(0); // Nuevo estado para forzar el renderizado

  const handleFilterChange = (selectedValue) => {
    const actualValue =
      typeof selectedValue === "function" ? selectedValue() : selectedValue;
    if (String(actualValue) !== String(value)) {
      setValue(selectedValue);
      setSearchTerm("");
      filterData(selectedValue, "");
      setForceRender(forceRender + 1); // Incrementar el contador para forzar el renderizado
    }
  };

  const filterData = async (selectedValue, searchTerm) => {
    setLoading(true)
    let filteredItems = await data;
    let updatedFavoritos = await favoritosData();

    if (selectedValue !== null) {
      if (selectedValue === "Favoritos") {
        filteredItems = await data.filter((item) =>
          updatedFavoritos.some((favItem) => favItem.PlantaID === item.id)
        );
      } else {
        filteredItems = await data.filter(
          (item) => item.estacion_recomendada === selectedValue
        );
      }
    }

    if (searchTerm) {
      filteredItems = await filteredItems.filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filteredItems);
    setFav(updatedFavoritos);
    
  };

  const onLoad = () => {
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <PlantListItem
      item={item}
      navigation={navigation}
      data={filteredData}
      fav={favoritosActualizados}
      onLoad={onLoad}
      filtro={value}
    />
  );

  if (data == []) {
    return  <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'white', overflow: 'hidden', zIndex: 1, alignItems: "top", justifyContent: "top" }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchSection}>
        <Icon style={styles.searchIcon} name="search" size={20} color="#000" />
        <TextInput
          style={styles.searchInput}
          placeholder="¿Que vas a plantar hoy?"
          onChangeText={(text) => {
            setSearchTerm(text);
            filterData(value, text);
          }}
          value={searchTerm}
        />
      </View>
      <View style={{paddingTop: 10,zIndex: 2}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {items.map((label) => (
            <TouchableOpacity
              key={label.value}
              style={[
                styles.filter,
                value === label.value && styles.selectedFilter
              ]}
              onPress={() => handleFilterChange(label.value)}
            >
              <Text style={[styles.filterText, value === label.value && styles.selectedFilterText]}>
                    {label.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`} // Cambiado para que sea único
        numColumns={2}
        columnWrapperStyle={styles.row}
        extraData={forceRender} // Este extraData forzará el renderizado cuando cambie
      />

      {loading && (
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'white', overflow: 'hidden', zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
    fontFamily: "Inter",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  scrollView: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  filter: {
    
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    borderRadius: 20,
  },
  selectedFilter: {
   
  },

  selectedFilterText: {
    fontFamily: "Inter",
    fontWeight: 'bold',
    color: 'black', // Puedes ajustar el color del texto cuando está seleccionado
  },
  filterText: {
    fontFamily: "Inter",
    color: "grey",
    fontSize: 13,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default ListaPlanta;
