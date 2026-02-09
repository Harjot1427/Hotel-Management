import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-all-post`
      );
      setPosts(response.data.posts);
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
    <div className="flex ml-16 mt-8">
      <Navbar />
      <div className="flex flex-col items-center w-[92%] p-8 relative bottom-7">
        <h1 className="text-2xl font-bold mb-8">Your All Posts</h1>
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
                onClick={() => navigate(`/admin/post/${post.slug}`)}
              >
                {post.title}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPost;
