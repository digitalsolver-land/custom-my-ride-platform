export interface Country {
  id: number;
  name: string;
  code: string;
  flag_emoji: string;
}

export interface Brand {
  id: number;
  name: string;
  country_id: number;
  logo_url?: string;
  description?: string;
  founded_year?: number;
}

export interface VehicleType {
  id: number;
  name: string;
  description?: string;
}

export interface Vehicle {
  id: number;
  name: string;
  brand_id: number;
  type_id: number;
  year_start: number;
  year_end?: number;
  engine_specs?: string;
  power_hp?: number;
  top_speed_kmh?: number;
  acceleration_0_100?: number;
  production_count?: number;
  estimated_value_min?: number;
  estimated_value_max?: number;
  rarity_level: number;
  restoration_difficulty: number;
  description?: string;
  history?: string;
  technical_specs?: any;
  images?: any;
  available_for_acquisition: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface VehicleWithDetails extends Vehicle {
  brand_name: string;
  country_name: string;
  country_flag: string;
  type_name: string;
  vehicle_images: VehicleImage[];
}

export interface VehicleImage {
  id: number;
  vehicle_id: number;
  url: string;
  alt_text?: string;
  is_primary: boolean;
  sort_order: number;
}

export interface VehicleFilters {
  country_id?: number;
  brand_id?: number;
  type_id?: number;
  year_min?: number;
  year_max?: number;
  price_min?: number;
  price_max?: number;
  rarity_level?: number;
  available_only?: boolean;
}
