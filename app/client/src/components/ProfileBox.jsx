import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileBox = ({user}) => {
  
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/"); 
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-24"></div>
        <div className="flex justify-center -mt-12">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&size=128&background=random`}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>

        {/* User Information */}
        <div className="text-center mt-4">
          <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600">@{user.username}</p>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={handleChangePassword}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 px-6 py-4 text-center text-gray-600">
          <p>
            Welcome to your profile! Manage your account information or update your password.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
