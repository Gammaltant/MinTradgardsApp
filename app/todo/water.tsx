import { StyleSheet, Text, View } from "react-native";

export default function WaterScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vattna</Text>
            <Text>Temperatur, nederbörd m.m.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    title: {
        fontSize: 22,
        marginBottom: 12,
    },
})