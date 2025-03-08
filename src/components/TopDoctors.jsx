import React from "react";
import { useNavigate } from "react-router";
import { doctors } from "../assets/assets";
const TopDoctors = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 my-1 text-[#262626] px-4 md:px-10">
      <h1 className="text-4xl font-semibold text-center">
        Top Doctors Available
      </h1>
      <p className="sm:w-1/2 text-center text-gray-600 text-lg">
        Browse our hand-picked selection of top-rated doctors ready to serve
        you.
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5">
        {doctors.slice(0, 10).map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="border border-gray-300 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white"
          >
            {/* Image Container */}
            <div className="w-full min-h-[220px] bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
              <img
                className="w-full h-full sm:object-cover object-contain"
                src={item.image}
                alt={item.name}
              />
            </div>
            {/* Doctor Info */}
            <div className="p-5 text-center">
              <div
                className={`flex items-center justify-center gap-2 text-sm font-medium ${
                  item.available ? "text-green-500" : "text-red-500"
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-xl font-semibold text-gray-800 mt-2">
                {item.name}
              </p>
              <p className="text-gray-500 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Button */}
      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className="bg-slate-600 cursor-pointer text-white px-6 py-3 rounded-full my-3 font-semibold shadow-md hover:bg-slate-700 transition-all duration-300"
      >
        View More
      </button>
    </div>
  );
};

export default TopDoctors;
