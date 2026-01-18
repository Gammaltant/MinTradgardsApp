import { Link } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900; // web/desktop

  return (
    <View style={[styles.container, isWide ? styles.row : styles.column]}>
      {/*Bild-del*/}
      <View style={[styles.imageSection, isWide ? styles.half : styles.imageMobile]}>
        <Image 
          source={require("@/assets/images/tradgard.png")}
          style={styles.image}
          resizeMode="cover"
          />
      </View>

      {/* Text + knapp-del*/}
      <View style={[styles.contentSection, isWide ? styles.half : styles.contentMobile]}>
        <Text style={styles.title}>Trädgårdsappen🌿</Text>
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
    backgroundColor: "#000",
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

  imageSection:{
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
    alignItems: "center",
  },

  imageMobile: {
    height: 260,
    marginTop: 20,
    marginBottom: 16,
    borderRadius: 18,
    overflow: "hidden",
  },

  contentMobile: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",
  },

  title: {
    fontSize: 40,
    color: '#A4B465',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 22,
    color: '#F0A04B',
    marginBottom: 28,
    maxWidth: 420,
    textAlign: "center",
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
    fontSize: 20,
    fontWeight: 'bold',
  },
});
