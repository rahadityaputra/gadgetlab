import React from "react";

function VerificationSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Account Successfully Created!
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Congratulations! Your account has been successfully created after verifying your code. You can now log in and start using our platform.
        </p>

        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 mb-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.707-9.707a1 1 0 00-1.414-1.414L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="text-center">
          <a
            href="/login"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mt-2"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default VerificationSuccess;
