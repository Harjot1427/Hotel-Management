import React from "react";
import {
  FaBed,
  FaUser,
  FaRulerCombined,
  FaPlaneDeparture,
} from "react-icons/fa";
import related1 from "../../assets/related/Rectangle 70.png";
import frame from "../../assets/Frame.png";
import { useNavigate, useParams } from "react-router-dom";

const RelatedProduct = ({ relatedProducts }) => {
  const navigate = useNavigate();
  const { slug } = useParams();
  return (
    <div className="flex flex-wrap gap-6 p-6 ml-12">
      {/* Coupon Card */}
      <div className="flex flex-col items-center bg-blue-500 text-white p-6 rounded-lg shadow-lg w-[19rem]">
        <div className="flex items-center mb-4">
          <FaPlaneDeparture className="text-3xl mr-2" />
          <h3 className="text-2xl font-bold">my Dream Place</h3>
        </div>
        <p className="text-5xl font-extrabold mb-2">20% OFF</p>
        <p className="mb-1 text-lg">Use Promo Code:</p>
        <p className="bg-yellow-300 text-blue-800 font-extrabold text-3xl py-1 px-4 rounded-lg shadow-md">
          Orlando
        </p>
        <img src={frame} alt="Traveler Icon" className="w-[24] h-24 mt-4" />
      </div>

      {/* Related Products */}
      {relatedProducts.map((related, index) => (
        <div
          className="bg-white shadow-md rounded-lg overflow-hidden w-[27rem]"
          key={related._id || index} // Use _id for uniqueness if available
        >
          <img
            src={related.images[0]} // Replace with actual image from `related` object
            alt={`Image of ${related.title}`}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{related.title}</h3>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <FaRulerCombined className="mr-2" /> 300 sq ft{" "}
              {/* Update dynamically if needed */}
            </div>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <FaUser className="mr-2" /> Sleeps 3 {/* Update dynamically */}
            </div>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <FaBed className="mr-2" /> 1 double bed and 1 twin bed{" "}
              {/* Update dynamically */}
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4"
              onClick={() => navigate(`/product/${related.slug}`)}
            >
              Try it
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedProduct;
