import * as Location from "expo-location";

export async function getLatLon() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        throw new Error("Location permission denied");
    }

    const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
    });

    return {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
    };
}