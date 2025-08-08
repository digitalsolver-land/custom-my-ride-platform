import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import { blogDB } from "./db";
import { BlogPostWithCategory } from "./types";

interface ListBlogPostsParams {
  limit?: Query<number>;
  offset?: Query<number>;
  category?: Query<string>;
  published_only?: Query<boolean>;
}

interface ListBlogPostsResponse {
  posts: BlogPostWithCategory[];
  total: number;
  has_more: boolean;
}

// Retrieves blog posts with optional filtering.
export const listBlogPosts = api<ListBlogPostsParams, ListBlogPostsResponse>(
  { expose: true, method: "GET", path: "/blog/posts" },
  async (params) => {
    const limit = params.limit || 10;
    const offset = params.offset || 0;
    const publishedOnly = params.published_only !== false;

    let whereConditions: string[] = [];
    let queryParams: any[] = [];
    let paramIndex = 1;

    if (publishedOnly) {
      whereConditions.push("p.published = true");
    }

    if (params.category) {
      whereConditions.push(`c.slug = $${paramIndex}`);
      queryParams.push(params.category);
      paramIndex++;
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const postsQuery = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        c.color as category_color
      FROM blog_posts p
      JOIN blog_categories c ON p.category_id = c.id
      ${whereClause}
      ORDER BY p.published_at DESC, p.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    queryParams.push(limit, offset);

    const posts = await blogDB.rawQueryAll<BlogPostWithCategory>(postsQuery, ...queryParams);

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM blog_posts p
      JOIN blog_categories c ON p.category_id = c.id
      ${whereClause}
    `;

    const countParams = queryParams.slice(0, -2); // Remove limit and offset
    const countResult = await blogDB.rawQueryRow<{ total: number }>(countQuery, ...countParams);
    const total = countResult?.total || 0;

    return {
      posts,
      total,
      has_more: offset + posts.length < total
    };
  }
);
