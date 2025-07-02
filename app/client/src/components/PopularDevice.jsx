import { useEffect, useState, useRef } from "react";
import api from "../api/api.js"; // Pastikan path ini benar

const PopularDevices = () => {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detailTopDevice, setDetailTopDevice] = useState(null);
  const isFetching = useRef(false);

  useEffect(() => {
    const fetchPopularDevices = async () => {
      if (isFetching.current) return;
      isFetching.current = true;
      setIsLoading(true);

      try {
        const response = await api.getPopularDevices();
        if (Array.isArray(response) && response.length > 0) {
          setDevices(response);
          const topDeviceId = response[0].id;
          const detail = await api.getDeviceDetail(topDeviceId);
          setDetailTopDevice(detail);
        } else {
          setDevices([]);
          setDetailTopDevice(null);
        }
      } catch (error) {
        console.error(
          "Error fetching popular devices or top device detail:",
          error,
        );
        setDevices([]);
        setDetailTopDevice(null);
      } finally {
        setIsLoading(false);
        isFetching.current = false;
      }
    };

    fetchPopularDevices();
  }, []);

  const otherDevices = devices.slice(1);

  const getSpecValue = (data, categoryName, specName) => {
    if (!data || !data.detailSpec) return "N/A";
    const category = data.detailSpec.find(
      (cat) => cat.category === categoryName,
    );
    if (category) {
      const spec = category.specifications.find((s) => s.name === specName);
      return spec ? spec.value : "N/A";
    }
    return "N/A";
  };

  const getQuickSpecValue = (data, specName) => {
    if (!data || !data.quickSpec) return "N/A";
    const spec = data.quickSpec.find((s) => s.name === specName);
    return spec ? spec.value : "N/A";
  };

  return (
    <div className="shadow-md rounded-lg overflow-hidden bg-gray-50">
      <div className="flex flex-col items-center p-5 gap-3 justify-center">
        <h3 className="text-center font-bold text-4xl text-gray-900 p-5">
          Popular Devices By Fans
        </h3>

        {isLoading ? (
          <p className="text-gray-700 py-10">Memuat perangkat populer...</p>
        ) : detailTopDevice ? (
          <div className="w-[500px] p-5">
            <div className="w-full bg-white rounded-lg shadow-xl mb-8 flex flex-col items-center border border-gray-200">
              <div className="">
                <img
                  src={
                    detailTopDevice.img ||
                    "https://via.placeholder.com/400x300?text=Gambar+Perangkat+Top+1"
                  }
                  alt={detailTopDevice.name}
                  className="rounded-md border border-gray-300"
                />
              </div>
              <div className="text-center md:text-left">
                <span className="text-blue-600 text-center text-lg font-bold block mb-2">
                  #1 Pilihan Fans
                </span>
                <h4 className="text-gray-900 text-center text-4xl font-bold mb-3">
                  {detailTopDevice.name}
                </h4>
                <p className="text-gray-700 text-lg mb-4 text-center">
                  {detailTopDevice.name.split(" ")[0] ||
                    "Brand Tidak Diketahui"}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 text-gray-700 text-base mb-6">
                  {/* Layar */}
                  <div className="flex items-center">
                    <span>
                      <strong className="text-gray-800">Layar:</strong>{" "}
                      {getQuickSpecValue(detailTopDevice, "Display size")}
                      <span className="text-gray-500 ml-1">
                        (
                        {
                          getSpecValue(
                            detailTopDevice,
                            "Display",
                            "Type",
                          ).split(",")[0]
                        }
                        )
                      </span>
                    </span>
                  </div>
                  {/* Kamera */}
                  <div className="flex items-center">
                    <span>
                      <strong className="text-gray-800">Kamera:</strong>{" "}
                      {getQuickSpecValue(detailTopDevice, "Camera pixels")}
                    </span>
                  </div>
                  {/* Chipset */}
                  <div className="flex items-center">
                    <span>
                      <strong className="text-gray-800">Chipset:</strong>{" "}
                      {getQuickSpecValue(detailTopDevice, "Chipset")}
                    </span>
                  </div>
                  {/* Baterai & Pengisian Daya */}
                  <div className="flex items-center">
                    <span>
                      <strong className="text-gray-800">Baterai:</strong>{" "}
                      {getQuickSpecValue(detailTopDevice, "Battery size")} (
                      {
                        getSpecValue(
                          detailTopDevice,
                          "Battery",
                          "Charging",
                        ).split(",")[0]
                      }
                      )
                    </span>
                  </div>
                  {/* OS */}
                  <div className="flex items-center col-span-1 sm:col-span-2">
                    <span>
                      <strong className="text-gray-800">OS:</strong>{" "}
                      {
                        getSpecValue(detailTopDevice, "Platform", "OS").split(
                          ",",
                        )[0]
                      }
                    </span>
                  </div>
                  {/* AnTuTu Score */}
                  <div className="flex items-center col-span-1 sm:col-span-2">
                    <span>
                      <strong className="text-gray-800">AnTuTu Score:</strong>{" "}
                      {
                        getSpecValue(detailTopDevice, "Tests", "AnTuTu").split(
                          " ",
                        )[0]
                      }
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 text-base mb-6">
                  {detailTopDevice.description ||
                    (getSpecValue(detailTopDevice, "Platform", "OS") !==
                      "N/A" &&
                    getSpecValue(detailTopDevice, "Display", "Type") !== "N/A"
                      ? `Perangkat ini ditenagai oleh chipset ${getQuickSpecValue(detailTopDevice, "Chipset")}, menjalankan ${getSpecValue(detailTopDevice, "Platform", "OS").split(",")[0]} dengan layar ${getQuickSpecValue(detailTopDevice, "Display size")} ${getSpecValue(detailTopDevice, "Display", "Type")} yang menakjubkan.`
                      : "Performa luar biasa dan fitur inovatif yang dicintai para penggemar.")}
                </p>

                <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors">
                  Lihat Detail Lengkap
                </button>
              </div>
            </div>

            {otherDevices.length > 0 && (
              <div className="mt-10">
                <h4 className="text-gray-900 text-2xl font-bold mb-5 text-center">
                  Perangkat Populer Lainnya
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {otherDevices.map((device, index) => (
                    <div
                      key={device.id || `other-device-${index}`}
                      className="bg-gray-100 rounded-lg p-5 flex items-center gap-4
                                 transform transition duration-200 hover:bg-gray-200 cursor-pointer border border-gray-200"
                    >
                      <span className="text-blue-600 text-3xl font-bold flex-shrink-0 w-12 text-center">
                        #{index + 2}
                      </span>
                      <div>
                        <h5 className="text-gray-900 text-xl font-semibold leading-tight">
                          {device.name || `Perangkat #${index + 2}`}
                        </h5>
                        <p className="text-gray-700 text-sm">
                          {device.name.split(" ")[0] || "Brand Tidak Diketahui"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-700 text-center py-10">
            Tidak ada perangkat populer yang ditemukan saat ini.
          </p>
        )}
      </div>
    </div>
  );
};

export default PopularDevices;
