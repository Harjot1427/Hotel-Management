import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SelectedCategory = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState([]);
  console.log(" post: ", posts);
  const { slug } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/select-category/${slug}`
      );
      setCategory(response.data.category);
      setPosts(response.data.products);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center w-[92%] p-8 relative bottom-7 mt-11 mx-auto">
      <h1 className="text-2xl font-bold mb-8 mt-5">{category.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <article
            key={post._id}
            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-[21rem] mx-auto shadow-lg"
          >
            <img
              src={post.images[currentImageIndex]}
              alt="Post Thumbnail"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <h3 className="z-10 mt-3 text-3xl font-bold text-white">
              {post.hotelLocation}
            </h3>
            <div
              className="z-10 text-sm leading-6 text-gray-300"
              onClick={() => navigate(`/product/${post.slug}`)}
            >
              {post.title}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SelectedCategory;
