import React from "react";
import ProfileMenu from "../profile/profileMenu";

const Navbar: React.FC = () => {
  return (
    <div className="w-full h-16 bg-white shadow flex between items-center px-6">

      <div> <h1 className="text-xl font-semibold">Finance Tracker</h1></div>

      <div className="ml-auto"> <ProfileMenu/> </div>
      

    </div>
  );
};

export default Navbar;