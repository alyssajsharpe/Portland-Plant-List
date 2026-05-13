
export interface Plant {
    id: number;
    common_name: string;
    scientific_name: string;
    classification: string;
    category: string;
    max_height_ft: number;
    sun_requirement: string[];
    moisture_conditions: string;
    native_to_portland: boolean;
    bloom_season?: string;
    wildlife_value?: string;
    notes: string;
    images?: string[]

    // Weed values
    invasive_rank?: string;
    origin?: string;
    on_required_eradication_list?: boolean;
    removal_recommended?: boolean;
    health_hazard?: string;
}

export interface Filters {
  type: string[];
  canopy: string[];
  sun: string[];
  height: string[];
  moisture: string[];
  search: string;
  invasive_rank?: string[];
}