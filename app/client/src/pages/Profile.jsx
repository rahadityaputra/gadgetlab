import React, { useState , useEffect} from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ProfileBox from "../components/ProfileBox.jsx";
import api from "../api/api.js";

const Profile = () => {
  console.log("ini di page profile");
    
  const [user, setUser] = useState({
    username : "loading",
    name : "loading",
    email : "loading",
    id : "loading"
  });

  useEffect(() => {
      const fetchUserData = async () => {
          try {
              const user = await api.getUserData();
              setUser(user);
          } catch (error) {
            console.log(error.response);
          }
      }

      fetchUserData();
  }, [])


  return (
    <>
      <Navbar/>
      <ProfileBox user={user}/>
      <Footer />
    </>
  );
};

export default Profile;
