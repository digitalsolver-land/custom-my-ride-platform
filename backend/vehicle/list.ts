import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import { vehicleDB } from "./db";
import { VehicleWithDetails } from "./types";

interface ListVehiclesParams {
  limit?: Query<number>;
  offset?: Query<number>;
  country_id?: Query<number>;
  brand_id?: Query<number>;
  type_id?: Query<number>;
  year_min?: Query<number>;
  year_max?: Query<number>;
  price_min?: Query<number>;
  price_max?: Query<number>;
  rarity_level?: Query<number>;
  available_only?: Query<boolean>;
  search?: Query<string>;
}

interface ListVehiclesResponse {
  vehicles: VehicleWithDetails[];
  total: number;
  has_more: boolean;
}

// Retrieves vehicles with advanced filtering options.
export const listVehicles = api<ListVehiclesParams, ListVehiclesResponse>(
  { expose: true, method: "GET", path: "/vehicles" },
  async (params) => {
    try {
      const limit = params.limit || 20;
      const offset = params.offset || 0;

      let whereConditions: string[] = [];
      let queryParams: any[] = [];
      let paramIndex = 1;

      if (params.country_id) {
        whereConditions.push(`c.id = $${paramIndex}`);
        queryParams.push(params.country_id);
        paramIndex++;
      }

      if (params.brand_id) {
        whereConditions.push(`b.id = $${paramIndex}`);
        queryParams.push(params.brand_id);
        paramIndex++;
      }

      if (params.type_id) {
        whereConditions.push(`vt.id = $${paramIndex}`);
        queryParams.push(params.type_id);
        paramIndex++;
      }

      if (params.year_min) {
        whereConditions.push(`v.year_start >= $${paramIndex}`);
        queryParams.push(params.year_min);
        paramIndex++;
      }

      if (params.year_max) {
        whereConditions.push(`v.year_start <= $${paramIndex}`);
        queryParams.push(params.year_max);
        paramIndex++;
      }

      if (params.price_min) {
        whereConditions.push(`v.estimated_value_min >= $${paramIndex}`);
        queryParams.push(params.price_min);
        paramIndex++;
      }

      if (params.price_max) {
        whereConditions.push(`v.estimated_value_max <= $${paramIndex}`);
        queryParams.push(params.price_max);
        paramIndex++;
      }

      if (params.rarity_level) {
        whereConditions.push(`v.rarity_level = $${paramIndex}`);
        queryParams.push(params.rarity_level);
        paramIndex++;
      }

      if (params.available_only) {
        whereConditions.push(`v.available_for_acquisition = true`);
      }

      if (params.search) {
        whereConditions.push(`(v.name ILIKE $${paramIndex} OR b.name ILIKE $${paramIndex})`);
        queryParams.push(`%${params.search}%`);
        paramIndex++;
      }

      const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

      const vehiclesQuery = `
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
        ${whereClause}
        ORDER BY v.name
        LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
      `;

      queryParams.push(limit, offset);

      const vehicles = await vehicleDB.rawQueryAll<VehicleWithDetails>(vehiclesQuery, ...queryParams);

      // Get vehicle images for each vehicle
      for (const vehicle of vehicles) {
        const images = await vehicleDB.queryAll`
          SELECT * FROM vehicle_images 
          WHERE vehicle_id = ${vehicle.id} 
          ORDER BY is_primary DESC, sort_order ASC
        `;
        vehicle.vehicle_images = images;
      }

      // Get total count
      const countQuery = `
        SELECT COUNT(*) as total
        FROM vehicles v
        JOIN brands b ON v.brand_id = b.id
        JOIN countries c ON b.country_id = c.id
        JOIN vehicle_types vt ON v.type_id = vt.id
        ${whereClause}
      `;

      const countParams = queryParams.slice(0, -2); // Remove limit and offset
      const countResult = await vehicleDB.rawQueryRow<{ total: number }>(countQuery, ...countParams);
      const total = countResult?.total || 0;

      return {
        vehicles,
        total,
        has_more: offset + vehicles.length < total
      };
    } catch (error) {
      console.error('Error in listVehicles:', error);
      throw error;
    }
  }
);
