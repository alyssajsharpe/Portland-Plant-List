"use client"
import styles from "./page.module.scss";
import plantJson from "../json/portland_plants.json";
import Searchbar from "../components/searchbar/Searchbar";
import MainContent from "../components/MainContent";
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect, useMemo, useState } from "react";
import { Filters, Plant } from "../helpers/types";
import Footer from "../components/navigation/Footer";
import Navigation from "../components/navigation/Navigation";
import {matchesType, matchesCanopy, matchesSun, matchesMoisture, matchesHeight, matchesSearch }from "../helpers/filterFunctions";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getFiltersFromURL, updateURL } from "@/helpers/misc";

// Todo
// ----------------------------------------------------
// Update plant page UI
// Add more images to plant json
// Fix suspense error, move code from home into new client component, keep this page server.

export default function Home() {

  const searchParams = useSearchParams();
  const plants: Plant[] = plantJson.plants; 

  const [filters, setFilters] = useState<Filters>(() =>
    getFiltersFromURL(searchParams)
  );
  const [sliderValue, setSliderValue] = useState<number>(250);
  const [searchValue, setSearchValue] = useState<string>("");
  const pathName = usePathname();
  const router = useRouter();

  // Pagination - display 12 plants on desktop, 8 on tablet/mobile
  const [pageSize, setPage] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState(1);
  console.log("current page: ", currentPage)
    useEffect(() => {
    const largerThanTablet = window.innerWidth > 1024;
    if (largerThanTablet) {
      setPage(12);
    } else {
      setPage(8);
    }
  }, []);

  useEffect(() => {
    setFilters(getFiltersFromURL(searchParams));
  }, [searchParams]);

  function handleFilterChange(updated: Filters) {
    setFilters(updated);
    updateURL(updated, pathName, router);
  }

 const filteredPlants = useMemo(() => {
  return plants.filter(
    (plant) =>
      matchesType(plant, filters) &&
      matchesCanopy(plant, filters) &&
      matchesSun(plant, filters) &&
      matchesMoisture(plant, filters) &&
      matchesHeight(plant, filters) &&
      matchesSearch(plant, filters)
  );
}, [plants, filters]);

  const currentFilteredPlants = filteredPlants.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Console logs
  console.log("current plants: ", currentFilteredPlants)
  console.log("Filters: ", filters);
  console.log("Filtered plants: ", filteredPlants)

  function resetFilters(){
    setFilters ({
      type: [], 
      canopy: [], 
      sun: [], 
      height: [], 
      moisture: [],
      search: "",
    })
    router.replace(pathName); 
    setSliderValue(250);
    setSearchValue("");
  }

  console.log("filtered plants: ", filteredPlants);
  return (
    <div className={styles.page}>
      <Navigation/>
      <main className={styles.main}>
        <Searchbar 
          onFilterChangeAction={setFilters} 
          filters={filters}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div className={styles.mainContainer}>
            <Sidebar 
              plants={plants} 
              resultsSize={filteredPlants.length} 
              filters={filters} 
              onFilterChangeAction={handleFilterChange}
              resetFiltersAction={resetFilters}
              sliderValue={sliderValue}
              setSliderValueAction={setSliderValue}
            />
            <MainContent 
              plants={currentFilteredPlants} 
              currentPage={currentPage}
              pageSize={Math.ceil(filteredPlants.length / pageSize)} 
              setCurrentPage={setCurrentPage}
            />
        </div>
      </main>
      <Footer />
    </div>
  );
}
