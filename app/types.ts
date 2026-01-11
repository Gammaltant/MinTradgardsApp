export type Plant = {
    name: string;
    group: "Blommor" | "Grönsaker" | "Buskar/Träd" ;
};

export type NavigationParams = {
    'plants-add': undefined;
    'plants': { newPlant: Plant } | undefined;
}