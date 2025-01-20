import React, { useState } from "react";
import api from "../api/api.js";
import ShowErrorAlert from "../utils/ShowErrorAlert.jsx";
import SyncLoader from "react-spinners/SyncLoader";

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [id]: value,
      };
    });
  };

  const handleOnSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      console.log(formData);
      const response = await api.login(formData);
      const userId = response.data.data.userId;
      onSubmit(userId);
    } catch (errors) {
      console.log(errors);
      
      setErrors(errors.response.data.errors);
    } finally {
      
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Login
        </h2>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onChange={handleChange}
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {errors.length !== 0 && <ShowErrorAlert messages={errors} />}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
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

export default LoginForm;
