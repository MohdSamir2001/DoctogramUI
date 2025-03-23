import React from "react";
import { motion } from "framer-motion";
import { specialityData } from "../assets/assets";
import { Link } from "react-router";

const specialityIcons = {
  General_physician: "❤",
  Dental: "🦷",
  Neurologist: "🧠",
  Pediatricians: "👶",
  Orthopedics: "🦴",
  Ophthalmology: "👁",
  Dermatologist: "🧴",
  ENT: "👂",
  Gynecologist: "👩",
  Urology: "🔬",
  Gastroenterologist: "🚑",
};

const SpecialityMenu = () => {
  return (
    <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-light to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
          Find by Speciality
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
        {specialityData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-primary/20"
          >
            <Link
              to={`/doctors/${item.speciality}`}
              onClick={() => scrollTo(0, 0)}
            >
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {specialityIcons[item.speciality] || "❓"}
                </span>
                <h3 className="text-lg font-semibold text-dark group-hover:text-primary transition-colors duration-300">
                  {item.speciality}
                </h3>
              </div>
            </Link>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
