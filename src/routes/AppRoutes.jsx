import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import DoctorsPage from "../pages/DoctorsPage";
import LoginPage from "../pages/LoginPage";
import UserProfilePage from "../pages/UserProfilePage";
import MyAppointmentsPage from "../pages/MyAppointmentsPage";
import AppointmentPage from "../pages/AppointmentPage";
import Navbar from "../components/Navbar";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
const AppRoutes = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctors/:speciality" element={<DoctorsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/user-appointments" element={<MyAppointmentsPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/about-page" element={<AboutPage />} />
        <Route path="/contact-page" element={<ContactPage />} />
        <Route path="/appointment/:doctorId" element={<AppointmentPage />} />
        <Route />
      </Routes>
    </div>
  );
};

export default AppRoutes;
