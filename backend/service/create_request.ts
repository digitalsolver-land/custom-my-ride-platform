import { api } from "encore.dev/api";
import { serviceDB } from "./db";
import { ServiceRequest } from "./types";

interface CreateServiceRequestParams {
  service_type_id: number;
  client_name: string;
  client_email: string;
  client_phone?: string;
  vehicle_details?: string;
  budget_min?: number;
  budget_max?: number;
  timeline_months?: number;
  description?: string;
}

interface CreateServiceRequestResponse {
  request: ServiceRequest;
}

// Creates a new service request from a client.
export const createServiceRequest = api<CreateServiceRequestParams, CreateServiceRequestResponse>(
  { expose: true, method: "POST", path: "/service-requests" },
  async (params) => {
    const request = await serviceDB.queryRow<ServiceRequest>`
      INSERT INTO service_requests (
        service_type_id, client_name, client_email, client_phone,
        vehicle_details, budget_min, budget_max, timeline_months, description
      ) VALUES (
        ${params.service_type_id}, ${params.client_name}, ${params.client_email}, ${params.client_phone},
        ${params.vehicle_details}, ${params.budget_min}, ${params.budget_max}, ${params.timeline_months}, ${params.description}
      )
      RETURNING *
    `;

    if (!request) {
      throw new Error("Failed to create service request");
    }

    return { request };
  }
);
