
import styles from "./page.module.scss";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/navigation/Footer";
import plantJson from "@/json/portland_plants.json";
import { JSX } from "react";
import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react'
import Carousel from "@/components/carousel/Carousel";
import placeholder from "../../../../public/placeholder.png";

export default async function PlantPage({
  params
}: {
  params: Promise<{slug: string}>
}): Promise<JSX.Element> {
  const {slug} = await params;
  let plants = plantJson.plants;
  const plant = plants.find((plant) => plant.id.toString() === slug);

  return (
    <>
    <Navigation/>
    <div className={styles.page}>
      <a href="/"><button className="button contrast">Back to search</button></a>
      <div className={styles.contentWrapper}>
        <div className={styles.infoCard}>
          <div className={styles.headlines}>
            <h2>{plant?.common_name}</h2>
            <h5 className="italic">({plant?.scientific_name})</h5>
            <div className={styles.pills}>
              <h5 className={`pill ${plant?.native_to_portland ? 'primary' : 'secondary'}`}>
                {plant?.native_to_portland ? "Native" : "Invasive"}</h5>
              <h5 className={`pill ${plant?.invasive_rank?.toLowerCase()}`}>
                {plant?.invasive_rank}</h5>
            </div>
          </div>
          <div className={styles.info}> 
            <p className={styles.notes}>{plant?.notes}</p>
            <p><strong>Canopy level:</strong> {plant?.classification}</p>
            <p><strong>Maximum height:</strong> {plant?.max_height_ft}ft</p>
            <p><strong>Sun requirements:</strong> {plant?.sun_requirement}</p>
            <p><strong>Moisture Conditions:</strong> {plant?.moisture_conditions}</p>
          </div>
        </div>   
        <div className={styles.imageWrapper}>
            {/* <Carousel plant={plant}/> */}
             <Image
              src={plant?.images && plant?.images[0] || placeholder}
              height={400}
              width={400}
              alt={`Picture of ${plant?.scientific_name}`}
            />
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

