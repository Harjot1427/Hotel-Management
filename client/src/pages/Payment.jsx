import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useBook } from "../context/Booking";
import { useAuth } from "../context/UserContext";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useBook();
  // console.log(book);

  const [auth] = useAuth();
  // console.log(auth);
  console.log("This is token", auth?.token);
  console.log("This is user Id", auth?.user?.id);

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Fetch product title and price dynamically from location state
  useEffect(() => {
    if (location?.state) {
      setAmount(location.state.price || 0);
      setTitle(location.state.product || "Product");
      if (location.state.postId) {
        console.log("2nd Post ID:", location.state.postId); // Debugging purpose
      } else {
        console.error("Post ID is missing in location.state");
      }
    }
  }, [location]);

  const handleCountryCodeConversion = (country) => {
    const countryMapping = {
      India: "IN",
    };
    return countryMapping[country] || country;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet. Please try again.");
      return;
    }

    if (
      !customerName ||
      !customerAddress.line1 ||
      !customerAddress.city ||
      !customerAddress.country
    ) {
      toast.error("Please fill out all the required fields.");
      return;
    }

    const convertedCountry = handleCountryCodeConversion(
      customerAddress.country
    );

    setLoading(true);

    try {
      // Create a payment intent on the server
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/booking/create-payment-intent`,
        {
          amount: amount * 100, // Amount in cents
          currency: "usd",
          description: `Payment for ${title}`,
          customerName,
          customerAddress: { ...customerAddress, country: convertedCountry },
        }
      );

      const clientSecret = data.clientSecret;

      // Confirm the payment on the client
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: customerName,
              address: {
                line1: customerAddress.line1,
                city: customerAddress.city,
                state: customerAddress.state,
                postal_code: customerAddress.postalCode,
                country: convertedCountry,
              },
            },
          },
        }
      );

      if (error) {
        toast.error(`Payment failed: ${error.message}`);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // After payment success, create the booking
        const bookingData = {
          token: auth?.token, // Replace with actual userId
          postId: location.state.postId,
          bookingDate: new Date(), // Set the booking date
          transactionId: paymentIntent.id,
        };

        console.log("Booking Data Sent:", bookingData);

        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/booking/create-booking`,
          bookingData
        );
        const updatedBooking = [
          ...book,
          { title, amount, customerName, postId: location.state?.postId },
        ];
        setBook(updatedBooking);
        localStorage.setItem("booking", JSON.stringify(updatedBooking));

        // Update product availability
        await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/api/booking/update-availability`,
          {
            postId: location.state.postId,
            isAvailable: false,
          }
        );

        // Redirect to orders
        toast.success("Payment and booking successful!");
        navigate("/user/your-order");
      }
    } catch (error) {
      console.error("Error processing payment:", error.message);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Payment</h1>

      {/* Display product title and price */}
      <div className="bg-gray-100 p-4 rounded-md mb-4 shadow-md">
        <h2 className="text-xl font-medium text-gray-800">{title}</h2>
        <p className="text-lg text-gray-600">
          Price:{" "}
          <span className="text-green-600 font-semibold">
            {amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </p>
      </div>

      <form onSubmit={handlePayment} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="p-3 border rounded-md"
            placeholder={auth.user?.name}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="text-gray-700 mb-2">
            Address Line 1
          </label>
          <input
            type="text"
            id="address"
            value={customerAddress.line1}
            onChange={(e) =>
              setCustomerAddress({ ...customerAddress, line1: e.target.value })
            }
            className="p-3 border rounded-md"
            placeholder="Enter address"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            value={customerAddress.city}
            onChange={(e) =>
              setCustomerAddress({ ...customerAddress, city: e.target.value })
            }
            className="p-3 border rounded-md"
            placeholder="Enter city"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="state" className="text-gray-700 mb-2">
            State
          </label>
          <input
            type="text"
            id="state"
            value={customerAddress.state}
            onChange={(e) =>
              setCustomerAddress({ ...customerAddress, state: e.target.value })
            }
            className="p-3 border rounded-md"
            placeholder="Enter state"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="postalCode" className="text-gray-700 mb-2">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            value={customerAddress.postalCode}
            onChange={(e) =>
              setCustomerAddress({
                ...customerAddress,
                postalCode: e.target.value,
              })
            }
            className="p-3 border rounded-md"
            placeholder="Enter postal code"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="country" className="text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            id="country"
            value={customerAddress.country}
            onChange={(e) =>
              setCustomerAddress({
                ...customerAddress,
                country: e.target.value,
              })
            }
            className="p-3 border rounded-md"
            placeholder="Enter country (e.g., India)"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="card" className="text-gray-700 mb-2">
            Card Details
          </label>
          <CardElement id="card" className="p-3 border rounded-md" />
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`px-6 py-3 text-white rounded-lg ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default Payment;
