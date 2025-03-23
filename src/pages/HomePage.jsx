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
