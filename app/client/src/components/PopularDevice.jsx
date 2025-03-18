import React, { useEffect, useState } from "react";
import DeviceList from "./DeviceLIst.jsx";
import api from "../api/api.js";
import Carousel from "./Carousel.jsx";

const PopularDevices = () => {
  const [devices, setDevices] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isFinishedFetch, setIsFinishedFetch] = useState(false);

  useEffect(() => {
    const fetchPopularDevices = async () => {
      try {
        const devices = await api.getPopularDevices();
        setDevices(devices);
        setIsFinishedFetch(true);
      } catch (error) {
        const message = error.response.errors;
        setErrors(message);
      }
    };

    fetchPopularDevices();
  }, []);

  return (
    <div className="shadow-md rounded-lg overflow-hidden">
      <div className="by-fans bg-[url(/bg-2.png)] bg-cover bg-center bg-blue-400 flex flex-row  max-md:flex-col items-center p-5 gap-3 justify-center">
        <h3
          className="text-center font-bold text-4xl  text-white p-5"
          style={{ width: "500px" }}
        >
          Popular Devices By Fans
        </h3>

        {isFinishedFetch && <Carousel devices={devices} />}
      </div>
      {/* <div className="by-day bg-[url(/bg-3.jpg)] bg-cover bg-center flex items-center">
        <h3 className="text-center font-bold text-4xl  text-black">
          Popular Devices By Day
        </h3>
        {isFinishedFetch && <DeviceList devices={devices} />}
      </div> */}
    </div>
  );
};

export default PopularDevices;
