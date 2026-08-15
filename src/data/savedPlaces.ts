export type SavedPlace = {
  id: string;
  label: string;
  address: string;
};

// fausse data qui sera remplacé par les données en bdd
export const SAVED_PLACES: SavedPlace[] = [
  { id: "1", label: "Christine", address: "13 Rue toi même tu sais" },
  { id: "2", label: "Maison", address: "18 rue de la flamme" },
];
