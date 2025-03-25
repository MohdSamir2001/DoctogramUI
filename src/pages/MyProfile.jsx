import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { useSelector } from "react-redux";

const backendUrl = "http://localhost:1234"; // Replace with actual backend URL

const MyProfile = () => {
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null);

  // Fetch token from Redux store
  const token = useSelector((store) => store.user);

  // Fetch User Profile Data
  const loadUserProfileData = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
        withCredentials: true,
      });

      if (data.success) {
        setUserData(data?.data);
      } else {
        toast.error("Failed to load user profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error loading profile");
    }
  };

  // Update User Profile Data
  const updateUserProfileData = async () => {
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/edit`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        loadUserProfileData();
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Profile update failed");
    }
  };

  useEffect(() => {
    if (token) loadUserProfileData();
  }, [token]);

  if (!userData)
    return <p className="text-center text-gray-300 mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-gray-900 text-white rounded-lg p-6 shadow-lg">
      {/* Profile Image Upload */}
      <div className="flex items-center justify-center relative">
        <label htmlFor="image" className="relative cursor-pointer">
          <img
            className="w-36 h-36 rounded-full border-4 border-gray-600"
            src={image ? URL.createObjectURL(image) : userData.image}
            alt="Profile"
          />
          <div className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full border border-gray-500 hover:bg-gray-700 transition">
            <img
              className="w-6 h-6"
              src={assets.upload_icon}
              alt="Upload Icon"
            />
          </div>
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
        />
      </div>

      {/* Editable Fields */}
      <div className="mt-6">
        <div className="space-y-3">
          <label className="block text-gray-400">Name</label>
          <input
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={userData.name}
          />

          <label className="block text-gray-400">Phone</label>
          <input
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, phone: e.target.value }))
            }
            value={userData.phone}
          />

          <label className="block text-gray-400">Date of Birth</label>
          <input
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            type="date"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, dob: e.target.value }))
            }
            value={
              userData.dob && !isNaN(new Date(userData.dob).getTime())
                ? new Date(userData.dob).toISOString().split("T")[0]
                : ""
            }
          />

          <label className="block text-gray-400">Gender</label>
          <select
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, gender: e.target.value }))
            }
            value={userData.gender}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label className="block text-gray-400">Address</label>
          <textarea
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                address: { ...prev.address, line1: e.target.value },
              }))
            }
            value={userData.address.line1}
          ></textarea>

          <textarea
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                address: { ...prev.address, line2: e.target.value },
              }))
            }
            value={userData.address.line2}
          ></textarea>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={updateUserProfileData}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
