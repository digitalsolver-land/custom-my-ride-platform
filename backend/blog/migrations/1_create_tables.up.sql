CREATE TABLE blog_categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#000000',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  category_id BIGINT NOT NULL REFERENCES blog_categories(id),
  featured_image TEXT,
  author_name VARCHAR(100) DEFAULT 'Custom My Ride',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  reading_time_minutes INTEGER,
  tags JSONB,
  seo_title VARCHAR(300),
  seo_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial categories
INSERT INTO blog_categories (name, slug, description, color) VALUES
('Guides d''Achat', 'guides-achat', 'Conseils pour acheter des voitures de collection', '#e74c3c'),
('Restauration', 'restauration', 'Techniques et conseils de restauration', '#3498db'),
('Histoire Automobile', 'histoire-automobile', 'L''histoire des marques et modèles iconiques', '#f39c12'),
('Marché et Investissement', 'marche-investissement', 'Analyses du marché des voitures de collection', '#27ae60'),
('Actualités', 'actualites', 'Dernières nouvelles du monde automobile', '#9b59b6');

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, category_id, featured_image, published, published_at, reading_time_minutes, tags) VALUES
('Guide d''achat : Porsche 911 Classique', 'guide-achat-porsche-911-classique', 'Tout ce qu''il faut savoir avant d''acheter une Porsche 911 classique', 'La Porsche 911 est l''une des voitures de sport les plus iconiques au monde...', 1, '/images/blog/porsche-911-guide.jpg', true, CURRENT_TIMESTAMP, 8, '["porsche", "911", "guide", "achat"]'),
('Les étapes d''une restauration complète', 'etapes-restauration-complete', 'Découvrez le processus détaillé d''une restauration automobile', 'Une restauration complète nécessite une planification minutieuse...', 2, '/images/blog/restoration-process.jpg', true, CURRENT_TIMESTAMP, 12, '["restauration", "processus", "technique"]'),
('L''évolution de Ferrari dans les années 60', 'evolution-ferrari-annees-60', 'Comment Ferrari a révolutionné l''automobile de sport', 'Les années 1960 marquent un tournant décisif pour Ferrari...', 3, '/images/blog/ferrari-60s.jpg', true, CURRENT_TIMESTAMP, 10, '["ferrari", "histoire", "années 60"]'),
('Investir dans les voitures japonaises classiques', 'investir-voitures-japonaises-classiques', 'Pourquoi les JDM sont le nouvel eldorado des collectionneurs', 'Le marché des voitures japonaises classiques explose...', 4, '/images/blog/jdm-investment.jpg', true, CURRENT_TIMESTAMP, 6, '["investissement", "japon", "jdm", "marché"]');
