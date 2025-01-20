import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>© 2025 Gadget Lab. All Rights Reserved.</p>
        <p>Follow us on 
          <a href="#" className="ml-2 text-blue-400 hover:underline">Twitter</a>, 
          <a href="#" className="ml-2 text-blue-400 hover:underline">Facebook</a>, and 
          <a href="#" className="ml-2 text-blue-400 hover:underline">Instagram</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
