import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DeviceCard from "./DeviceCard.jsx";

const Carousel = ({ devices }) => {
  const swiperStyle = {
    backdropFilter: "blur(1px) saturate(180%)",
    WebkitBackdropFilter: "blur(1px) saturate(180%)",
    backgroundColor: "rgba(255, 255, 255, 0.17)",
    borderRadius: "12px",
    border: "1px solid rgba(209, 213, 219, 0.3)",
  };
  return (
    <div
      style={{
        width: "750px",
        margin: "auto",
        padding: "20px",
        height: "400px",
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="bg-white h-full"
        style={swiperStyle}
      >
        {devices.map((device, index) => (
          <SwiperSlide key={index}>
            <DeviceCard
              id={device.id}
              name={device.name}
              favorites={device.favorites}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
