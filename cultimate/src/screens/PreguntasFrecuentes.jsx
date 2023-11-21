import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

const PreguntasFrecuentes = () => {
    const preguntas = [
        {
            pregunta: "¿Cómo puedo crear una cuenta en CultiMate?",
            respuesta:
                'Para crear una cuenta en CultiMate, simplemente haz clic en el botón "Registrarse" en la página de inicio y sigue las instrucciones.',
        },
        {
            pregunta: "¿Cómo puedo agregar una planta a mi lista de seguimiento?",
            respuesta:
                'Para agregar una planta a tu lista de seguimiento, busca la planta en la página de búsqueda y haz clic en el botón "Agregar a mi lista".',
        },
        {
            pregunta: "¿Cómo puedo eliminar una planta de mi lista de seguimiento?",
            respuesta:
                'Para eliminar una planta de tu lista de seguimiento, ve a la página de tu lista de seguimiento y haz clic en el botón "Eliminar" junto a la planta que deseas eliminar.',
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Preguntas frecuentes</Text>
            {preguntas.map((pregunta, index) => (
                <View key={index} style={styles.preguntaContainer}>
                    <Text style={styles.pregunta}>{pregunta.pregunta}</Text>
                    <Text style={styles.respuesta}>{pregunta.respuesta}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    preguntaContainer: {
        marginBottom: 20,
    },
    pregunta: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    respuesta: {
        fontSize: 16,
    },
});

export default PreguntasFrecuentes;

