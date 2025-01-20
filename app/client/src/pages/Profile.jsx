import React from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";
import PopularDevices from "../components/PopularDevice.jsx";
import { useAuth } from "../Contexts/AuthContext.jsx";
import ProfileBox from "../components/ProfileBox.jsx";



const Profile = () => {
  // const { isLoggedIn } = useAuth;
  const isLoggedIn = true;


  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <ProfileBox/>
      <Footer />
    </>
  );
};

export default Profile;
