import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveData<T>(key: string, data: T): Promise<void> {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
        console.log("Save error", err);
        throw err;
    }
}

export async function loadData<T>(key: string): Promise<T | null> {
    try {
        const json = await AsyncStorage.getItem(key);
        return json ? (JSON.parse(json) as T) : null;
    } catch (err) {
        console.log("Load error", err);
        return null;
    }
}

export async function loadArray<T>(key: string): Promise<T[]> {
    const data = await loadData<T[]>(key);
    return data ?? [];
}