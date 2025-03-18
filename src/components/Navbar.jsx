import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router";
import profile_pic from "../assets/userImage/profile_pic.png";
const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const handleLogout = () => {
    setToken(false);
    navigate("/");
  };
  const handleCloseMenu = () => {
    setTimeout(() => {
      setShowMenu(false);
    }, 50); // Small delay to avoid flickering
  };
  return (
    <div className="flex items-center relative z-10 justify-between text-sm px-1 py-4 mb-5 border-b border-b-[#ADADAD]">
      <div className="flex">
        <div
          onClick={() => navigate("/")}
          className="w-44 font-bold text-2xl cursor-pointer"
        >
          {" "}
          DOCTO
        </div>
        <div className="flex -ml-20 gap-2">
          <button
            onClick={() => navigate(-1)}
            className="font-semibold cursor-pointer px-1 py-1 rounded-md border-2 "
          >
            Prev
          </button>
          <button
            onClick={() => navigate(1)}
            className="font-semibold cursor-pointer px-2 py-1 rounded-md border-2 "
          >
            Next
          </button>
        </div>
      </div>
      <ul className="md:flex items-start gap-5 font-medium hidden">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-[2px] bg-black  m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-[2px] bg-black  m-auto hidden" />
        </NavLink>
        <NavLink to="/pharmacy">
          <li className="py-1">PHARMACY</li>
          <hr className="border-none outline-none h-[2px] bg-black  m-auto hidden" />
        </NavLink>
        <NavLink to="/about-page">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-[2px] bg-black  m-auto hidden" />
        </NavLink>
        <NavLink to="/contact-page">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-[2px] bg-black  m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4 ">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/user-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/user-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={handleLogout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-black cursor-pointer text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />

        {/* ---- Mobile Menu ---- */}
        <div
          className={`md:hidden ${
            showMenu ? "fixed w-full" : "hidden"
          } right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-4">
            <div
              onClick={() => navigate("/")}
              className="w-44 font-bold text-2xl cursor-pointer"
            >
              {" "}
              DOCTO
            </div>
            <img
              onClick={handleCloseMenu}
              src={assets.cross_icon}
              className="w-7"
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded full inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded full inline-block">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/pharmacy">
              <p className="px-4 py-2 rounded full inline-block">PHARMACY</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about-page">
              <p className="px-4 py-2 rounded full inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact-page">
              <p className="px-4 py-2 rounded full inline-block">CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
