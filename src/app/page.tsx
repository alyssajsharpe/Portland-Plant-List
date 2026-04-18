"use client"
import styles from "./page.module.scss";
import plantJson from "../json/portland_plants.json";
import Searchbar from "../components/searchbar/Searchbar";
import MainContent from "../components/MainContent";
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { Filters, Plant } from "../helpers/types";
import Footer from "../components/navigation/Footer";
import Navigation from "../components/navigation/Navigation";
import {matchesType, matchesCanopy, matchesSun, matchesMoisture, matchesHeight, matchesSearch }from "../helpers/filterFunctions";

// Todo
// fix filtering, currently returning all results that match a specific checkbox
// Pagination
// Fix carousel
// Update plant page UI to look like the pet adoption page


export default function Home() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filters, setFilters] = useState<Filters>({
    type: [], // native vs invasive
    canopy: [], // large tree, small tree, large shrub, small shrub, grasses
    sun: [], // full sun, part shade/part sun, shade
    height: [], 
    moisture: [],
    search: ""
  });
  const [sliderValue, setSliderValue] = useState<number>(250);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    setPlants(plantJson.plants);
  }, []);

  let filteredPlants = plants.filter(
    (plant) => matchesType(plant, filters) &&
      matchesCanopy(plant, filters) &&
      matchesSun(plant, filters) &&
      matchesMoisture(plant, filters) &&
      matchesHeight(plant, filters) &&
      matchesSearch(plant, filters)
  );
    console.log("Filters: ", filters);
    console.log("Filtered plants: ", filteredPlants)


  // If all filters are deselected, reset the json
  useEffect(() => {
    if (filters.type.length === 0 &&
        filters.canopy.length === 0 &&
        filters.sun.length === 0 &&
        filters.moisture.length === 0) {
      setPlants(plantJson.plants);

    }
  }, [filters]);

  function resetFilters(){
    setFilters ({
      type: [], 
      canopy: [], 
      sun: [], 
      height: [], 
      moisture: [],
      search: "",
    })
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
              onFilterChangeAction={setFilters}
              resetFiltersAction={resetFilters}
              sliderValue={sliderValue}
              setSliderValueAction={setSliderValue}
            />
            <MainContent 
              plants={filteredPlants}
            />
        </div>
      </main>
      <Footer />
    </div>
  );
}

