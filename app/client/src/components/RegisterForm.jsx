import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import ShowErrorAlert from "../utils/ShowErrorAlert.jsx";

const RegisterForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errorMessages, setErrorMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await api.register(formData);
      const userId = response.data.data.userId;

        onSubmit(userId);
        return;
    } catch (error) {
      const newErrors = error.response.data.errors;
      setErrorMessages(newErrors);
    } finally {
      setIsLoading(false);
    }
  };


  const handleClick = (e) => {
      const password = document.getElementById("password");
      const passwordConfirmation = document.getElementById("passwordConfirmation");
      
      if(e.target.checked) {
        password.type = "text";
        passwordConfirmation.type = "text";

      } else {

        password.type = "password";
        passwordConfirmation.type = "password";

      }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium"
            >

            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Choose a username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Create a password"
            />
                
	  	
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm your password"
            />
            

          </div>
      <div>
        <input type="checkbox" id="togglePassword" onClick={handleClick}/>
        <label className="mx-3" htmlFor="togglePassword">Show Password</label>
      </div>
         {errorMessages.length !== 0 && <ShowErrorAlert messages={errorMessages} />}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mt-2"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Login
          </a>
        </p>
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center">
          <SyncLoader color={"black"} loading={isLoading} size={10} />
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
