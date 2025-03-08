import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Footer from "../components/Footer";
import FootInfo from "../components/FootInfo";

const HomePage = () => {
  return (
    <div className="">
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Footer />
      <FootInfo />
    </div>
  );
};

export default HomePage;
