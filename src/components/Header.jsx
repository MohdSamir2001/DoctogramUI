import React from "react";
import { assets } from "../assets/assets";
import Lottie from "lottie-react";
import animationData from "../utils/animation1.json";
import animationData3 from "../utils/animation3.json";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-slate-600 bg-opacity-45 rounded-lg px-6 md:px-12 lg:px-20 py-10">
      {/* --------- Header Left --------- */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-8">
        <p className="font-semibold text-white text-3xl sm:text-4xl leading-tight">
          Book your appointment with your trusted doctors.
        </p>
        <Lottie
          className="h-52 scale-125 md:h-64"
          animationData={animationData3}
          loop={true}
        />

        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white text-[#595959] font-medium hover:text-white hover:bg-black transition-all duration-300 px-6 py-3 rounded-full shadow-lg hover:scale-105 self-center md:self-start w-full text-center md:w-auto"
        >
          Make Appointment
          <img className="w-4" src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>

      {/* --------- Header Right --------- */}
      <div className="md:w-1/2 flex items-center justify-center">
        <Lottie
          className="w-full -mt-12 scale-125 max-w-sm md:max-w-md lg:max-w-lg"
          animationData={animationData}
          loop={true}
        />
      </div>
    </div>
  );
};

export default Header;
