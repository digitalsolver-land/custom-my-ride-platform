import { api } from "encore.dev/api";
import { blogDB } from "./db";
import { BlogCategory } from "./types";

interface ListBlogCategoriesResponse {
  categories: BlogCategory[];
}

// Retrieves all blog categories.
export const listBlogCategories = api<void, ListBlogCategoriesResponse>(
  { expose: true, method: "GET", path: "/blog/categories" },
  async () => {
    const categories = await blogDB.queryAll<BlogCategory>`
      SELECT * FROM blog_categories ORDER BY name
    `;

    return { categories };
  }
);
