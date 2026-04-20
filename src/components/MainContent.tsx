import Image from "next/image";
import { Plant } from "../helpers/types";
import styles from "./main.module.scss";
import placeholder from "../../public/placeholder.png";

export default function MainContent({
  plants,
  pageSize,
  setCurrentPage,
  currentPage
} : {
  plants: Plant[],
  pageSize: number,
  setCurrentPage: any,
  currentPage: number
}) {

  return (
    <>
     <div className={styles.mainContentWrapper}>
      <div className={styles.cardsWrapper}>
        {plants.map((plant, i) => (
          <a href={`/plants/${plant.id}`} key={i}>
            <div className={styles.card}  >
              <div className={styles.cardContent}>
                  <div className={styles.cardImage} 
                    style={{backgroundImage: `url(${(plant.images && plant.images.length > 0 ? plant.images[0] : placeholder.src)})`}}>
                  </div>
                  <div className={styles.cardInfo}>
                    <h3>{plant.common_name}</h3>
                    <p className="italic">({plant.scientific_name})</p>
                    <p>{plant.classification}</p>
                  </div>
              </div>
            </div>
          </a>
        ))};
        </div>
        <div className={styles.paginationButtons}>
           <button className="button contrast" onClick={() => setCurrentPage((p: number) => Math.max(p - 1, 1))}> Prev</button>
           <p>Page: {currentPage}/{pageSize}</p>
          <button className="button primary" onClick={() => setCurrentPage((p: number) => Math.min(p + 1, pageSize))}> Next</button>       
        </div>
      </div>
    </>
  );
}
