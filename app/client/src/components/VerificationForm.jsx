import react, { useState, useEffect } from "react";
import api from "../api/api.js";
import SyncLoader from "react-spinners/SyncLoader";

const CodeInput = ({ index, value, onChange, onFocus, onBlur }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e, index)}
      onFocus={onFocus}
      onBlur={onBlur}
      maxLength="1"
      style={{
        width: "40px",
        height: "40px",
        textAlign: "center",
        margin: "5px",
        fontSize: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    />
  );
};

const VerificationForm = ({ request, onSubmit , action}) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // Handle input change
  const handleInputChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    // Automatically move focus to next input
    if (e.target.value !== "") {
      if (index < 5) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  // Handle input focus
  const handleFocus = (e) => {
    e.target.select();
  };

  // Handle input blur
  const handleBlur = () => {};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const verificationCode = code.join("");
    try {
      console.log(verificationCode);
      const response = await api.verifyVerificationCode(
        request,
        verificationCode,
        action
      );
      console.log(response);
      onSubmit();
    } catch (errors) {
      console.log(errors);

      setErrors(errors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Masukkan Kode Verifikasi 6 Digit
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-md w-full"
      >
        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <CodeInput
              key={index}
              index={index}
              value={digit}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          ))}
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
