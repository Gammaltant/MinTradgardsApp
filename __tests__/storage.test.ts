import { loadData, saveData } from "@/utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
}));

it("Returnerar tom Array när ingent finns sparat", async () => {
    const result = await loadData<any>("plants");
    expect(result).toEqual([]);
});

it("Sparar och laddar växter", async () => {
    const plants = [{id: "1", name: "Tomat", group: "Grönsaker", createdAt: "2026-01-01"}];

    (AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(undefined);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(plants));

    await saveData("plants", plants);
    const result = await loadData<typeof plants[0]>("plants");

    expect(AsyncStorage.setItem).toHaveBeenCalledWith("plants", JSON.stringify(plants));
    expect(result).toEqual(plants);
});

it("Returnerar tom Array för okänd key", async () => {
    const result = await loadData<any>("does-not-exist");
    expect(result).toEqual([]);
});

it("Returnerar [] när AsyncStorage kastar fel", async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error("Storage error"));
    
    await expect(loadData<any>("plants")).resolves.toEqual([]);
});

it("Returnerar data när Async storage innehåller JSON", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify([{ name: "Tomat", group: "Grönsaker"}])
    );

    const result = await loadData<any>("plants");
    expect(result).toEqual([{ name: "Tomat", group: "Grönsaker"}]);
})