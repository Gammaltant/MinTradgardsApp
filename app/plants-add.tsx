import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { Plant } from "./utils/plants";
import { loadData, saveData } from './utils/storage';

export default function AddPlantScreen() {
    const router = useRouter();

    const [alreadyExists, setAlreadyExists] = useState(false);

    const [name, setName] = useState("");

    // Grupper att välja på
    const groups = ['Blommor', 'Grönsaker', 'Buskar/Träd'] as const;
    type Group = typeof groups[number];

    const [group, setGroup] = useState<Group | "">("");

    const handleSelectGroup = (g: Group) => {
        setGroup(g);
        setName("");
    }

    const handleSave = async () => {
        if (!name.trim() || !group) return;

        const existing = await loadData<Plant>("plants");
        const trimmedName = name.trim();
        const normalizedName = trimmedName.toLowerCase();

        const exists = existing.some(
            p => p.name.trim().toLowerCase() === normalizedName
        );

            setAlreadyExists(exists);

        const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

        const newPlant: Plant = { 
            id,
            name: trimmedName, 
            group: group as Plant["group"],
            createdAt: new Date().toISOString()
        }; 

        // Spara 
        await saveData('plants', [...existing, newPlant]);

        // Navigera tillbaka
        router.replace('/plants');

        //Töm input
        setName("");
        setGroup("");
        setAlreadyExists(false);
    };

    const canSave = !!group && name.trim().length > 0;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lägg till växt</Text>

            <Text style={styles.label}>Växtgrupp</Text>
            {groups.map((g) => (
                <TouchableOpacity 
                  key={g}
                  style={[
                    styles.groupButton,
                    group === g && styles.selectedButton
                  ]}
                  onPress={() => handleSelectGroup(g)}
                  >
                    <Text style={styles.groupText}>{g}</Text>
                  </TouchableOpacity>
                ))}

            {group && (
              <>
                <Text style={styles.label}>Namn</Text>
                <TextInput 
                   style={styles.input}
                   placeholder='Ex: Lavendel'
                   value={name}
                   onChangeText={(text) => {
                    setName(text);
                    setAlreadyExists(false); // Nollställ varningen när man skriver
                   }}
               />  

               {alreadyExists && (
                <Text style={{color: "tomato", marginTop: 8 }}>
                    Du har redan en växt med det namnet!(sparas ändå)
                </Text>
               )}
              </>  
            )}
            
            <TouchableOpacity 
               style={[styles.saveButton, (!canSave) && styles.disabled]}
               onPress={handleSave}
               disabled={!canSave}
               >
                  <Text style={styles.saveText}>Spara växt</Text>
               </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000',
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        color: '#fff',
    },
    helperText: {
        marginTop: 10,
        color: '#aaa',
    },

    input: {
        backgroundColor: '#F0BB78',
        color: '#000',
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
    },
    groupButton: {
        backgroundColor: '#F0BB78',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#aaa',
        marginTop: 8,
    },
    groupText: {
        fontSize: 16,
        color: '#000',
    },
    selectedButton: {
        backgroundColor: '#cdeedb',
        borderColor: '#57cc99',
    },
    saveButton: {
        backgroundColor: '#A4B465',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    disabled: {
        backgroundColor: '#ccc',
    },
    saveText: {
        fontSize: 18,
        color: '#000',
        fontWeight: '700',
    },
})

