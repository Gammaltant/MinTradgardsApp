import { avgTempLastDays, daysSinceMeaningfulRain, shouldWaterToday } from "@/utils/weather";

function makeDaily(overrides?: Partial<any>) {
    return {
        time: ["2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04"],
        precipitation_sum: [0, 0, 0, 0],
        temperature_2m_max: [10, 10, 10, 10],
        temperature_2m_min: [2, 2, 2, 2],
        ...overrides,
    };
}

it("avgTempLastDays räknar genomsnittet av de 2 sista dagarna", () => {
    expect(avgTempLastDays([10, 20, 30], 2)).toBe(25);
});

it("daysSinceMeaningfulRain, räknar dagar sedan senast regn >= 3mm", () => {
    const daily = makeDaily({ precipitation_sum: [0, 0, 5, 0] });
    expect(daysSinceMeaningfulRain(daily, 3)).toBe(1);
});

it("shouldWaterToday = true när det varit torrt i 3 dagar", () => {
    const daily = makeDaily({ precipitation_sum: [0, 0, 0, 0] });
    expect(shouldWaterToday(daily)).toBe(true);
});

it("shouldWaterToday = false om det regnat nyligen", () => {
    const daily = makeDaily({ precipitation_sum: [0, 0, 4, 0] });
    expect(shouldWaterToday(daily)).toBe(false);
});

it("shoulWaterToday = true när det är varmt, och nästan torrt", () => {
    const daily = makeDaily({ 
        precipitation_sum: [0, 0, 0, 2],
        temperature_2m_max: [23, 24, 25, 26],
    });
    expect(shouldWaterToday(daily)).toBe(true);
});

   