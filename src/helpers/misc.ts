import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Filters } from "./types";

export function getFiltersFromURL(params: URLSearchParams): Filters {
  return {
    type: params.get("type")?.split(",") ?? [],
    canopy: params.get("canopy")?.split(",") ?? [],
    sun: params.get("sun")?.split(",") ?? [],
    height: params.get("height")?.split(",") ?? [],
    moisture: params.get("moisture")?.split(",") ?? [],
    search: params.get("search") ?? ""
  };
}

export function updateURL(filters: Filters, pathname: string, router: AppRouterInstance) {
  const params = new URLSearchParams();
  if (filters.type.length > 0)
    params.set("type", filters.type.join(","));

  if (filters.sun.length > 0)
    params.set("sun", filters.sun.join(","));

  if (filters.canopy.length > 0)
    params.set("canopy", filters.canopy.join(","));

  console.log("filter height: ", filters.height)
  if (filters.height.length > 0)
    params.set("height", filters.height.join(","));

  if (filters.moisture.length > 0)
    params.set("moisture", filters.moisture.join(","));

  if (filters.search != "")
    params.set("search", filters.search);

  const queryString = params.toString();
  const url = queryString ? `${pathname}?${queryString}` : pathname;

  router.replace(url); 
}
