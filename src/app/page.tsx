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
import {matchesType, matchesCanopy, matchesSun, matchesMoisture, matchesHeight, matchesSearch, matchesRank }from "../helpers/filterFunctions";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getFiltersFromURL, updateURL } from "@/helpers/misc";

// ************************************
// TODO
// ************************************
// 
// 

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
  const [showFilters, setShowFilters] = useState(true);

  // Pagination - display 12 plants on desktop, 8 on tablet/mobile
  const [pageSize, setPage] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState(1);

  // When the user clicks on the prev/next buttons on tablet/mobile, they should be brought up to the top of the page. 
  // If the filter is open, consider that with the window scroll. 
  function resetUserViewOnClick(value: number) {
    setCurrentPage(value);

    let viewPoint = window.visualViewport;
    if(viewPoint?.width && viewPoint?.width <= 1024) {
      if(showFilters == true) {
        // Adjust height for filters being open
        window.scrollTo({
          top: 1450,
          left: 0,
          behavior: "smooth" 
        });
      } else {
        // Adjust height for filters being closed
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth" 
        });
      }
    }
  }

    useEffect(() => {
      const largerThanTablet = window.innerWidth > 1024;
      if(filters.page === "0"){
        filters.page = "1";
      }
      // Update the page depending on the url parameters
      setCurrentPage(filters.page ? Number(filters.page) : 1);
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
      matchesSearch(plant, filters) &&
      matchesRank(plant, filters)
  );
}, [plants, filters]);

  const currentFilteredPlants = filteredPlants.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Console logs
  // console.log("current plants: ", currentFilteredPlants)
  // console.log("Filters: ", filters);
  // console.log("Filtered plants: ", filteredPlants)

  function resetFilters(){
    setFilters ({
      type: [], 
      canopy: [], 
      sun: [], 
      height: [], 
      moisture: [],
      search: "",
      invasive_rank: []
    })
    router.replace(pathName); 
    setSliderValue(250);
    setSearchValue("");
  }

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
              showFilters={showFilters}
              onFilterChangeAction={handleFilterChange}
              resetFiltersAction={resetFilters}
              sliderValue={sliderValue}
              setSliderValueAction={setSliderValue}
              onShowFiltersChange={setShowFilters}
            />
            <MainContent 
              plants={currentFilteredPlants} 
              currentPage={currentPage}
              pageSize={Math.ceil(filteredPlants.length / pageSize)} 
              setCurrentPage={resetUserViewOnClick}
            />
        </div>
      </main>
      <Footer />
    </div>
  )
}
