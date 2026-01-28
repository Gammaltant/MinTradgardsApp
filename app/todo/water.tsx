import { getLatLon } from "@/utils/location";
import { fetchDailyWeather, shouldWaterToday } from "@/utils/weather";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function WaterScreen() {
    console.log("✅ WaterScreen loads weather");

    const [needsWater, setNeedsWater] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const { lat, lon } = await getLatLon();
                const daily = await fetchDailyWeather(lat, lon);
                setNeedsWater(shouldWaterToday(daily));
            } catch (err) {
              console.log("❌Weather error:", err);
              setError("Kunde inte hämta väder eller plats");
            }
        }
        load();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vattna</Text>

            {error && <Text style={styles.error}>{error}</Text>}

            {needsWater === null && <Text>Laddar väderdata</Text>}

            {needsWater === true && (<Text style={styles.alert}>💧 Växter behöver vattnas idag</Text>
            )}

            {needsWater === false && (<Text style={styles.ok}>✅ Ingen vattning behövs idag</Text>
            )}
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

    error: {
    color: "#E53935",
    marginTop: 8,
    },

    alert: {
      color: "#E53935",
      fontSize: 16,
      marginTop: 8,
    },
    
    ok: {
      color: "#4CAF50",
      fontSize: 16,
      marginTop: 8,
    },
    
    })