CREATE TABLE countries (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(3) NOT NULL UNIQUE,
  flag_emoji VARCHAR(10) NOT NULL
);

CREATE TABLE brands (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  country_id BIGINT NOT NULL REFERENCES countries(id),
  logo_url TEXT,
  description TEXT,
  founded_year INTEGER
);

CREATE TABLE vehicle_types (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE vehicles (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  brand_id BIGINT NOT NULL REFERENCES brands(id),
  type_id BIGINT NOT NULL REFERENCES vehicle_types(id),
  year_start INTEGER NOT NULL,
  year_end INTEGER,
  engine_specs TEXT,
  power_hp INTEGER,
  top_speed_kmh INTEGER,
  acceleration_0_100 DOUBLE PRECISION,
  production_count INTEGER,
  estimated_value_min INTEGER,
  estimated_value_max INTEGER,
  rarity_level INTEGER CHECK (rarity_level >= 1 AND rarity_level <= 5),
  restoration_difficulty INTEGER CHECK (restoration_difficulty >= 1 AND restoration_difficulty <= 5),
  description TEXT,
  history TEXT,
  technical_specs JSONB,
  images JSONB,
  available_for_acquisition BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehicle_images (
  id BIGSERIAL PRIMARY KEY,
  vehicle_id BIGINT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

-- Insert initial data
INSERT INTO countries (name, code, flag_emoji) VALUES
('Allemagne', 'DE', '🇩🇪'),
('Italie', 'IT', '🇮🇹'),
('France', 'FR', '🇫🇷'),
('Angleterre', 'GB', '🇬🇧'),
('États-Unis', 'US', '🇺🇸'),
('Japon', 'JP', '🇯🇵');

INSERT INTO vehicle_types (name, description) VALUES
('Sportive', 'Voitures conçues pour la performance et la vitesse'),
('Luxury', 'Véhicules de luxe privilégiant le confort et le prestige'),
('Muscle Car', 'Voitures américaines puissantes des années 60-70'),
('GT', 'Grand Tourisme, voitures de voyage rapide et confortable'),
('Roadster', 'Voitures de sport décapotables à deux places'),
('Berline', 'Voitures familiales de prestige'),
('Coupé', 'Voitures à deux portes élégantes');

INSERT INTO brands (name, country_id, founded_year) VALUES
('Porsche', 1, 1931),
('BMW', 1, 1916),
('Mercedes-Benz', 1, 1926),
('Audi', 1, 1909),
('Ferrari', 2, 1939),
('Lamborghini', 2, 1963),
('Alfa Romeo', 2, 1910),
('Maserati', 2, 1914),
('Alpine', 3, 1955),
('Citroën', 3, 1919),
('Peugeot', 3, 1810),
('Jaguar', 4, 1922),
('Aston Martin', 4, 1913),
('Mini', 4, 1959),
('Ford', 5, 1903),
('Chevrolet', 5, 1911),
('Dodge', 5, 1900),
('Toyota', 6, 1937),
('Nissan', 6, 1933),
('Honda', 6, 1948);
