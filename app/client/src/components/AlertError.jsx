import React from "react";

function AlertError({ message }) {
    return (
      <div className="mb-4 p-4 text-red-800 bg-red-100 border border-red-400 rounded">
        {message}
      </div>
    );
  }
  
export default AlertError;
