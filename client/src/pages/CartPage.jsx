import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useAuth } from "../context/UserContext";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  console.log("All Information about cart:", cart);

  const handleCheckIn = () => {
    if (!auth?.token) {
      toast.error("Authentication required to proceed!");
      return navigate("/login");
    }

    if (!cart.length) {
      toast.error("Your cart is empty.");
      return;
    }

    // Log the total price and product details
    console.log("Total Price:", totalPrice());

    // Pass cart details to the payment page
    navigate("/payment", {
      state: {
        totalPrice: totalPrice(),
        products: cart.map((product) => ({
          title: product.title,
          postId: product._id,
          price: product.price,
        })),
      },
    });
  };

  const handleRemove = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      if (index !== -1) {
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      return cart
        .reduce((total, item) => total + item.price, 0)
        .toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
    } catch (error) {
      console.log(error);
      return "$0.00";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full p-6 gap-8 bg-gray-50">
      {/* Left Side - Product Details */}
      <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
        {cart.length > 0 ? (
          cart.map((product) => {
            console.log("Product Details:", product); // Log to ensure product details are present
            return (
              <div
                key={product._id}
                className="flex items-center gap-6 p-4 border-b border-gray-200 last:border-none"
              >
                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(product._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FaTrashAlt size={20} />
                </button>
                {/* Product Image */}
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-28 h-28 object-cover rounded-lg"
                />
                {/* Product Info */}
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-700">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product.description.substring(0, 50)}
                  </p>
                </div>
                {/* Product Price */}
                <div className="ml-auto text-lg font-semibold text-gray-800">
                  ${product.price}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center mt-6">Your cart is empty.</p>
        )}
      </div>

      {/* Right Side - Price Summary */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Price Details</h2>
        {cart.length > 0 ? (
          <>
            <div className="flex flex-col gap-4">
              {cart.map((product) => (
                <div
                  key={product._id}
                  className="flex justify-between items-center text-gray-700"
                >
                  <span>{product.title}</span>
                  <span className="font-semibold">${product.price}</span>
                </div>
              ))}
            </div>
            <hr className="my-6 border-gray-300" />
            <div className="flex justify-between items-center font-bold text-xl text-gray-800">
              <span>Total:</span>
              <span>{totalPrice()}</span>
            </div>
            {auth?.token ? (
              <button
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold"
                onClick={handleCheckIn}
              >
                Proceed to Checkout
              </button>
            ) : (
              <button
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold"
                onClick={() => navigate("/login")}
              >
                Please Login
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-500">No items to display.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
