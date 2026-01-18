import { Link } from 'expo-router';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MenuScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meny</Text>

            <Link href= "/plants-menu" asChild>
               <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Mina växter</Text>
               </TouchableOpacity>
            </Link>

            <TouchableOpacity 
              style={styles.button} 
              onPress={() => Linking.openURL("https://svensktradgard.se/tradgardsrad/zonkartan/digitala-zonkartan")
              }
            >
              <Text style={styles.buttonText}>Min odlingszon</Text>
            </TouchableOpacity>

            <Link href="/todo" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Att göra idag</Text>
              </TouchableOpacity>
            </Link>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        alignItems: 'center',
        backgroundColor: '#1B211A',
        gap: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
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
    }

})