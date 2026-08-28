import Image from "next/image";
import styles from "./search.module.scss";
import { Filters } from "@/helpers/types";

export default function Searchbar({
  filters,
  onFilterChangeAction,
  searchValue,
  setSearchValue
}: {
  filters: Filters;
  onFilterChangeAction: (filters: Filters) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;

}) {

  function handleSearch(value: string) {
    let updatedType: string;
    updatedType = value;
    onFilterChangeAction({ ...filters, search: updatedType});
    setSearchValue(value);
  }

  return (
    <div className={styles.searchbarWrapper}>
      <input className={styles.searchbarInput}
        placeholder="Search for a plant..."
        value={searchValue}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}
