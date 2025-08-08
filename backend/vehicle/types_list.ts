import { api } from "encore.dev/api";
import { vehicleDB } from "./db";
import { VehicleType } from "./types";

interface ListVehicleTypesResponse {
  types: VehicleType[];
}

// Retrieves all vehicle types.
export const listVehicleTypes = api<void, ListVehicleTypesResponse>(
  { expose: true, method: "GET", path: "/vehicle-types" },
  async () => {
    try {
      const types = await vehicleDB.queryAll<VehicleType>`
        SELECT DISTINCT vt.* 
        FROM vehicle_types vt
        JOIN vehicles v ON vt.id = v.type_id
        ORDER BY vt.name
      `;

      return { types };
    } catch (error) {
      console.error('Error in listVehicleTypes:', error);
      throw error;
    }
  }
);
