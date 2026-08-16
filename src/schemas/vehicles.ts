import { z } from "zod";

export const vehicleTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  max_passengers: z.number(),
  icon: z.string(),
});

export type VehicleType = z.infer<typeof vehicleTypeSchema>;

export const vehicleModelSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type VehicleModelOption = z.infer<typeof vehicleModelSchema>;

export const vehicleBrandSchema = z.object({
  id: z.number(),
  name: z.string(),
  models: z.array(vehicleModelSchema),
});

export type VehicleBrand = z.infer<typeof vehicleBrandSchema>;

const fuelTypeSchema = z.enum(["essence", "diesel", "hybride", "electrique", "gpl"]);

export type FuelType = z.infer<typeof fuelTypeSchema>;

export const FUEL_TYPE_OPTIONS: { value: FuelType; label: string }[] = [
  { value: "essence", label: "Essence" },
  { value: "diesel", label: "Diesel" },
  { value: "hybride", label: "Hybride" },
  { value: "electrique", label: "Électrique" },
  { value: "gpl", label: "GPL" },
];

export const vehicleSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  registration: z.string(),
  color: z.string(),
  year: z.number(),
  fuel_type: fuelTypeSchema,
  seats: z.number(),
  status: z.string(),
  brand: z.object({ id: z.number(), name: z.string() }),
  model: z.object({ id: z.number(), name: z.string() }),
  vehicle_type: z.object({ id: z.number(), name: z.string(), icon: z.string() }),
  created_at: z.string(),
});

export type Vehicle = z.infer<typeof vehicleSchema>;

export type NewVehiclePayload = {
  vehicle_type_id: number;
  brand_id: number;
  model_id: number;
  registration: string;
  color: string;
  year: number;
  fuel_type: FuelType;
  seats: number;
};
