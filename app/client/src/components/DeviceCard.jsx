import React from 'react';

const DeviceCard = ({ name, favorites }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-60 hover:bg-gray-100 hover:scale-110 transition delay-75 duration-300 ease-in-out">
      {/* <img src={image} alt={name} className="h-40 w-full object-cover" /> */}
      <div className="p-4">
        <h3 className="text-lg text-center font-semibold text-gray-800">{name}</h3>
        <h4 className="text-lg text-center text-gray-800">Favorites : {favorites}</h4>
      </div>
    </div>
  );
};

export default DeviceCard;
