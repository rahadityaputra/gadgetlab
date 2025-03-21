import { useEffect, useState, useRef } from "react";
import api from "../api/api.js";
import Carousel from "./Carousel.jsx";

const PopularDevices = () => {
  const [devices, setDevices] = useState([]);
  const [isFinishedFetch, setIsFinishedFetch] = useState(false);
  const isFetching = useRef(false); // Mencegah fetch ulang yang tidak perlu

  useEffect(() => {
    const fetchPopularDevices = async () => {
      if (isFetching.current) return; // Jika sudah fetching, jangan panggil lagi
      isFetching.current = true;

      try {
        const response = await api.getPopularDevices();

        if (Array.isArray(response) && response.length > 0) {
          setDevices(response);
        } 

        setIsFinishedFetch(true);
      } catch (error) {
       console.log(error);
         
      
      }
    };

    fetchPopularDevices();
  }, []);

  return (
    <div className="shadow-md rounded-lg overflow-hidden">
      <div className="by-fans bg-blue-400 flex flex-col items-center p-5 gap-3 justify-center">
        <h3 className="text-center font-bold text-4xl text-white p-5">
          Popular Devices By Fans
        </h3>

        {isFinishedFetch && devices.length > 0 ? (
          <Carousel devices={devices} />
        ) : (
          <p className="text-white">Loading popular devices...</p>
        )}
      </div>
    </div>
  );
};

export default PopularDevices;
