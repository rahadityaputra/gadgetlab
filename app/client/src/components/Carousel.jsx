import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DeviceCard from "./DeviceCard.jsx";
import PropTypes from "prop-types";

const Carousel = ({ devices }) => {
  console.log(devices.length)
  return (
    <div
     className="w-full flex justify-center items-center"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={1}
        centeredSlides={true} 
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          500: {slidesPerView: 2},
          640: { slidesPerView: 3 }, 
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 6}, 
        }}
      >
        {devices.map((device, index) => {
          console.log(device)          
          return <SwiperSlide key={index} className="">
                    <DeviceCard id={device.id} name={device.name} favorites={device.favorites} />
                </SwiperSlide>
        })}
      </Swiper >
    </div >
  );
};

Carousel.propTypes = {
  devices: PropTypes.array.isRequired,
}

export default Carousel;
