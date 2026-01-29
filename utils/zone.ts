import { loadData, saveData } from "../utils/storage";

const ZONE_KEY = "garden_zone";

export async function saveZone(zone: string) {
    await saveData(ZONE_KEY, zone);
}

export async function loadZone(): Promise<string | null> {
    return loadData<string>(ZONE_KEY);
}