import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex items-center justify-center p-4 bg-white mt-12 rounded-md space-x-2">
      <div className="flex items-center bg-gray-100 rounded-md p-2">
        <FaMapMarkerAlt className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Melbourne"
          className="bg-transparent outline-none text-gray-700"
        />
      </div>

      <div className="flex items-center bg-gray-100 rounded-md p-2">
        <FaCalendarAlt className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Mar 18, 2022"
          className="bg-transparent outline-none text-gray-700"
        />
      </div>

      <div className="flex items-center bg-gray-100 rounded-md p-2">
        <FaCalendarAlt className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="March 20, 2022"
          className="bg-transparent outline-none text-gray-700"
        />
      </div>

      <div className="flex items-center bg-gray-100 rounded-md p-2">
        <FaUser className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="2 adults, 1 room"
          className="bg-transparent outline-none text-gray-700"
        />
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
