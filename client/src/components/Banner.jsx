import React, { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import BannerImage from "../assets/Rectangle 2.png";
import { useSearch } from "../context/Serach";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearch();

  const handelSerach = async (e) => {
    e.preventDefault();
    if (!search.keyword) {
      console.error("Search keyword is missing");
      return;
    }
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/booking/search/${
        search.keyword
      }`;
      console.log("Requesting:", url);
      const { data } = await axios.get(url);
      setSearch({ ...search, results: data });
      navigate("/search");
    } catch (error) {
      console.error("Error during search API call:", error);
    }
  };

  return (
    <div
      className="relative w-full h-[500px] bg-cover bg-center"
      style={{ backgroundImage: `url(${BannerImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white h-full px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          Enjoy Your Dream Vacation
        </h1>
        <p className="text-base sm:text-lg mt-2 text-center">
          Plan and book your perfect trip with expert advice, travel tips,
          destination information, and inspiration from us.
        </p>

        {/* Search Bar */}
        <div className="mt-8 w-full max-w-[57rem] sm:w-[80%] md:w-[60%] bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search destinations..."
            className="flex-grow p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={search.keyword}
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
          />
          <button
            onClick={handelSerach}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
