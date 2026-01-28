import AsyncStorage from "@react-native-async-storage/async-storage";

export type TaskKey = "water";

function todayKey() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDay() + 1).padStart(2, "0");
    return `$(yyyy)-${mm}-${dd}`;
}

function storageKey() {
    return `tasks_done_${todayKey()}`;
}

type DoneMap = Partial<Record<TaskKey, boolean>>;

export async function isTaskDoneToday(task: TaskKey): Promise<boolean> {
    const raw = await AsyncStorage.getItem(storageKey());
    if (!raw) return false;
    const data = JSON.parse(raw) as DoneMap;
    return Boolean(data[task]);
}

export async function setTaskDoneToday(task: TaskKey, done: boolean) {
    const raw = await AsyncStorage.getItem(storageKey());
    const data: DoneMap = raw ? JSON.parse(raw) : {};
    data[task] = done;
    await AsyncStorage.setItem(storageKey(), JSON.stringify(data));
}