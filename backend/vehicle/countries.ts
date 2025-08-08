import { api } from "encore.dev/api";
import { vehicleDB } from "./db";
import { Country } from "./types";

interface ListCountriesResponse {
  countries: Country[];
}

// Retrieves all countries with available vehicles.
export const listCountries = api<void, ListCountriesResponse>(
  { expose: true, method: "GET", path: "/countries" },
  async () => {
    const countries = await vehicleDB.queryAll<Country>`
      SELECT DISTINCT c.* 
      FROM countries c
      JOIN brands b ON c.id = b.country_id
      JOIN vehicles v ON b.id = v.brand_id
      ORDER BY c.name
    `;

    return { countries };
  }
);
