import { api, APIError } from "encore.dev/api";
import { vehicleDB } from "./db";
import { VehicleWithDetails } from "./types";

interface GetVehicleParams {
  id: number;
}

// Retrieves a specific vehicle with all its details.
export const getVehicle = api<GetVehicleParams, VehicleWithDetails>(
  { expose: true, method: "GET", path: "/vehicles/:id" },
  async (params) => {
    const vehicle = await vehicleDB.queryRow<VehicleWithDetails>`
      SELECT 
        v.*,
        b.name as brand_name,
        c.name as country_name,
        c.flag_emoji as country_flag,
        vt.name as type_name
      FROM vehicles v
      JOIN brands b ON v.brand_id = b.id
      JOIN countries c ON b.country_id = c.id
      JOIN vehicle_types vt ON v.type_id = vt.id
      WHERE v.id = ${params.id}
    `;

    if (!vehicle) {
      throw APIError.notFound("Vehicle not found");
    }

    // Get vehicle images
    const images = await vehicleDB.queryAll`
      SELECT * FROM vehicle_images 
      WHERE vehicle_id = ${params.id} 
      ORDER BY is_primary DESC, sort_order ASC
    `;

    vehicle.vehicle_images = images;

    return vehicle;
  }
);
