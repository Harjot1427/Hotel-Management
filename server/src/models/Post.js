import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  hotelLocation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },
  images: {
    type: [String],
    required: true,
    validate: [arrayLimit, "You must provide exactly 3 images"],
  },
  slug: {
    type: String,
    unique: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true,
  },
  guest: {
    type: Number,
    required: true,
    min: 1,
    max: 6,
  },
  price: {
    type: Number,
    required: true,
    min: 100,
    max: 5000,
  },
  nearArea: {
    type: [String],
    required: true,
  },
  facilities: {
    type: [String],
    required: true,
  },
});

function arrayLimit(val) {
  return val.length === 3;
}

export default mongoose.model("Post", postSchema);
