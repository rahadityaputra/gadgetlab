import React from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";
import PopularDevices from "../components/PopularDevice.jsx";
import { useAuth } from "../Contexts/AuthContext.jsx";



const Home = () => {
  // const { isLoggedIn } = useAuth;
  const isLoggedIn = true;



  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Hero />
      <div className="p-6 min-h-screen">
        <PopularDevices />
      </div>
      <Footer />
    </>
  );
};

export default Home;
