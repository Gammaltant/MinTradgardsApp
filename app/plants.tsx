import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { exportPlantsBackup, importPlantsBackupMobil, importPlantsBackupWeb } from "./utils/backup";
import { Plant } from "./utils/plants";
import { loadData, saveData } from "./utils/storage";

export default function PlantScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [plants, setPlants] = useState<Plant[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [harvestFromMonth, setHarvestFromMonth] = useState<number | null>(null);
    const [actionOpen, setActionOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const selectedPlant =plants.find(p => p.id === selectedId) ?? null;
    
    // Ladda sparade växter när sidan öppnas
    useEffect(() => {
        async function fetchPlants() {
            const stored = await loadData<Plant>("plants");
            setPlants(stored ?? []);
        }
        fetchPlants();
    }, []);


    // Om vi kommer från "add-plants", så lägg till ny växt
    useEffect(() => {
        async function addNewPlant() {
            if (!params.newPlant) return;
            const parsed: Plant = JSON.parse(params.newPlant as string);
            setPlants(prev => {
                const updated = [...prev, parsed];
                saveData("plants", updated);
                return updated;
            });
        }
        addNewPlant();
    }, [params.newPlant]);

    // Sortera växter i grupper
    const groupOrder: Record<string, number> = {
        "Blommor": 1,
        "Grönsaker": 2,
        "Buskar/Träd": 3
    };

    const sorted = [...plants].sort((a, b) => {
        if (a.group !== b.group) {
            return groupOrder[a.group] - groupOrder[b.group];
        }

        const nameCompare = a.name.localeCompare(b.name, "sv", {
            sensitivity: "base",
        });

        if (nameCompare !== 0) return nameCompare; 
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    });

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString("sv-SE");
    }

    const toggleSelect = (id: string) => {
        if (selectedId === id) {
            setSelectedId(null);
            setActionOpen(false);
            setIsEditing(false);
            setName("");
            setHarvestFromMonth(null);
            return;
        }
        setSelectedId(id);
        setActionOpen(true);
        setIsEditing(false);

        const plant = plants.find(p => p.id === id);
        setName(plant?.name ?? "");
        setHarvestFromMonth(plant?.details?.harvestFromMonth ?? null);
    }

    const startEdit = () => {
        if (!selectedId) return;
        setActionOpen(false);
        setIsEditing(true);
    }

    const handleUpdate = async () => {
        if (!selectedId) return;

        const updatedPlants = plants.map(p =>
            p.id === selectedId 
            ? {
                ...p,
                name: name.trim(),
                details: {
                    ...(p.details ?? {}),
                    harvestFromMonth: harvestFromMonth ?? undefined,
                },
            }
            : p
        );
        setPlants(updatedPlants);
        await saveData("plants", updatedPlants);

        setIsEditing(false);
        setSelectedId(null);
        setName("");
        setHarvestFromMonth(null);
    }

    const handleDeleteSelected = () => {
        if(!selectedId) return;

        const plant = plants.find(p => p.id === selectedId)
        if (!plant) return;
        
        const doDelete = async () => {
            const updated = plants.filter(p => p.id !== selectedId);
            setPlants(updated);
            await saveData("plants", updated);
            setSelectedId(null);
            setActionOpen(false);
            setIsEditing(false);
        };

        //För web
        if (Platform.OS === "web") {
            const ok = window.confirm(`Vill du ta bort "${plant.name}"?`);
            if (ok) void doDelete();
            return;
        }

        Alert.alert(
            "Ta bort växt", `Vill du ta bort "${plant.name}"?`, [
                { text: "Avbryt", style: "cancel"},
                { text: "Ta bort", style: "destructive", onPress: () => void doDelete() }
        ]);
    };

    const refresh = async () => {
        const p = await loadData<Plant>("plants");
        setPlants(p);
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Mina växter </Text>

            {/*Backup-knappar*/}
            <View style={{gap: 8, marginBottom: 16}}>
                <Button title="Exportera backup" onPress={() => exportPlantsBackup()} />

                <Button 
                   title="Importera backup"
                   onPress={async () => {
                    try {
                        if (Platform.OS === "web") {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "application/json";
                            input.onchange = async () => {
                                const file = input.files?.[0];
                                if (!file) return;
                                await importPlantsBackupWeb(file);
                                await refresh();
                                Alert.alert("Klart", "Backup importerad");
                            };
                            input.click();
                        } else {
                            await importPlantsBackupMobil();
                            await refresh();
                            Alert.alert("Klart", "Backup importerad");
                        }
                    } catch (e: any) {
                        Alert.alert("Fel", e?.message ?? "Import misslyckades");
                    }
                   }}   
                />
            </View>

            {/* Action-meny (Modal) - ligger här */}
            <Modal
               visible={actionOpen}
               transparent
               animationType="slide"
               onRequestClose={() => setActionOpen(false)}
            >
                <Pressable
                   style={styles.backdrop}
                   onPress={() => setActionOpen(false)}
                />

                <View style={styles.sheet}>
                  <Text style={styles.sheetTitle}>Välj åtgärd</Text>

                  <Pressable 
                    style={styles.sheetButton}
                    onPress={startEdit}
                  >
                    <Text style={styles.sheetButtonText}>Ändra</Text>
                  </Pressable>

                  <Pressable
                     style={[styles.sheetButton, styles.dangerButton]}
                     onPress={handleDeleteSelected}
                  >
                    <Text
                    style={[styles.sheetButtonText, styles.dangerText]}>Radera</Text>
                </Pressable>

                <Pressable style={styles.sheetCancel} onPress={() => setActionOpen(false)}>
                    <Text style={styles.sheetCancelText}>Avbryt</Text>
                </Pressable>
              </View>
            </Modal>


            {sorted.length === 0 && (
                <Text style={styles.empty}>Inga växter än.</Text>
            )}

            {sorted.map((plant, index) => {
                const isSelected = plant.id === selectedId;

                return (
                    <View key={plant.id}>
                       {/* Grupp-rubrik*/}
                       {(index ===0 || sorted[index - 1].group !== plant.group) && (
                         <Text style={styles.groupTitle}>{plant.group}</Text>
                       )}

                       {/*Klickbar växt (markerbar)*/}
                       <TouchableOpacity
                          style={[styles.plantItem, isSelected && styles.plantItemSelected]}
                          onPress={() => toggleSelect(plant.id)}
                        >
                          <Text style={styles.plantName}>• {plant.name}</Text>
                          <Text style={styles.dateText}>
                            Planterad: {formatDate(plant.createdAt)}
                          </Text>
                        </TouchableOpacity>
                    </View>
                );
            })}

            {selectedPlant && isEditing &&(
                <View style={styles.editBox}>
                    <Text style={styles.label}>Namn</Text>
                    <TextInput 
                       style={styles.input}
                       value={name}
                       onChangeText={setName}
                    />
                    {selectedPlant.group === "Grönsaker" && (
                      <>
                        <Text style={styles.label}>Skörd från (1-12)</Text>
                        <TextInput 
                          style={styles.input}
                          value={harvestFromMonth?.toString() ??""}
                          keyboardType="numeric"
                          onChangeText={(v) => {
                              const n = v ? Number(v) : null;
                              setHarvestFromMonth(Number.isFinite(n as number) ? (n  as number) : null)
                          }}
                        />
                      </>
                    )}

                    <Button title="Ändra" onPress={handleUpdate} />         
                </View>
            )}

            {/* Lägg till */}
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={() => router.push("/plants-add")}
            >
              <Text style={styles.addText}>+ Lägg till växt</Text>
             </TouchableOpacity>
           </ScrollView>
          );
        }
            
        const styles = StyleSheet.create({
            container: {
                flex: 1, 
                padding: 20, 
                backgroundColor: '#000'
            },
          
            title: {
                fontSize: 32, 
                fontWeight: 'bold', 
                marginBottom: 20,
            },
            empty: {
                fontSize: 16, 
                textAlign: 'center',
                marginTop: 30, 
                color: '#777'
            },
            groupTitle: {
                marginTop: 25,
                fontSize: 24,
                fontWeight: 'bold',
                color: '#F0A04B', 
            },
            plantItem: {
                marginTop: 8,
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 10,
                backgroundColor: "#111",
            },
            plantItemSelected: {
                borderWidth: 2,
                borderColor: "#F0A04B",
            },
            plantName: {
                fontSize: 18, 
                marginLeft: 10,
                marginTop: 5, 
                color: "#A4B465"
            },
            dateText: {
                fontSize: 12,
                marginLeft: 22,
                color: "#777"
            },

            addButton: {
                backgroundColor: '#96A78D', 
                borderRadius:10,
                alignItems: 'center',
                padding: 15, 
                marginTop: 40,
                marginBottom: 50,
            },
            addText: {
                color: '#F0BB78', 
                fontSize: 18
            },

              label: {
                fontWeight: "700",
                marginBottom: 4,
            },
            input: {
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 6,
                padding: 8,
                marginBottom: 12,
            },

            editBox: {
                marginTop: 16,
                padding: 12,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                backgroundColor: "#fafafa",
            },

            backdrop: {
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)"
            },

            sheet: {
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                padding: 16,
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
                backgroundColor: "#111",
                borderTopWidth: 1,
                borderColor: "#333",
            },

            sheetTitle: {
                fontSize: 16,
                fontWeight: "700",
                marginBottom: 12,
                color: "#fff",
            },

            sheetButton: {
                paddingVertical: 14,
            },

            sheetButtonText: {
                fontSize: 16,
                color: "#fff",
            },

            dangerButton: {
                marginTop: 4,
            },

            dangerText: {
                color: "tomato",
                fontWeight: "700",
            },

            sheetCancel: {
                marginTop: 12,
                paddingVertical: 12,
            },

            sheetCancelText: {
                textAlign: "center",
                color: "#aaa",
            },
        });