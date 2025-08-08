import { api } from "encore.dev/api";
import { serviceDB } from "./db";
import { ServiceType } from "./types";

interface ListServiceTypesResponse {
  service_types: ServiceType[];
}

// Retrieves all available service types.
export const listServiceTypes = api<void, ListServiceTypesResponse>(
  { expose: true, method: "GET", path: "/service-types" },
  async () => {
    const service_types = await serviceDB.queryAll<ServiceType>`
      SELECT * FROM service_types ORDER BY name
    `;

    return { service_types };
  }
);
