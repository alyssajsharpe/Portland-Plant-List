import { Filters, Plant } from "./types";

export function matchesType(plant: Plant, filters: Filters): boolean {
  if (filters.type.length === 0) return true;

  return (
    (filters.type.includes("native") && plant.native_to_portland) ||
    (filters.type.includes("invasive") && !plant.native_to_portland)
  );
}

export function matchesCanopy(plant: Plant, filters: Filters): boolean {
  if (filters.canopy.length === 0) return true;

  return (
    (filters.canopy.includes("Large Tree") && plant.classification === "Large Tree") ||
    (filters.canopy.includes("Small Tree") && plant.classification === "Small Tree") || 
    (filters.canopy.includes("Large Shrub") && plant.classification === "Large Shrub") || 
    (filters.canopy.includes("Small/Medium Shrub") && plant.classification === "Small/Medium Shrub") || 
    (filters.canopy.includes("Ground Cover") && plant.classification === "Grass/Sedge/Rush") ||
    (filters.canopy.includes("Ground Cover") && plant.classification === "Forb")
  );
}

export function matchesSun(plant: Plant, filters: Filters): boolean {
  if (filters.sun.length === 0) return true;
  return plant.sun_requirement.some((sun) => {
    return (
      (filters.sun.includes("Full Sun") && sun === "Full Sun") ||
      (
        filters.sun.includes("Part Shade") && (sun === "Part Shade")
      ) ||
      (filters.sun.includes("Full Shade") && sun === "Full Shade")
    );
  });
}

export function matchesMoisture(plant: Plant, filters: Filters): boolean {
  if (filters.moisture.length === 0) return true;

  return (
    (filters.moisture.includes("Dry") && plant.moisture_conditions === "Dry") ||
    (filters.moisture.includes("Dry-moist") && plant.moisture_conditions === "Dry-moist") || 
    (filters.moisture.includes("Moist-seasonally wet") && plant.moisture_conditions === "Moist-seasonally wet") || 
    (filters.moisture.includes("Moist-perennially wet") && plant.moisture_conditions === "Moist-perennially wet") || 
    (filters.moisture.includes("Seasonally wet-submerged") && plant.moisture_conditions === "Seasonally wet-submerged") ||
    (filters.moisture.includes("Moist") && plant.moisture_conditions === "Moist") ||
    (filters.moisture.includes("Any moisture") && plant.moisture_conditions === "Any moisture")
  );
}

export function matchesHeight(plant: Plant, filters: Filters): boolean {
  if (filters.height.length === 0) return true;

  return (
    (plant.max_height_ft <= Number(filters.height))
  );
}

export function matchesSearch(plant: Plant, filters: Filters): boolean {
  let cleanedCommonName = plant.common_name.trim().replaceAll(" ", "").toLowerCase();
  let cleanedScientificName = plant.scientific_name.trim().replaceAll(" ", "").toLowerCase();
  let cleanedSearch = filters.search.trim().replaceAll(" ", "").toLowerCase();
  return (
    (cleanedCommonName.includes(cleanedSearch)) || (cleanedScientificName.includes(cleanedSearch))
  );
}