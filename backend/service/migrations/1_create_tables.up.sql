CREATE TABLE service_types (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE service_requests (
  id BIGSERIAL PRIMARY KEY,
  service_type_id BIGINT NOT NULL REFERENCES service_types(id),
  client_name VARCHAR(200) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50),
  vehicle_details TEXT,
  budget_min INTEGER,
  budget_max INTEGER,
  timeline_months INTEGER,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE restoration_projects (
  id BIGSERIAL PRIMARY KEY,
  service_request_id BIGINT REFERENCES service_requests(id),
  project_name VARCHAR(200) NOT NULL,
  vehicle_make VARCHAR(100),
  vehicle_model VARCHAR(100),
  vehicle_year INTEGER,
  start_date DATE,
  estimated_completion DATE,
  actual_completion DATE,
  total_cost INTEGER,
  status VARCHAR(50) DEFAULT 'planning',
  progress_percentage INTEGER DEFAULT 0,
  description TEXT,
  before_images JSONB,
  after_images JSONB,
  progress_images JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE acquisition_requests (
  id BIGSERIAL PRIMARY KEY,
  service_request_id BIGINT REFERENCES service_requests(id),
  target_vehicle VARCHAR(200) NOT NULL,
  target_year_min INTEGER,
  target_year_max INTEGER,
  condition_preference VARCHAR(100),
  budget_max INTEGER,
  urgency_level VARCHAR(50) DEFAULT 'normal',
  specific_requirements TEXT,
  status VARCHAR(50) DEFAULT 'searching',
  found_vehicle_details TEXT,
  acquisition_cost INTEGER,
  commission_percentage DOUBLE PRECISION DEFAULT 10.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial service types
INSERT INTO service_types (name, description, icon) VALUES
('Restauration Complète', 'Remise à neuf complète de votre véhicule de collection', 'wrench'),
('Acquisition sur Commande', 'Recherche et acquisition de voitures de collection spécifiques', 'search'),
('Expertise et Évaluation', 'Évaluation professionnelle de véhicules de collection', 'clipboard-check'),
('Maintenance Spécialisée', 'Entretien spécialisé pour véhicules de collection', 'settings');
