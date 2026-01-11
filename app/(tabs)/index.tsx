import { Link } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      {/* Bild högst upp*/}
      <Image 
        source={require('@/assets/images/tradgard.png')}
        style={styles.topImage}
        resizeMode='contain'
        />

      <Text style={styles.title}>Trädgårdsappen🌿</Text>
      <Text style={styles.subtitle}>Din digitala trädgårdskompis.</Text>

      <Link href="/menu" asChild>
         <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Börja här :)</Text>
         </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  topImage: {
    width: 340,
    height: 200,
    borderRadius: 1000,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    color: '#A4B465',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    color: '#F0A04B',
    marginBottom: 60,
    width: '80%',
    textAlign: 'center',
  },
  menuButton: {
    backgroundColor: '#A4B465',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 12,
    elevation: 2,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
