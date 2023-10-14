import { StyleSheet } from 'react-native';

export const GuiaPlantadoStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  plantInfoContainer: {
    marginVertical: 10,
    flexDirection: 'row',

  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
  },
  containerFila:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },
  image:{
    height: 50,
    width: 50,
    margin: '5%'
  },
  button:{
    color: '#71d772', 
  },
});