import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const FootInfo = () => {
  const handleNavigation = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to the top smoothly
  };

  return (
    <div className="md:mx-10">
      <div className="bg-slate-600 font-semibold rounded-md my-6 text-white py-12 md:px-10">
        <div className="flex flex-col sm:grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 mb-8">
          {/* --- Logo & About --- */}
          <div>
            <div
              onClick={() => handleNavigation("/")}
              className="text-2xl font-bold text-white cursor-pointer mb-4"
            >
              DOCTO
            </div>
            <p className="leading-6 md:w-3/4">
              Your trusted healthcare partner. Find and book appointments with
              top-rated doctors easily.
            </p>
          </div>

          {/* --- Company Links --- */}
          <div>
            <p className="text-lg font-semibold mb-4">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-400">
              <li
                onClick={() => handleNavigation()}
                className="hover:text-white cursor-pointer transition"
              >
                Home
              </li>
              <li
                onClick={() => handleNavigation()}
                className="hover:text-white cursor-pointer transition"
              >
                About Us
              </li>
              <li
                onClick={() => handleNavigation()}
                className="hover:text-white cursor-pointer transition"
              >
                Delivery
              </li>
              <li
                onClick={() => handleNavigation()}
                className="hover:text-white cursor-pointer transition"
              >
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* --- Contact Info --- */}
          <div>
            <p className="text-lg font-semibold mb-4">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-gray-400">
              <li className="cursor-pointer hover:text-white transition">
                +1-212-456-7890
              </li>
              <li className="cursor-pointer hover:text-white transition">
                support@docto.com
              </li>
            </ul>

            {/* --- Social Icons --- */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* --- Footer Line --- */}
        <div>
          <hr className="border-gray-700" />
          <p className="py-5 text-center font-semibold text-gray-500 text-sm">
            Copyright 2024 @Docto.com - All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FootInfo;
