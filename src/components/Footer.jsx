import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import animationData4 from "../utils/animations/animation4.json";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row bg-slate-600 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-8 md:mx-10 items-center">
      {/* ------- Left Side ------- */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-4 py-6 sm:py-8 md:py-12">
        <p className="font-semibold text-white text-2xl sm:text-3xl md:text-4xl leading-tight">
          Book your appointment with 100+ trusted doctors.
        </p>

        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="flex items-center gap-2 bg-white text-[#595959] font-medium hover:text-white cursor-pointer hover:bg-black transition-all duration-300 px-5 py-2 rounded-full shadow-lg hover:scale-105"
        >
          Create Account
          <img className="w-4" src={assets.arrow_icon} alt="Arrow" />
        </button>
      </div>

      {/* ------- Right Side (Lottie Animation) ------- */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Lottie
          className="w-[180px] sm:w-[250px] md:w-[300px] lg:w-[370px]"
          animationData={animationData4}
          loop={true}
        />
      </div>
    </div>
  );
};

export default Footer;
