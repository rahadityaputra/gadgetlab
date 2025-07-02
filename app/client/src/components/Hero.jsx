import React from "react";

const Hero = () => {
  return (
    <div className="poppins-regular text-black h-screen flex flex-col justify-center items-start md:items-center p-5">
      <h1 className="md:text-5xl text-4xl font-bold">Welcome to Gadget Lab</h1>
      <p className="mt-4 text-xl">
        "Empowering your life with the best tech gadgets"
      </p>
      <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Explore Now
      </button>
    </div>
  );
};

export default Hero;

