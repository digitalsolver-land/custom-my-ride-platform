export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color: string;
  created_at: Date;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category_id: number;
  featured_image?: string;
  author_name: string;
  published: boolean;
  published_at?: Date;
  reading_time_minutes?: number;
  tags?: string[];
  seo_title?: string;
  seo_description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface BlogPostWithCategory extends BlogPost {
  category_name: string;
  category_slug: string;
  category_color: string;
}
