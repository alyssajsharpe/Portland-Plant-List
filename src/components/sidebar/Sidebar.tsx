"use client"
import Image from "next/image";
import styles from "./sidebar.module.scss";
import { Filters, Plant } from "@/helpers/types";
import { useEffect, useState } from "react";

export default function Sidebar({
  plants,
  filters,
  resultsSize,
  sliderValue,
  onFilterChangeAction,
  resetFiltersAction,
  setSliderValueAction
} : {
  plants: Plant[]
  filters: Filters;
  resultsSize: number;
  sliderValue: number;
  onFilterChangeAction: (filters: Filters) => void;
  resetFiltersAction: () => void;
  setSliderValueAction: (value: number) => void;
}) {

  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    const mobile = window.innerWidth <= 768;
    if (mobile) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  }, []);
  
  function handleFilterDisplay() {
    setShowFilters(prev => !prev);
  }
  
  // Filter update functions
  function updateTypeFilter(value: string, checked: boolean) {
    let updatedType: string[];
    // User checked box, add the new filter value to filters
    if (checked) {updatedType = [...filters.type, value];
    // User unchecked box, remove the filter from filters
    } else{updatedType = filters.type.filter((v) => v !== value);}
    onFilterChangeAction({ ...filters,type: updatedType});
  }

  function updateCanopyFilter(value: string, checked: boolean) {
    let updatedCanopy: string[];
    if (checked) { updatedCanopy = [...filters.canopy, value];
    } else {updatedCanopy = filters.canopy.filter((v) => v !== value);}
    onFilterChangeAction({...filters,canopy: updatedCanopy});
  }

  function updateSunFilter(value: string, checked: boolean) {
    let updatedSun: string[];
    if (checked) { updatedSun = [...filters.sun, value];
    } else {updatedSun = filters.sun.filter((v) => v !== value);}

    onFilterChangeAction({...filters,sun: updatedSun});
  }

  function updateMoistureFilter(value: string, checked: boolean) {
    let updatedMoisture: string[];
    if (checked) { updatedMoisture = [...filters.moisture, value];
    } else {updatedMoisture = filters.moisture.filter((v) => v !== value);}

    onFilterChangeAction({...filters,moisture: updatedMoisture});
  }

  function updateHeightFilter(value: string) {
    let updatedHeight: string[];
    updatedHeight = [value]
    setSliderValueAction(Number(value));
    onFilterChangeAction({...filters, height: updatedHeight});
  }

  return (
    <div className={styles.sidebarWrapper}>
      <h3>Total plants ({resultsSize})</h3>
      {/* {showFilters && */}
        <div id="filters" className={`${styles.filterItems} ${showFilters ? styles.show : styles.hide}`}>
          <div className={styles.filter}>
            <h5>Type</h5>
            <div className={styles.items}>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                  <input type="checkbox" value="native" 
                    onChange={(e) => updateTypeFilter(e.target.value, e.target.checked)} 
                    checked={filters.type.includes("native")}/>
                  <span className="checkmark"></span>
                   Native
                </label>
              </div>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                  <input type="checkbox" value="invasive" 
                    onChange={(e) => updateTypeFilter(e.target.value, e.target.checked)} 
                    checked={filters.type.includes("invasive")}/>
                  <span className="checkmark"></span>
                   Invasive weed
                </label>
              </div>
            </div>
          </div>
          {/* Canopy */}
          <div className={styles.filter}>
            <h5>Canopy</h5>
            <div className={styles.items}>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                  <input type="checkbox" value="Large Tree" 
                    onChange={(e) => updateCanopyFilter(e.target.value, e.target.checked)} 
                    checked={filters.canopy.includes("Large Tree")}/>
                  <span className="checkmark"></span>
                   Large Tree (60ft+)
                </label>
              </div>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                 <input type="checkbox" value="Small Tree" 
                    onChange={(e) => updateCanopyFilter(e.target.value, e.target.checked)} 
                    checked={filters.canopy.includes("Small Tree")}/>
                  <span className="checkmark"></span>
                   Small Tree (20-30ft)
                </label>
              </div>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                  <input type="checkbox" value="Large Shrub" 
                    onChange={(e) => updateCanopyFilter(e.target.value, e.target.checked)} 
                    checked={filters.canopy.includes("Large Shrub")}/>
                  <span className="checkmark"></span>
                   Large Shrubs/Vines (5-20ft)
                </label>
              </div>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                   <input type="checkbox" value="Small/Medium Shrub" 
                    onChange={(e) => updateCanopyFilter(e.target.value, e.target.checked)} 
                    checked={filters.canopy.includes("Small/Medium Shrub")}/>
                  <span className="checkmark"></span>
                   Small and Medium Shrubs (less than 5ft)
                </label>
              </div>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                   <input type="checkbox" value="Ground Cover" 
                    onChange={(e) => updateCanopyFilter(e.target.value, e.target.checked)} 
                    checked={filters.canopy.includes("Ground Cover")}/>
                  <span className="checkmark"></span>
                   Ground cover
                </label>
              </div>
            </div>
          </div>

          {/* Sun */}
          <div className={styles.filter}>
            <h5>Sun Requirements</h5>
            <div className={styles.items}>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                  <input type="checkbox" value="Full Sun" 
                    onChange={(e) => updateSunFilter(e.target.value, e.target.checked)} 
                    checked={filters.sun.includes("Full Sun")}/>
                  <span className="checkmark"></span>
                   Full sun
                </label>
              </div>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                  <input type="checkbox" value="Part Shade" 
                    onChange={(e) => updateSunFilter(e.target.value, e.target.checked)} 
                    checked={filters.sun.includes("Part Shade")}/>
                  <span className="checkmark"></span>
                   Part Shade
                </label>
              </div>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                  <input type="checkbox" value="Full Shade" 
                    onChange={(e) => updateSunFilter(e.target.value, e.target.checked)} 
                    checked={filters.sun.includes("Full Shade")}/>
                  <span className="checkmark"></span>
                   Full shade
                </label>
              </div>
            </div>
          </div>

          
          {/* Moisture */}
          <div className={styles.filter}>
            <h5>Moisture Conditions</h5>
            <div className={styles.items}>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                   <input type="checkbox" value="Dry" 
                    onChange={(e) => updateMoistureFilter(e.target.value, e.target.checked)} 
                    checked={filters.moisture.includes("Dry")}/>
                  <span className="checkmark"></span>
                  Dry
                </label>
              </div>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                  <input type="checkbox" value="Dry-moist" 
                    onChange={(e) => updateMoistureFilter(e.target.value, e.target.checked)} 
                    checked={filters.moisture.includes("Dry-moist")}/>
                  <span className="checkmark"></span>
                  Dry-moist
                </label>
              </div>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                  <input type="checkbox" value="Moist-seasonally wet" 
                    onChange={(e) => updateMoistureFilter(e.target.value, e.target.checked)} 
                    checked={filters.moisture.includes("Moist-seasonally wet")}/>
                  <span className="checkmark"></span>
                  Moist-seasonally wet
                </label>
              </div>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                  <input type="checkbox" value="Moist-perennially wet" 
                    onChange={(e) => updateMoistureFilter(e.target.value, e.target.checked)} 
                    checked={filters.moisture.includes("Moist-perennially wet")}/>
                  <span className="checkmark"></span>
                  Moist-perennially wet
                </label>
              </div>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                  <input type="checkbox" value="Seasonally wet-submerged" 
                    onChange={(e) => updateMoistureFilter(e.target.value, e.target.checked)} 
                    checked={filters.moisture.includes("Seasonally wet-submerged")}/>
                  <span className="checkmark"></span>
                  Seasonally wet-submerged
                </label>
              </div>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                  <input type="checkbox" value="Moist" 
                    onChange={(e) => updateMoistureFilter(e.target.value, e.target.checked)} 
                    checked={filters.moisture.includes("Moist")}/>
                  <span className="checkmark"></span>
                  Moist
                </label>
              </div>
              <div className={styles.itemWrapper}>
                <label className="checkbox">
                  <input type="checkbox" value="Any moisture" 
                    onChange={(e) => updateMoistureFilter(e.target.value, e.target.checked)} 
                    checked={filters.moisture.includes("Any moisture")}/>
                  <span className="checkmark"></span>
                  Any moisture
                </label>
              </div>
            </div>
          </div>

          {/* Height */}
          <div className={styles.filter}>
            <h5>Maximum Plant Height</h5>
            <div className={styles.items}>
              <div className={styles.itemWrapper}>
                 <input type="range" value={sliderValue}
                    id="height" name="height" min="0" max="250" 
                    onChange={(e) => updateHeightFilter(e.target.value)}/>
                  <p>{sliderValue === 0 ? '<1' : sliderValue} ft</p>
              </div>
            </div>
          </div>
          <button className="button secondary mtb-10" onClick={resetFiltersAction}>Reset filters</button>
        </div>
   
        <button className="button contrast" onClick={() => handleFilterDisplay()} >{!showFilters ? 'Show Filters' : 'Hide Filters'}</button>
    </div>
  );
}
