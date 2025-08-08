export interface ServiceType {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  created_at: Date;
}

export interface ServiceRequest {
  id: number;
  service_type_id: number;
  client_name: string;
  client_email: string;
  client_phone?: string;
  vehicle_details?: string;
  budget_min?: number;
  budget_max?: number;
  timeline_months?: number;
  description?: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface RestorationProject {
  id: number;
  service_request_id?: number;
  project_name: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: number;
  start_date?: Date;
  estimated_completion?: Date;
  actual_completion?: Date;
  total_cost?: number;
  status: string;
  progress_percentage: number;
  description?: string;
  before_images?: any;
  after_images?: any;
  progress_images?: any;
  created_at: Date;
  updated_at: Date;
}

export interface AcquisitionRequest {
  id: number;
  service_request_id?: number;
  target_vehicle: string;
  target_year_min?: number;
  target_year_max?: number;
  condition_preference?: string;
  budget_max?: number;
  urgency_level: string;
  specific_requirements?: string;
  status: string;
  found_vehicle_details?: string;
  acquisition_cost?: number;
  commission_percentage: number;
  created_at: Date;
  updated_at: Date;
}
