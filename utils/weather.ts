type DailyWeather = {
    time: string[];
    precipitation_sum: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
};

type OpenMeteoResponse = { daily: DailyWeather };

export async function fetchDailyWeather(lat: number, lon: number) {
    console.log("✅ fetchDailyWeather() RUNS FROM utils/weather.ts");

    const params = new URLSearchParams({
        latitude: String(lat),
        longitude: String(lon),
        daily: "precipitation_sum,temperature_2m_max,temperature_2m_min",
        forecast_days: "10",
        timezone: "auto",
    })
    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
    console.log("params:", params.toString());


    console.log("🌍 Open-Meteo URL:", url);

    const res = await fetch(url);
    if (!res.ok) {
        const text = await res.text().catch(() => "");
         console.log("❌ Weather API status:", res.status, text);
        throw new Error("Weather API error");
    }

    const data = (await res.json()) as OpenMeteoResponse;

    console.log("✅ daily lengths", {
  time: data.daily.time?.length,
  precip: data.daily.precipitation_sum?.length,
  tmax: data.daily.temperature_2m_max?.length,
  tmin: data.daily.temperature_2m_min?.length,
});
console.log("✅ sample", {
  precipLast3: data.daily.precipitation_sum?.slice(-3),
  tmaxLast3: data.daily.temperature_2m_max?.slice(-3),
});

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
    if (arr.length === 0) return 0;

const sum = arr.reduce((total, value) => total + value, 0);
return sum / arr.length;
}

export function shouldWaterToday(daily: DailyWeather) {
    const daysDry = daysSinceMeaningfulRain(daily, 3);
    const avgMaxTemp = avgTempLastDays(daily.temperature_2m_max, 3);
    const lastMinTemp = daily.temperature_2m_min.at(-1) ?? 0;

    // Skydd: vattna inte om det är för kallt
    if (avgMaxTemp <= 5) return false;
    if (lastMinTemp <= 0) return false;

    // Torrt läge -> vattna
    if (daysDry >= 3) return true;

    // Varmt + lite torrt -> vattna tidigare
    if (avgMaxTemp >= 22 && daysDry >= 2) return true;

    return false;

}