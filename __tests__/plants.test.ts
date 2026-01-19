import { addPlant, normalizeName, type Plant, plantExists, removePlant } from "../utils/plants";

function makePlant(overrides: Partial<Plant> = {}): Plant {
    return {
        id: overrides.id ?? "id-1",
        name: overrides.name ?? "Tomat",
        group: overrides.group ?? "Grönsaker",
        createdAt: overrides.createdAt ?? "2026- 01- 07T00:00:00.0002",
        details: overrides.details,
    };
}
test("normalizeName tar bort mellanslag och gör lowercase", () => {
    const result = normalizeName("  Tomat  ");
    expect(result).toBe("tomat");
})

test("plantExists hittar dublett oavsett stora/små bokstäver", () => {
    const plants: Plant[] = [
        makePlant({ name: "Tomat", group: "Grönsaker"}),
    ];
    expect(plantExists(plants, "tomat")).toBe(true);
    expect(plantExists(plants, " TOMAT ")).toBe(true);
    expect(plantExists(plants, "gurka")).toBe(false);
});

test("addPlant lägger till ny växt", () => {
    const plants: Plant[] =[makePlant({id: "id-1", name: "Tomat"})];

    const result = addPlant(plants, makePlant({id: "id-2", name: "Gurka"}));

    expect(result).toHaveLength(2);
    expect(result[1].name).toBe("Gurka");
    expect(plants).toHaveLength(1);
});

test("addPlant lägger inte till dublett (case-insensetive + trim", () => {
    const plants: Plant[] = [
        makePlant({id: "id-1", name: "Tomat", group: "Grönsaker"}),
    ];

    const result = addPlant(plants, makePlant({id: "id-2", name: "tOmat", group: "Grönsaker"}));

    expect(result).toHaveLength(1);
});

test("addPlant trimmar namnet när den lägger till", () => {
    const plants: Plant[] = [];
    const result = addPlant(plants, makePlant({id: "id-1", name: "Gurka", group: "Grönsaker"}));

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Gurka");
})

test("addPlant ändrar inte den urspungliga arrayen (immutability)", () => {
    const plants: Plant[] = [
        makePlant({id: "id-1", name: "Tomat", group: "Grönsaker"}),
    ];
    const result = addPlant(plants, makePlant({id: "id-2", name: "Gurka", group: "Grönsaker"}));

    expect(result).not.toBe(plants);
    expect(plants).toHaveLength(1);
})

test("removePlant tar bort växt med rätt id", () => {
    const plants: Plant[] = [
        {
            id: "1",
            name: "Tomat",
            group: "Grönsaker",
            createdAt: "2026-01-01T00:00:00.000Z",
        },
        {
            id: "2",
            name: "Gurka",
            group: "Grönsaker",
            createdAt: "2026-01-02T00:00:00.000Z",
        },
    ];
    const result = removePlant(plants, "1");

    expect(result).not.toBe(plants);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
    expect(plants).toHaveLength(2);
})