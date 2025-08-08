import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import { vehicleDB } from "./db";
import { Brand } from "./types";

interface ListBrandsParams {
  country_id?: Query<number>;
}

interface ListBrandsResponse {
  brands: Brand[];
}

// Retrieves all brands, optionally filtered by country.
export const listBrands = api<ListBrandsParams, ListBrandsResponse>(
  { expose: true, method: "GET", path: "/brands" },
  async (params) => {
    try {
      let brands;
      
      if (params.country_id) {
        brands = await vehicleDB.queryAll<Brand>`
          SELECT DISTINCT b.* 
          FROM brands b
          JOIN vehicles v ON b.id = v.brand_id
          WHERE b.country_id = ${params.country_id}
          ORDER BY b.name
        `;
      } else {
        brands = await vehicleDB.queryAll<Brand>`
          SELECT DISTINCT b.* 
          FROM brands b
          JOIN vehicles v ON b.id = v.brand_id
          ORDER BY b.name
        `;
      }

      return { brands };
    } catch (error) {
      console.error('Error in listBrands:', error);
      throw error;
    }
  }
);
