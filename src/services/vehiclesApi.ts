import { z } from "zod";

import { api } from "./api";
import {
  vehicleBrandSchema,
  vehicleSchema,
  vehicleTypeSchema,
  type NewVehiclePayload,
  type Vehicle,
  type VehicleBrand,
  type VehicleType,
} from "../schemas/vehicles";

function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error("La réponse du serveur ne correspond pas au format attendu.");
  }
  return result.data;
}

export async function listVehicleTypes(): Promise<VehicleType[]> {
  const response = await api.get("/vehicle-types");
  return parse(z.object({ data: z.array(vehicleTypeSchema) }), response.data).data;
}

export async function listVehicleBrands(): Promise<VehicleBrand[]> {
  const response = await api.get("/vehicle-brands");
  return parse(z.object({ data: z.array(vehicleBrandSchema) }), response.data).data;
}

export async function listVehicles(): Promise<Vehicle[]> {
  const response = await api.get("/vehicles");
  return parse(z.object({ data: z.array(vehicleSchema) }), response.data).data;
}

export async function createVehicle(payload: NewVehiclePayload): Promise<Vehicle> {
  const response = await api.post("/vehicles", payload);
  return parse(z.object({ vehicle: vehicleSchema }), response.data).vehicle;
}
