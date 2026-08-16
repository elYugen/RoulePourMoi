export type Vehicle = {
  id: string;
  name: string;
  plate: string;
  color: string;
  notes?: string;
};

export const CLIENT_VEHICLES: Vehicle[] = [
  { id: "1", name: "Toyota Yaris", plate: "HH-404-WW", color: "Blanc" },
  { id: "2", name: "Peugeot 208", plate: "GT-512-CV", color: "Gris" },
];
