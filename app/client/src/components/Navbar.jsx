import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import api from "../api/api.js";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResult] = useState([]);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const bounceSearch = (delay, func) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    }
  }



  const performSearch = async () =>  {
    const devicesSearchInput = document.getElementById("devices-search-input");
    const name = devicesSearchInput.value;

    try {
      const response = await api.searchDevices(name);
      setSearchResult(response);
    } catch (error) {
      console.log(error);
      
    }
  }

  const debouncedSearch = bounceSearch(1000, performSearch);
  const handleSearchInput = () => {
    debouncedSearch();
  }
  

  const displaySearchResult = () => {

  }

  return (
    <nav className=" sticky top-0" style={{zIndex:"9999"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold  text-white">Gadget Lab</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4 relative">
              <input
                onInput={handleSearchInput}
                id="devices-search-input"
                type="text"
                placeholder="Search gadgets..."
                className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Hasil Pencarian */}
              {searchResults.length > 0 && (
                <div className="absolute w-md text-black bg-white rounded-md mt-2 shadow-lg">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer flex"
                    >
                      {/* Image */}
                      <img src={result.img} alt={result.name} className="w-16 h-16 object-cover rounded-md mr-4" />

                      {/* Device Name */}
                      <div className="flex flex-col">
                        <span className="font-semibold">{result.name}</span>
                        <span className="hidden md:inline">{result.description}</span>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

          

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              onClick={() => navigate("/")}
              className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
            >
              Home
            </a>
           {isLoggedIn ? (
              <button
                onClick={() => navigate("/profile")}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden py-5 px-2">
          <a
            onClick={() => navigate("/")}
            className="block px-4 py-2 text-sm hover:bg-gray-600 cursor-pointer"
          >
            Home
          </a>
          <a
            href="#about"
            className="block px-4 py-2 text-sm hover:bg-gray-600"
          >
            About
          </a>
          <a
            href="#products"
            className="block px-4 py-2 text-sm hover:bg-gray-600"
          >
            Products
          </a>
          <a
            href="#contact"
            className="block px-4 py-2 text-sm hover:bg-gray-600"
          >
            Contact
          </a>

          {/* Login/Sign Up or Profile */}
          <div className="mt-4 flex space-x-2">
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/profile")}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
              >
                Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
