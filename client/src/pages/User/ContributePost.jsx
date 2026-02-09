import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useAuth } from "../../context/UserContext";
import { FaPlus } from "react-icons/fa";

const ContributePost = () => {
  const [auth] = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("image", formData.image);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/contribute/contribute-post`,
        data,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
      setFormData({ title: "", description: "", category: "", image: null });
      setImagePreview(null);
    } catch (error) {
      console.error("Error submitting contribution:", error);
      setMessage("Error submitting contribution. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
      );
      setCategory(response.data.category);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-6 space-y-6 md:space-y-0 md:space-x-6 ml-20 mt-4">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-3/4 lg:w-1/2 mx-auto p-8 rounded-lg bg-white shadow-lg"
      >
        <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
          Create a Contribution
        </h2>
        {message && (
          <div
            className={`text-center p-3 mb-4 rounded ${
              message.includes("Error")
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {message}
          </div>
        )}
        <div className="mb-6">
          <label className="block font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enter title"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enter description"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block font-medium mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {category.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="image"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="w-full text-gray-700"
            required
          />
          {imagePreview && (
            <div className="mt-4">
              <p className="text-gray-600 mb-2">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-lg shadow"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`w-full flex items-center justify-center py-3 px-4 text-white font-bold rounded-lg shadow-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            loading && "opacity-70 cursor-not-allowed"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
          {!loading && <FaPlus className="ml-2" />}
        </button>
      </form>
    </div>
  );
};

export default ContributePost;
