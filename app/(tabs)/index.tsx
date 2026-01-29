import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  return (
    <View style={[styles.container, isWide ? styles.row : styles.column]}>
      {/* Bild-del */}
      <View style={[styles.imageSection, isWide ? styles.half : styles.imageMobile]}>
        <Image
          source={require("@/assets/images/tradgard.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Text + knapp-del */}
      <View style={[styles.contentSection, isWide ? styles.half : styles.contentMobile]}>
        <Text style={styles.title}>Trädgårdsappen🌿</Text>

        {/* Subtitle bara på web/desktop */}
        {isWide && <Text style={styles.subtitle}>Din digitala trädgårdskompis</Text>}

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
  container: { flex: 1, backgroundColor: "#1B211A" },

  row: { flexDirection: "row" },

  column: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },

  half: { 
    flex: 1,
  },

  imageSection: {
    flex: 1,
    overflow: "hidden",
  },

  imageMobile: {
    height: 220,
    width: "100%",
    marginTop: 12,
    marginBottom: 16,
    borderRadius: 18,
    overflow: "hidden",
  },

  image: { 
    width: "100%", 
    height: "100%", 
    borderRadius: 14,
    marginTop: 12,
  },

  contentSection: {
    justifyContent: "center",
    paddingHorizontal: 48,
    paddingVertical: 24,
  },

  contentMobile: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 44,
    color: "#A4B465",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 20,
    color: "#F0A04B",
    marginBottom: 22,
    maxWidth: 320,
    alignSelf: "center",
  },

  menuButton: {
    backgroundColor: "#A4B465",
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignSelf: "center",
  },

  menuButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
