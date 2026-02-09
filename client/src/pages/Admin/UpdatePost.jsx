import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { FaImage } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState("");
  const [nearArea, setNearArea] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);
  const [guest, setGuest] = useState("1");
  const [isAvailable, setIsAvailable] = useState(false);
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");

  // Fetch a single post
  const getSinglePost = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-post/${params.slug}`
      );
      const post = data.product;
      setTitle(post.title);
      setId(post._id);
      setDescription(post.description);
      setPrice(post.price);
      setSelectedCategory(post.category._id);
      setImages(post.images); // The image URLs will be set here
      setNearArea(post.nearArea);
      setFacilities(post.facilities);
      setGuest(post.guest);
      setHotelLocation(post.hotelLocation);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    getSinglePost();
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
      );
      setCategories(response.data.category);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle image changes with validation
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Check if files are valid image types (jpg, jpeg, png)
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    const invalidFiles = files.filter(
      (file) => !validImageTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      toast.warn("Invalid file type. Please upload JPG, JPEG, or PNG images.");
    } else if (files.length > 3) {
      toast.warn("You can only upload a maximum of 3 images.");
    } else {
      setImages(files); // Store new images
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("hotelLocation", hotelLocation);
      formData.append("description", description);
      formData.append("facilities", facilities);
      formData.append("nearArea", nearArea);
      formData.append("category", selectedCategory);
      formData.append("guest", guest);
      formData.append("isAvailable", isAvailable);
      formData.append("price", price);
      images.forEach((image) => formData.append("images", image));

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/post/update-post/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Post updated successfully!");
      navigate("/posts");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post. Please try again.");
    }
  };

  return (
    <div className="flex justify-between text-black">
      <div className="ml-[4rem]">
        <Navbar />
      </div>
      <div className="flex flex-col p-8 w-[81%]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Update Your Post
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[81%] p-3 border bg-white border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Hotel Location"
            value={hotelLocation}
            onChange={(e) => setHotelLocation(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Facilities"
            value={facilities}
            onChange={(e) => setFacilities(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Nearby Area"
            value={nearArea}
            onChange={(e) => setNearArea(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-[81%] bg-white border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a category</option>
            {Array.isArray(categories) &&
              categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
          </select>

          <select
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
            className="w-[81%] bg-white border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          >
            {[...Array(6)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            value={isAvailable}
            onChange={(e) =>
              setIsAvailable(e.target.value === "true" ? true : false)
            }
            className="w-[81%] bg-white border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>

          <div className="w-[81%] p-3 border border-gray-300 rounded">
            <label className="flex items-center cursor-pointer">
              <FaImage className="mr-2 text-gray-600" />
              <span>Upload Images (max 3)</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <div className="flex space-x-4 mt-2">
              {images.length > 0 &&
                images.map((image, index) => {
                  // Render images from URLs if they are available
                  const imageURL =
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image);
                  return (
                    <img
                      key={index}
                      src={imageURL}
                      alt={`Preview ${index + 1}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                  );
                })}
            </div>
          </div>

          <button
            type="submit"
            className="w-[81%] bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-300"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
