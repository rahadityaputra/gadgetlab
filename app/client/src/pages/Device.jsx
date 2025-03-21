import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ReviewSection from "../components/ReviewSection.jsx";
import DeviceDetail from "../components/DeviceDetail.jsx";
import api from "../api/api.js"
import SyncLoader from "react-spinners/SyncLoader";

const Device = () => {
      const [deviceDetail, setDeviceDetail] = useState({id:undefined, name:undefined, img:undefined, detailSpec:undefined});

      const [isFinishedFetch, setIsFinishedFetch] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const {device_id}= useParams();

      useEffect(() => {
          const fetchDeviceDetail = async () => {
            setIsLoading(true);
           try {
              const result = await api.getDeviceDetail(device_id);
              setDeviceDetail(result);
              setIsFinishedFetch(true);
              return;
           } catch (error) {
             console.error(error);
           } finally {
             setIsLoading(false);
           }
          }
        fetchDeviceDetail(); 
      }, [device_id])

  return (
    <div className="bg-[url(/bg-1.jpg)]">
      <Navbar />
      <div className="p-6 min-h-screen">
        {isFinishedFetch && <DeviceDetail data={deviceDetail} />}
        <ReviewSection deviceId={device_id}/>
      </div>
      <Footer />

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center">
          <SyncLoader color={"black"} loading={isLoading} size={10} />
        </div>
      )}
    </div>
  );
};

export default Device;
