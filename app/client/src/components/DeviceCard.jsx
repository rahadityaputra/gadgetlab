import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DeviceCard = ({ id, name, favorites }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/device/${id}`)}
      className="border border-red-500 p-5 bg-white shadow-md rounded-lg h-[300px] w-[200px] text-center cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-black drop-shadow-md">
        {name || "Unknown Device"}
      </h3>
      <h4 className="text-sm text-gray-600">❤️ {favorites ?? 0} favorites</h4>
    </div>
  );
};

DeviceCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  favorites: PropTypes.number.isRequired,
};

export default DeviceCard;
