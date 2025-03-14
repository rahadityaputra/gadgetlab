import react, { useState, useEffect } from "react";
import api from "../api/api.js";
import SyncLoader from "react-spinners/SyncLoader";

const VerificationForm = ({ request, onSubmit , action}) => {
  const [code, setCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // Handle input change
  const handleInputChange = (e) => {
    setCode(e.target.value);

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const verificationCode = parseInt(code);
    try {      
      const response = await api.verifyVerificationCode(
        request,
        verificationCode,
        action
      );

      onSubmit(response.token);
    } catch (errors) {
      setErrors(errors);
    } finally {
      setIsLoading(false);
    }

  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
           <form
             
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-md w-full"
      >
            <h2 className="text-2xl font-bold text-center mb-6">
                Enter 6 digits Verification Code
              </h2>

        <div className="flex justify-center gap-2 mb-6">
         <input type="text" autoFocus onChange={handleInputChange} className="font-semibold p-3 text-center" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Verifikasi
        </button>
      </form>

      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <SyncLoader color="black" loading={isLoading} size={10} />
        </div>
      )}
    </div>
  );
};

export default VerificationForm;
