"use client"
import Image from "next/image";
import styles from "./carousel.module.scss";
import placeholder from "../../../public/placeholder.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useState } from "react";

// Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';

export default function Carousel({
  plant
}:{
  plant: any
}) {

  const [showImageModal, setShowImageModal] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | StaticImport>("");

  function enlargeImage(image: string | StaticImport) {
    if(image != null || image != ""){
      setShowImageModal(true);
      setEnlargedImage(image);
    }
  }

  return (
  <>
  <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {plant.images && plant.images.length > 0 ? (
        plant.images.map((image: string | StaticImport) => (
          <SwiperSlide>
            <Image loading="eager"
              onClick={() => enlargeImage(image)}
              className={styles.image}
              src={image}
              height={400}
              width={400}
              alt={`Picture of ${plant.scientific_name}`} />
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <Image loading="eager"
            src={placeholder}
            height={400}
            width={400}
            alt={`Placeholder Image`} />
        </SwiperSlide>
      )}
    </Swiper>
    <p className={styles.caption}>Click to zoom</p>

    {showImageModal && (
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
           <div className={styles.close} onClick={()=>setShowImageModal(false)}>X</div>
          <Image loading="eager"
              className={styles.image}
              src={enlargedImage}
              height={400}
              width={400}
              alt={`Picture of ${plant.scientific_name}`} />
         
        </div>
      </div>
    )}
    </>
  );
}
