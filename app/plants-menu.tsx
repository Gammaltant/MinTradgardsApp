import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PlantsMenu() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mina växter</Text>

            {/* Visa alla växter*/}
            <Link href="/plants" asChild>
               <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>📋Alla växter.</Text>
              </TouchableOpacity>
            </Link>
              

            {/*Lägg till växt*/}
            <Link href="/plants-add" asChild>
               <TouchableOpacity style={styles.button}>
                 <Text style={styles.buttonText}>Lägg till ny växt.</Text>
               </TouchableOpacity>
            </Link>

        </View>
    );
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        alignItems: 'center',
        backgroundColor: '#1B211A',
        gap: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#A4B465",
    },
    button: {
        backgroundColor: '#A4B465',
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 12,
        width: 260,
        alignItems: 'center',
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});