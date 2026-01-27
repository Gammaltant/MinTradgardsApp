import { Link } from 'expo-router';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

export default function MenuScreen() {
    const { width } = useWindowDimensions();
    const isWide = width >= 900;

    return (
        <View style={[styles.container, isWide ? styles.row : styles.column]}>
            {/* Knapp + text */}
            <View style={[styles.contentSection, isWide ? styles.half : styles.contentMobile]}>
               <Text style={styles.title}>Meny</Text>

             <Link href= "/plants" asChild>
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
                <Text style={styles.buttonText}>Dagens sysslor</Text>
              </TouchableOpacity>
             </Link>
            </View>

            {/* Bild-delen*/}
            <View style={[styles.imageSection, isWide ? styles.half : styles.imageMobile]}>
                <Image
                  source={require("@/assets/images/tradgard.png")}
                  style={styles.image}
                  resizeMode="cover"
                  />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B211A',
    },

    row: {
        flexDirection: "row",
        gap: 20,
    },

    column: {
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
    },

    contentSection: {
        gap: 12,
        justifyContent: "center",
        paddingHorizontal: 48,
        paddingVertical: 24,
    },

    half: {
        flex: 1,
    },

    contentMobile: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        alignItems: "center",
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 30,
        color: "#A4B465",
        alignSelf: "center",
    },
    button: {
        backgroundColor: '#A4B465',
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 12,
        width: 260,
        alignSelf: "center",
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },

    imageSection: {
        flex: 1,
        overflow: "hidden",
    },

    imageMobile: {
        height: 260,
        marginTop: 20,
        marginBottom: 16,
        borderRadius: 18,
        overflow: "hidden",

    },

    image: {
        width: "100%",
        height: "100%",
    },

})