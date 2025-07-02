import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 inter-regular">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-white">Gadget Lab</h3>
          <p className="text-sm mt-2">
            &copy; {new Date().getFullYear()} Gadget Lab. All rights reserved.
          </p>
          <p className="text-sm">
            Your trusted source for in-depth phone reviews.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-4 md:mb-0">
          <a
            href="/about"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            About Us
          </a>
          <a
            href="/reviews"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Reviews
          </a>
          <a
            href="/contact"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Contact
          </a>
          <a
            href="/privacy"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Privacy Policy
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center md:justify-end space-x-5">
          <a
            href="https://twitter.com/gadgetlab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Twitter"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M22.46 6c-.8.36-1.6.6-2.4.7.9-.54 1.6-1.32 1.94-2.3.9-.1 1.7-.3 2.5-.6-.9.5-1.9.9-3 1.1-.8-.8-1.9-1.3-3.2-1.3-2.4 0-4.4 2-4.4 4.4 0 .36.04.7.12 1.04-3.6-.2-6.8-1.9-9-4.5-.4.6-.6 1.3-.6 2.1 0 1.5.76 2.88 1.92 3.68-.7-.02-1.4-.22-2-.5v.04c0 2.2 1.56 4.02 3.64 4.44-.36.1-.72.14-1.1.14-.26 0-.52-.02-.76-.08.6 1.8 2.22 3.1 4.16 3.1-1.54 1.2-3.48 1.9-5.6 1.9-.36 0-.7-.02-1.04-.06C2.5 20.36 4.9 21 7.4 21c9.4 0 14.5-7.8 14.5-14.5 0-.22-.0-.44-.02-.66z" />
            </svg>
          </a>
          <a
            href="https://facebook.com/gadgetlab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Facebook"
            className="text-gray-300 hover:text-blue-600 transition-colors duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14 13.5h2v-3h-2v-2c0-1.07.47-1.78 1.84-1.78H18V4.5c-.37-.05-.8-.1-1.32-.1-1.68 0-2.84.8-3.48 2.1-.64 1.3-1.04 2.8-1.04 4.8v3h-2v3h2v7h3v-7h2.2L17.5 13.5H14z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/gadgetlab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.013 4.85.07c3.25.148 4.246 1.636 4.39 4.886.058 1.265.07 1.646.07 4.85s-.013 3.584-.07 4.85c-.148 3.25-1.636 4.246-4.886 4.39-1.265.058-1.646.07-4.85.07s-3.584-.013-4.85-.07c-3.25-.148-4.246-1.636-4.39-4.886-.058-1.265-.07-1.646-.07-4.85s.013-3.584.07-4.85c.148-3.25 1.636-4.246 4.886-4.39 1.265-.058 1.646-.07 4.85-.07zm0 2.166c-3.212 0-3.606.016-4.87.072-2.923.134-3.832 1.543-3.96 4.46-.058 1.264-.07 1.65-.07 4.85s.013 3.586.07 4.85c.128 2.918 1.037 4.327 3.96 4.46 1.264.056 1.65.07 4.85.07s3.586-.016 4.85-.072c2.923-.134 3.832-1.543 3.96-4.46.058-1.264.07-1.65.07-4.85s-.013-3.586-.07-4.85c-.128-2.918-1.037-4.327-3.96-4.46-1.264-.056-1.65-.07-4.85-.07zM12 7.74c-2.355 0-4.26 1.905-4.26 4.26s1.905 4.26 4.26 4.26 4.26-1.905 4.26-4.26-1.905-4.26-4.26-4.26zm0 2.166c1.196 0 2.166.97 2.166 2.166s-.97 2.166-2.166 2.166-2.166-.97-2.166-2.166c0-1.196.97-2.166 2.166-2.166zm4.853-6.19c-.808 0-1.46.652-1.46 1.46s.652 1.46 1.46 1.46 1.46-.652 1.46-1.46-.652-1.46-1.46-1.46z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
