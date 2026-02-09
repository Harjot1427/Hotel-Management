import React from "react";
import { useBook } from "../context/Booking";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./User/Navbar";

const YourOrder = () => {
  const [book, setBook] = useBook();
  const navigate = useNavigate();

  const handleCheckout = async (orderId, postId) => {
    try {
      // Filter out the completed order
      const updatedBooking = book.filter((item) => item._id !== orderId);
      setBook(updatedBooking);
      localStorage.setItem("booking", JSON.stringify(updatedBooking));
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/booking/update-availability`,
        {
          postId,
          isAvailable: true,
        }
      );
      toast.success("Order completed and room is now available again!");
      navigate("/thank-you");
    } catch (error) {
      console.error("Error during checkout:", error.message);
      toast.error("Failed to complete the order. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row mt-6">
      <div className="lg:w-1/4 w-full ml-12">
        <Navbar />
      </div>
      <div className="lg:w-3/4 w-full p-4 lg:p-8 bg-gray-50">
        {book && Array.isArray(book) && book.length > 0 ? (
          book.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 max-w-screen-md mx-auto mb-6 transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 text-center">
                Order: {order.title}
              </h1>
              <div className="mb-4">
                <p className="text-gray-600 text-lg">
                  <span className="font-semibold">Customer:</span>{" "}
                  {order.customerName}
                </p>
                <p className="text-gray-600 text-lg">
                  <span className="font-semibold">Price:</span> ${order.amount}
                </p>
              </div>
              <div className="flex justify-center lg:justify-between items-center">
                <button
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 shadow hover:bg-blue-700 transition"
                  onClick={() => handleCheckout(order._id, order.postId)}
                >
                  <FaShoppingCart />
                  <span>Checkout</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg text-center">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default YourOrder;
