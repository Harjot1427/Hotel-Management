import Booking from "../models/Booking.js";
import Post from "../models/Post.js";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";

export const searchBookings = async (req, res) => {
  try {
    const { keyword } = req.params;

    // Split the keyword into individual words
    const words = keyword.split(" ");

    // Build the query to match any word in the description
    const results = await Post.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        {
          description: {
            $regex: words.join("|"), // Matches any of the words
            $options: "i", // Case-insensitive
          },
        },
      ],
    }).select("title hotelLocation images description");

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is missing");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
};
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, description, customerName, customerAddress } =
      req.body;

    if (
      !amount ||
      !currency ||
      !description ||
      !customerName ||
      !customerAddress
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Amount, currency, description, customer name, and address are required",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
      description,
      shipping: {
        name: customerName,
        address: {
          line1: customerAddress.line1,
          city: customerAddress.city,
          state: customerAddress.state,
          postal_code: customerAddress.postalCode,
          country: customerAddress.country,
        },
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment intent",
      error: error.message,
    });
  }
};

export const updateAvailability = async (req, res) => {
  const { postId, isAvailable } = req.body;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: "Invalid postId format." });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { isAvailable },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { token, postId, bookingDate, transactionId } = req.body;

    if (!token || !postId || !bookingDate || !transactionId) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required: token, postId, bookingDate, transactionId.",
      });
    }

    // Decode the token to get userId
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    // Use the decoded userId from the token
    const userId = decoded.id;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Validate post existence
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Create a new booking
    const booking = new Booking({
      user: userId, // Use the decoded userId here
      post: postId,
      bookingDate,
      transactionId,
      paymentStatus: "paid",
    });

    const savedBooking = await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate("user post", "name title"); // Populate user and post details if needed
    return res.status(200).json({
      success: true,
      message: "All Bookings List",
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};
