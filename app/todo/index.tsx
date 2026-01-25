import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

export default function TodoScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900; // web/desktop

    return (
       <View style={[styles.container, isWide ? styles.row : styles.column]}>
        {/* Knapp + Text */}
        <View style={[styles.contentSection, isWide ? styles.half : styles.contentMobile]}>
          <Text style={styles.title}>Dagens sysslor</Text>
                
          <Link href="/todo/water" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Vattna</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Gödsla</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Beskära</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Skörda</Text>
          </TouchableOpacity>
        </View>

       
          {/* Bild del */}
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
  },

  row: {
    flexDirection: "row",
  },

  column: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },

  imageSection: {
    flex:1,
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

  contentSection: {
    gap: 12,
    justifyContent: "center",
    paddingHorizontal: 48,
    paddingVertical: 24,
  },

  half: {
    flex:1,
  },

  contentMobile: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",

  },

  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#A4B465",
    alignSelf: "center",
  },

  button: {
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    backgroundColor: '#A4B465',
    borderRadius: 12,
    width: 260,
    elevation: 3,
    alignSelf: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});