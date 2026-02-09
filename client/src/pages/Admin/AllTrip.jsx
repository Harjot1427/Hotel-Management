import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { FaRegCalendarAlt, FaRegMoneyBillAlt, FaUserAlt } from "react-icons/fa";

const AllTrip = () => {
  const [bookingList, setAllBookingList] = useState([]);

  const getAllTrip = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/booking/get-all-bookings`
    );
    setAllBookingList(response.data.bookings);
  };

  useEffect(() => {
    getAllTrip();
  }, []);

  return (
    <div className="flex p-4">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full ml-8">
        {bookingList.map((booking) => (
          <div
            key={booking._id}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {booking.post.title}
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                <FaRegCalendarAlt className="inline-block mr-2" />
                {new Date(booking.bookingDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                <FaRegMoneyBillAlt className="inline-block mr-2" />
                Payment Status: {booking.paymentStatus}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                <FaUserAlt className="inline-block mr-2" />
                User: {booking.user.name}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Status:{" "}
                <span
                  className={`${
                    booking.status === "pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  } font-bold`}
                >
                  {booking.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrip;
