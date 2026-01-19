export type PlantDetails = {
  height?: {
    value: number;
    unit: "cm"|"m";
  };
  flowerColor?: string;
  producesFruit?: boolean;
  blooms?: boolean;
  harvestFromMonth?: number;
  harvestToMonth?: number;
}

export type Plant = {
  id: string;
  name: string;
  group: string;
  createdAt: string;
  details?: PlantDetails;
};

export function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

export function plantExists(plants: Plant[], name: string): boolean {
  const n = normalizeName(name);
  return plants.some(p => normalizeName(p.name) === n);
}

export function addPlant(plants: Plant[], newPlant: Plant): Plant[] {
  if (plantExists(plants, newPlant.name)) {
    return plants; // ingen dublett
  }
  return [
    ...plants,
    { ...newPlant, name: newPlant.name.trim() },
  ];
}

export function removePlant(plants: Plant[], id: string): Plant[] {
  return plants.filter(p => p.id !== id);
}

export function updatePlant(plants: Plant[], updated: Plant): Plant[] {
  return plants.map(p => (p.id === updated.id ? updated : p));
}

