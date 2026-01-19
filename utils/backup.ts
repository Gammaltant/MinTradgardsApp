import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

import type { Plant } from "./plants";
import { loadData, saveData } from "./storage";

const KEY = "plants";
const FILE_NAME = "plants-backup.json";

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

function assertPlantArray(parsed: unknown): asserts parsed is Plant[] {
    if(!Array.isArray(parsed)) {
        throw new Error("Backupfilen är inte en lista");
        
    }
}

export async function exportPlantsBackup() {
    const plants = await loadData<Plant>("plants");
    const json = JSON.stringify(plants, null, 2);

    //Web datorn//
    if ( Platform.OS === "web") {
        downloadTextFile(FILE_NAME, json);
        return;
    }

    //MOBIL
    const uri = (FileSystem as any).documentDirectory + "plant-backup.json";
    await FileSystem.writeAsStringAsync(uri, json, {
        encoding: FileSystem.EncodingType.UTF8,
    });

    if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
    }
}

//WEB: import via <Input type= "file" />
export async function importPlantsBackupWeb(file: File) {
    const text = await file.text();
    const parsed = JSON.parse(text);

    if (!Array.isArray(parsed)) throw new Error("Buckupfilen är inte en lista");

    await saveData("plants", parsed as Plant[]);
}

//MOBIL: import via dokumentPicker
export async function importPlantsBackupMobil() {
    const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
        multiple: false,
    });

    if (result.canceled) return 0;

    const uri = result.assets[0].uri;
    const text = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.UTF8,
    });

    const parsed = JSON.parse(text) as unknown;
    assertPlantArray(parsed);

    const plants = parsed as Plant[];

    await saveData(KEY, plants);
    return plants.length;
    
}