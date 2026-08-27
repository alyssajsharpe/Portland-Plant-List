"use client"
import Image from "next/image";
import styles from "./carousel.module.scss";
import placeholder from "../../../public/placeholder.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key } from "react";

// Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';


export default function Carousel({
  plant
}:{
  plant: any
}) {
  return (

      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {plant.images && plant.images.length > 0 ? (
              plant.images.map((image: string | StaticImport, i: Key | null | undefined) => (
                 <SwiperSlide>
                      <Image loading="eager"
                      src={image}
                      height={400}
                      width={400}
                    alt={`Picture of ${plant.scientific_name}`}
                    />
                 </SwiperSlide>
              ))
            ) : (
               <SwiperSlide>
                      <Image loading="eager"
                      src={placeholder}
                      height={400}
                      width={400}
                    alt={`Placeholder Image`}
                    />
                 </SwiperSlide>
            )}
    </Swiper>
  );
}
