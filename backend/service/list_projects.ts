import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import { serviceDB } from "./db";
import { RestorationProject } from "./types";

interface ListProjectsParams {
  limit?: Query<number>;
  status?: Query<string>;
}

interface ListProjectsResponse {
  projects: RestorationProject[];
}

// Retrieves restoration projects for showcase.
export const listRestorationProjects = api<ListProjectsParams, ListProjectsResponse>(
  { expose: true, method: "GET", path: "/restoration-projects" },
  async (params) => {
    const limit = params.limit || 10;
    let whereClause = "";
    const queryParams: any[] = [];

    if (params.status) {
      whereClause = "WHERE status = $1";
      queryParams.push(params.status);
    }

    const query = `
      SELECT * FROM restoration_projects 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT $${queryParams.length + 1}
    `;

    queryParams.push(limit);

    const projects = await serviceDB.rawQueryAll<RestorationProject>(query, ...queryParams);

    return { projects };
  }
);
