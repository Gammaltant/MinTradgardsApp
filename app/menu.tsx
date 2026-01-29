import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { loadZone, saveZone } from "../utils/zone";

const ZONKARTA_URL = 
  "https://svensktradgard.se/tradgardsrad/zonkartan/digitala-zonkartan";

export default function MenuScreen() {
    const { width } = useWindowDimensions();
    const isWide = width >= 900;
    const [zone, setZone] = useState("");
    const [ zoneDraft, setZoneDraft ] = useState("");
    const [ isEditingZone, setIsEditingZone ] = useState(false);

    useEffect(() => {
        loadZone().then((z) => {
            if (z) {
                setZone(z);
                setZoneDraft(z);
                setIsEditingZone(false);
            } else {
                setIsEditingZone(true);
            }
        });
    }, []);

    function startEditZone() {
        setZoneDraft(zone || "");
        setIsEditingZone(true);
    }

    function cancelEditZone() {
        setZoneDraft(zone || "");
        setIsEditingZone(false);
    }

    async function onSaveZone() {
        const cleaned = zoneDraft.trim().replace(/^zon\s*/i, "");
        if (!/^[1-8]$/.test(cleaned)) return; 

        await saveZone(cleaned);
        setZone(cleaned);
        setZoneDraft(cleaned);
        setIsEditingZone(false);
    }

    return (
        <View style={[styles.container, isWide ? styles.row : styles.column]}>
            {/* Knapp + text */}
            <View style={[styles.contentSection, isWide ? styles.half : styles.contentMobile]}>
               <Text style={styles.title}>Meny</Text>

                <Link href="/todo" asChild>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Dagens sysslor</Text>
                  </TouchableOpacity>
                </Link>
          
            {/* Odlingszon: knapp + input + spara + info */}
            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(ZONKARTA_URL)}>
               <Text style={styles.buttonText}>Hitta din odlingszon</Text>
             </TouchableOpacity>

             {/*Instruktioner under knappen */}
             <Text style={styles.zoneHelpTitle}>Så hittar du din odlingszon:</Text>
             <View style={styles.zoneDivider} />
             <Text style={styles.zoneHelpText}>
                1. Hitta din zon via kartan⬆️{"\n"}
                2. Kom tillbaka hit{"\n"}
                3. Spara/ändra siffran i appen⬇️
             </Text>

             <View style={styles.zoneArea}>
                {!isEditingZone ? (
                    <>
                      {/* valfritt: knapp för att kunna ändra senare */}
                      <TouchableOpacity style={styles.zoneSave} onPress={() => setIsEditingZone(true)}>
                        <Text style={styles.zoneSaveText}>Spara/ändra</Text>
                      </TouchableOpacity>

                      {/* Zon - texten UNDER knappen */}
                      <Text style={styles.zoneInfo}>
                        {zone ? `Zon: ${zone}` : "Ingen zon vald"}
                      </Text>
                    </>
                  ) : (
                    <>
                      <TextInput
                       value={zoneDraft}
                       onChangeText={setZoneDraft}
                       placeholder="Skriv zon (1-8), t.ex. 3"
                       placeholderTextColor="#7a7a7a"
                       keyboardType="number-pad"
                       maxLength={2}
                       style={styles.zoneInput}
                    />
                      <TouchableOpacity style={styles.zoneSave} onPress={onSaveZone}>
                        <Text style={styles.zoneSaveText}>Spara</Text>
                      </TouchableOpacity>
                
                      {/* valfritt: avbryt om zon redan finns */}
                      {zone ? (
                        <TouchableOpacity onPress={() => setIsEditingZone(false)}>
                          <Text style={styles.zoneInfo}>Avbryt</Text>
                        </TouchableOpacity>
                      ) : null}
                    </>
                )}
             </View>

                <Link href= "/plants" asChild>
                 <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Mina växter</Text>
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
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },

    zoneHelpTitle: {
        width: 260,
        alignSelf: "center",
        fontSize: 14,
        fontWeight: "600",
        color:  "#9fb57a",
    },

     zoneDivider: {
        width: 260,
        height: 5,
        backgroundColor: "#A4B465",
        alignSelf: "center",
        opacity: 0.5,
        marginVertical: 6,
    },

    zoneHelpText: {
        width: 260,
        alignSelf: "center",
        fontSize: 13,
        lineHeight: 18,
        color: "#9fb57a",
        marginBottom: 12,
    },

    zoneArea: {
        width: 260,
        alignSelf: "center",
        gap: 10,
        marginBottom: 8,
    },

    zoneInput: {
        borderWidth: 1,
        borderColor: "#A4B465",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        color: "#fff",
        fontSize: 16,
    },

    zoneSave: {
        backgroundColor: "#A4B465",
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center",
    },

    zoneSaveText: {
        color: "#fff",
        fontWeight: "bold",
    },

     zoneInfo: {
        color: "#A4B465",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        opacity: 0.9,
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