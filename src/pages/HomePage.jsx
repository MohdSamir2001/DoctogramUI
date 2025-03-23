import React, { useEffect } from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Footer from "../components/Footer";
import FootInfo from "../components/FootInfo";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../utils/userSlice";

const HomePage = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
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
    !user && fetchUser();
  }, []);
  return (
    <div className="">
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      {!user && <Footer />}
      <FootInfo />
    </div>
  );
};

export default HomePage;
