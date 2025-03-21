import DeviceCard from './DeviceCard.jsx';
import PropTypes from "prop-types";
const DeviceList = ({ devices }) => {

  return (
    <div className="my-8 w-full">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Devices</h2> */}
      <div className="flex flex-wrap gap-6 justify-center">
        {devices.map((device, index) => (
          <DeviceCard

            key={index}
            id={device.id}
            name={device.name}
            favorites={device.favorites}
          />
        ))}
      </div>
    </div>
  );
};

DeviceList.propTypes = {
  devices: PropTypes.array.isRequired,
}

export default DeviceList;
