import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addDoctors } from "../utils/doctorsSlice";
import axios from "axios";

const categories = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const DoctorsPage = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const doctors = useSelector((store) => store.doctors);
  useEffect(
    () => async () => {
      try {
        const response = await axios.get(
          "http://localhost:1234/api/user/all-doctors",
          {
            withCredentials: true,
          }
        );

        dispatch(addDoctors(response?.data?.doctors));
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    },
    []
  );
  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [speciality]);

  return (
    <div className="p-4 max-w-6xl font-semibold mx-auto">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-4 mb-6 border-b pb-2">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() =>
              speciality === category
                ? navigate("/doctors")
                : navigate(`/doctors/${category}`)
            }
            className={`whitespace-nowrap cursor-pointer px-4 py-2 text-sm rounded-md transition-all ${
              speciality === category
                ? "bg-black text-white font-semibold"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5">
        {filterDoc.length > 0 ? (
          filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="border border-gray-300 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white"
            >
              {/* Image Container */}
              <div className="w-full h-[220px] bg-gray-100 overflow-hidden rounded-t-2xl">
                <img
                  className="w-full h-full object-contain "
                  src={item.image}
                  alt={item.name}
                />
              </div>

              {/* Doctor Info */}
              <div className="p-5 text-center">
                <div
                  className={`flex items-center justify-center gap-2 text-sm font-medium ${
                    item.avaliable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full ${
                      item.avaliable ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <p>{item.avaliable ? "Avaliable" : "Not avaliable"}</p>
                </div>
                <p className="text-xl font-semibold text-gray-800 mt-2">
                  {item.name}
                </p>
                <p className="text-gray-500 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No doctors avaliable in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
