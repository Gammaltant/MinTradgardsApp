type DailyWeather = {
    time: string[];
    precipitation_sum: number[];
    temperature_2m_max: number[];
    temperatur_2m_min: number[];
};

type OpenMeteoResponse = {
    daily: DailyWeather;
}

export async function fetchDailyWeather(lat: number, lon: number) {
    const params = new URLSearchParams({
        latitude: String(lat),
        longitude: String(lon),
        daily: "precipitation_sum,temperature_2m_max,temperarure_2m_min",
        forecast_days: "10",
        timezone: "auto",
    })
    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

    console.log("🌍 Open-Meteo URL:", url);

    const res = await fetch(url);
    if (!res.ok) {
        const text = await res.text().catch(() => "");
         console.log("❌ Weather API status:", res.status, text);
        throw new Error("Weather API error");
    }

    const data = (await res.json()) as OpenMeteoResponse;
    return data.daily;
}

export function daysSinceMeaningfulRain(
    daily: DailyWeather,
    meaningfulMm = 3
){
    for (let i = daily.precipitation_sum.length - 1, days = 0; i >= 0; i--, days++) {
        if (daily.precipitation_sum[i] >= meaningfulMm) return days;
    }
    return daily.precipitation_sum.length;
}

export function avgTempLastDays(values: number[], n: number): number {
    const arr = values.slice(-n);
    if (arr.length === 0) {
        return 0;
}

const sum = arr.reduce((total, value) => total + value, 0);
return sum / arr.length;
}