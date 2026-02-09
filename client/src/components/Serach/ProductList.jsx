import React from "react";

const ProductList = ({ products }) => {
  return (
    <div className="flex flex-col items-center w-[92%] relative bottom-7 ml-12">
      <h1 className="text-2xl font-bold mb-8 mt-9">
        {products.length < 1
          ? "No Products Found"
          : `Search Results Found: ${products.length}`}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[24px]">
        {products.map((post) => (
          <article
            key={post._id}
            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-[21rem] mx-auto shadow-lg"
          >
            <img
              src={post.images?.[0] || "https://via.placeholder.com/150"}
              alt={post.title || "Post Thumbnail"}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <h3 className="z-10 mt-3 text-3xl font-bold text-white">
              {post.hotelLocation || "Location not available"}
            </h3>
            <div className="z-10 text-sm leading-6 text-gray-300">
              {post.title || "Title not available"}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
