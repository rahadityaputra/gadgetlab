import React from 'react';
import { useNavigate } from "react-router-dom";

const DeviceCard = ({ id, name, favorites }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => {navigate(`/device/${id}`)}} className="bg-white shadow-md rounded-lg overflow-hidden w-60 hover:bg-gray-100 hover:scale-110 transition delay-75 duration-300 ease-in-out cursor-pointer">
      {/* <img src={image} alt={name} className="h-40 w-full object-cover" /> */}
      <a className="p-4">
        <h3 className="text-lg text-center font-semibold text-gray-800">{name}</h3>
        <h4 className="text-lg text-center text-gray-800">Favorites : {favorites}</h4>
      </a>
    </div>

  );
};

export default DeviceCard;
