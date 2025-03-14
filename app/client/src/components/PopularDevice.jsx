import React,{useEffect, useState} from 'react';
import DeviceList from './DeviceLIst.jsx';
import api from '../api/api.js';


const PopularDevices = () => {
    const [devices, setDevices]  = useState([]);
    const [errors, setErrors]  = useState(null);
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
        }


        fetchPopularDevices();
    }, [])


  return (
    <div className="shadow-md rounded-lg overflow-hidden">
         {isFinishedFetch && <DeviceList devices={devices} />}
    </div>
  );
};

export default PopularDevices;
