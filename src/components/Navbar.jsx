import React from "react";
import { doctors } from "../assets/assets";

const Navbar = () => {
  return (
    <div>
      <img src={doctors[0].image} alt="" />
    </div>
  );
};
export default Navbar;
