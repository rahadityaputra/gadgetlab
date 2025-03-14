import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ReviewSection from "../components/ReviewSection.jsx";
import DeviceDetail from "../components/DeviceDetail.jsx";
import api from "../api/api.js"

const Device = () => {
      const [deviceDetail, setDeviceDetail] = useState({id:undefined, name:undefined, img:undefined, detailSpec:undefined});
      const [isFinishedFetch, setIsFinishedFetch] = useState(false);
      const {device_id}= useParams();

      useEffect(() => {
          const fetchDeviceDetail = async () => {
           try {
              const result = await api.getDeviceDetail(device_id);
              setDeviceDetail(result);
              setIsFinishedFetch(true);
              return;
           } catch (error) {
             console.error(error);
           }
          }
        fetchDeviceDetail(); 
      }, [device_id])

  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen">
        {isFinishedFetch && <DeviceDetail data={deviceDetail} />}
        <ReviewSection deviceId={device_id}/>
      </div>
      <Footer />
    </>
  );
};

export default Device;
