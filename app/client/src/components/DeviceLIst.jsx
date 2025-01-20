import React, { useEffect, useState } from 'react';
import DeviceCard from './DeviceCard.jsx';

const DeviceList = ({ devices }) => {
  
  return (
    <div className="my-8 w-full">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Devices</h2> */}
      <div className="flex flex-wrap gap-6 justify-center">
        {devices.map((device, index) => (
          <DeviceCard
            key={index}
            name={device.name}
            favorites={device.favorites}
          />
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
