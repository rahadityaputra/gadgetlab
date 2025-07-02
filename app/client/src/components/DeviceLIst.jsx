import DeviceCard from "./DeviceCard.jsx";

const DeviceList = ({ devices }) => {
  return (
    <section className="py-12 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            id={device.id}
            name={device.name}
            favorites={device.favorites}
          />
        ))}
      </div>
    </section>
  );
};

export default DeviceList;
