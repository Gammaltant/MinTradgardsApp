import { Link } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900; // web/desktop

  return (
    <View style={[styles.container, isWide ? styles.row : styles.column]}>

      {/* Bild-del*/}
      <View style={[styles.container, isWide ? styles.half : styles.full]}>
        <Image 
          source={require('@/assets/images/tradgard.png')}
          style={styles.image}
          resizeMode="cover"
          />
      </View>

      {/* Text + knapp-del */}
      <View style={[styles.contentSection, isWide ? styles.half : styles.full]}>
        <Text style={styles.title}>Trädgårdsappen 🌿</Text>
        <Text style={styles.subtitle}>Din digitala trädgårdskompis</Text>

        <Link href="/menu" asChild>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuButtonText}>Börja här :)</Text>
          </TouchableOpacity>
        </Link>
      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B211A"
  },

  row: {
    flexDirection: "row",
  },

  column: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },

  half: {
    flex: 1,
  },

  full: {
    width: "100%",
  },

  imageSection: {
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  contentSection: {
    justifyContent: "center",
    paddingHorizontal: 48,
    paddingVertical: 24,
  },

  title: {
    fontSize: 50,
    color: "#A4B465",
    fontWeight: "bold",
    marginBottom: 12,
    alignSelf: "center",
  },

  subtitle: {
    fontSize: 22,
    color: '#F0A04B',
    marginBottom: 50,
    maxWidth: 420,
    alignSelf: "center",
  },

  menuButton: {
    backgroundColor: '#A4B465',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignSelf: "center",
  },

  menuButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
