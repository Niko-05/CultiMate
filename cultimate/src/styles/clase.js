import { cloneElement } from 'react';
import { StyleSheet } from 'react-native';

export const GuiaPlantadoStyles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: '10%',
    marginBottom: '15%',
    marginTop: '15%',
    flexDirection: 'row',
    justifyContent: 'center',
    
  },

  container2: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '10%',
    borderColor: 'lightgrey',
    borderRadius: 15,
    margin: '2%',
    marginTop: '5%',
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c0e8c0',
  },

  pagina: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding : '5%',
    margin: '2%',
  },

  plantInfoContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    textAlign: 'justify',
    flexDirection: 'row',
    flexGrow: 30,
    flexWrap: 'wrap',

  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
  },
  infoText: {
    fontSize: 14,
    flexWrap: 'wrap',
    textAlign: 'justify',
    paddingLeft: 10,
  },
  image:{
    height: 64,
    width: 64,
    marginRight: '5%',
  },
  button:{
    color: '#blue', 
    backgroundColor: '#blue',
  },
  textbutton:{
    color: 'darkgreen', 
  },
  fondobutton: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 15,
  },
  separador: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 13
    ,
  },
});