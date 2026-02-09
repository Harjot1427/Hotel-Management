import React from "react";
import Banner from "../components/Banner";
import DreamVacation from "../components/DreamVacation";
import NextTrip from "../components/NextTrip";
import Hotels from "../components/Hotels";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <DreamVacation />
      <NextTrip />
      <Hotels />
    </div>
  );
};

export default HomePage;
