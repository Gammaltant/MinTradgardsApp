import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

import type { Plant } from "./plants";
import { loadData, saveData } from "./storage";

//----------WEB-helpers--------//
function downloadTextFile(filename: string, text: string) {
    const blob = new Blob([text], { type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

export async function exportPlantsBackup() {
    const plants = await loadData<Plant>("plants");
    const json = JSON.stringify(plants, null, 2);

    //Web datorn//
    if ( Platform.OS === "web") {
        downloadTextFile("plants-backup.json", json);
        return;
    }

    //MOBIL
    const uri = (FileSystem as any).documentDirectory + "plant-backup.json";
    await FileSystem.writeAsStringAsync(uri, json);

    if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
    }
}

export async function importPlantsBackupWeb(file: File) {
    const text = await file.text();
    const parsed = JSON.parse(text);

    if (!Array.isArray(parsed)) throw new Error("Buckupfilen är inte en lista");

    await saveData("plants", parsed as Plant[]);
}

export async function importPlantsBackupMobil() {
    //MOBIL(expo go)
    const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const uri = result.assets[0].uri;
    const text = await FileSystem.readAsStringAsync(uri);

    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) throw new Error("Backupfilen är inte en lista");

    await saveData("plants", parsed as Plant[]);
}