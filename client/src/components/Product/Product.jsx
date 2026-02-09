import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaStar,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import Spinner from "../Spinner";
import { useCart } from "../../context/Cart";
import { toast } from "react-toastify";
import { useAuth } from "../../context/UserContext";
import { useBook } from "../../context/Booking";

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [booking, setBooking] = useBook();

  console.log("Related Products", relatedProducts);
  console.log("This is postId", postDetails?._id);
  console.log(
    "This is product categoryID",
    postDetails?.category?._id
  );

  useEffect(() => {
    if (params?.slug) {
      getPostBySlug();
    }
  }, [params?.slug]);

  const getPostBySlug = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-post/${params.slug}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );

      const product = res?.data?.product;

      if (!product) {
        setPostDetails(null);
        return;
      }

      setPostDetails(product);
      getRelatedPost(product?._id, product?.category?._id);
    } catch (error) {
      console.error("Error fetching post details:", error);
      setPostDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const getRelatedPost = async (pid, cid) => {
    if (!pid || !cid) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/related-post/${pid}/${cid}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );
      setRelatedProducts(res?.data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckIn = () => {
    if (!auth?.token) {
      toast.error("Authentication required to proceed!");
      return navigate("/login");
    }

    navigate("/payment", {
      state: {
        price: postDetails?.price,
        product: postDetails?.title,
        postId: postDetails?._id,
      },
    });
  };

  const handleAddToCart = () => {
    if (!postDetails?.isAvailable) return;

    setCart([...cart, postDetails]);
    localStorage.setItem("cart", JSON.stringify([...cart, postDetails]));
    toast.success("Item Added to cart");
  };

  // ---------------- SAFETY RENDERS ----------------

  if (loading) {
    return (
      <div className="p-8">
        <Spinner />
      </div>
    );
  }

  if (!postDetails) {
    return (
      <div className="text-center mt-20 text-xl">
        Product not found
      </div>
    );
  }

  // ---------------- UI ----------------

  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:space-x-8 overflow-hidden">
        {/* Images */}
        <div className="flex flex-col space-y-4 p-4 md:w-1/2">
          {postDetails.images?.length > 0 && (
            <>
              <img
                src={postDetails.images[0]}
                alt="Main"
                className="w-full h-[25rem] object-cover rounded-lg shadow-md"
              />
              <div className="grid grid-cols-2 gap-2">
                {postDetails.images.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`img-${idx}`}
                    className="object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 p-8 md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">
            {postDetails.title}
          </h1>

          <div className="flex items-center space-x-2 text-yellow-500 mb-4">
            <FaStar />
            <span className="text-xl font-semibold">4.5</span>
            <span className="text-gray-500">(1200 Reviews)</span>
          </div>

          <p className="flex items-center text-gray-600 mb-4">
            <MdLocationOn className="text-xl" />
            {postDetails.hotelLocation || "Location unavailable"}
          </p>

          <div className="flex space-x-4 mb-6">
            <button
              disabled={!postDetails.isAvailable}
              onClick={handleCheckIn}
              className={`px-6 py-3 rounded-lg ${
                postDetails.isAvailable
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              Check-In
            </button>

            <button
              disabled={!postDetails.isAvailable}
              onClick={handleAddToCart}
              className="px-6 py-3 rounded-lg bg-gray-200"
            >
              Add to Wishlist
            </button>
          </div>

          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="mt-2 text-gray-600">{postDetails.description}</p>

          <p className="mt-4 font-bold text-orange-600">
            Price Per Day:{" "}
            <span className="text-gray-500">
              {postDetails.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </p>
        </div>
      </div>

      <h1 className="ml-11 font-semibold text-3xl mb-7 mt-5">
        You may like this:
      </h1>

      <RelatedProduct relatedProducts={relatedProducts} />
    </div>
  );
};

export default Product;
