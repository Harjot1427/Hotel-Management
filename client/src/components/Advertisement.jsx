import React from "react";
import backgroundImage from "../assets/Rectangle 18.png";
import smartphoneImage from "../assets/Isolated_right_hand_with_smartphone 2.png";

const Advertisement = () => {
  return (
    <div
      className="relative w-[94%] mx-auto h-64 md:h-[16rem] flex items-center justify-center mt-14"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-center max-[45rem]">
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-white mt-7">
            Download the mobile application for bonus <br /> coupons and travel codes
          </h2>
          <button className="w-[14rem] py-2 md:px-6 md:py-3 bg-blue-500 text-white rounded-md font-semibold">
            Download mobile app
          </button>
        </div>
        <img
          src={smartphoneImage}
          alt="Smartphone"
          className="hidden md:block w-[45rem] object-contain"
        />
      </div>
    </div>
  );
};

export default Advertisement;
