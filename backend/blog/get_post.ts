import { api, APIError } from "encore.dev/api";
import { blogDB } from "./db";
import { BlogPostWithCategory } from "./types";

interface GetBlogPostParams {
  slug: string;
}

// Retrieves a specific blog post by slug.
export const getBlogPost = api<GetBlogPostParams, BlogPostWithCategory>(
  { expose: true, method: "GET", path: "/blog/posts/:slug" },
  async (params) => {
    const post = await blogDB.queryRow<BlogPostWithCategory>`
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        c.color as category_color
      FROM blog_posts p
      JOIN blog_categories c ON p.category_id = c.id
      WHERE p.slug = ${params.slug} AND p.published = true
    `;

    if (!post) {
      throw APIError.notFound("Blog post not found");
    }

    return post;
  }
);
