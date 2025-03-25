import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import DoctorsPage from "../pages/DoctorsPage";
import LoginPage from "../pages/LoginPage";
import UserProfilePage from "../pages/MyProfile";
import MyAppointmentsPage from "../pages/MyAppointmentsPage";
import AppointmentPage from "../pages/AppointmentPage";
import Navbar from "../components/Navbar";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import Pharmacy from "../pages/Pharmacy";
import CartPage from "../pages/CartPage";
import OrderPage from "../pages/OrderPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import OrdersPage from "../pages/OrdersPage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../utils/userSlice";
import { addDoctors } from "../utils/doctorsSlice";
import MyProfile from "../pages/MyProfile";
const AppRoutes = () => {
  const dispatch = useDispatch();

  const fetchDoctors = async () => {
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
  };
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1234/api/user/profile",
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(response?.data?.data));
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };
  useEffect(() => {
    fetchDoctors();
    fetchUser();
  }, []);
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctors/:speciality" element={<DoctorsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/orders" element={<OrdersPage />} />

        <Route path="/order-page" element={<OrderPage />} />
        <Route path="/user-profile" element={<MyProfile />} />
        <Route path="/user-appointments" element={<MyAppointmentsPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/cart-page" element={<CartPage />} />
        <Route path="/about-page" element={<AboutPage />} />
        <Route path="/contact-page" element={<ContactPage />} />
        <Route path="/appointment/:docId" element={<AppointmentPage />} />
        <Route />
      </Routes>
    </div>
  );
};

export default AppRoutes;
