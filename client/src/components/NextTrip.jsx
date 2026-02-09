import React from "react";
import Image1 from "../assets/Post/Rectangle 16.png";
import Image2 from "../assets/Post/Rectangle 17.png";
import Image3 from "../assets/Post/Rectangle 8 (1).png";

const NextTrip = () => {
  const trips = [
    {
      image: Image1,
      title: "Sydney’s 10 most fashionable 5 star hotels",
      description:
        "Browse the fastest growing tourism sector in the heart of Australia's tourism capital ....",
    },
    {
      image: Image2,
      title: "Top cities for Vegan Travellers",
      description:
        "Top sites where you do not have to worry about being a vegan. Our tourist guide is here...",
    },
    {
      image: Image3,
      title: "World’s top destinations during and post covid timeline",
      description:
        "Pandemic is still intact and will be here for a longer time. Here’s where your next destination...",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-14 px-4">
      <h1 className="text-3xl font-semibold mb-6 ml-[10px]">
        Get inspiration for your next trip
      </h1>
      <div className="flex flex-wrap gap-6 justify-center mt-14">
        {trips.map((trip, index) => (
          <div
            key={index}
            className="relative w-[24rem] h-[15rem] rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={trip.image}
              alt={trip.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 p-4 flex flex-col justify-end">
              <h2 className="text-white text-lg font-semibold">{trip.title}</h2>
              <p className="text-gray-200 text-sm">{trip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextTrip;
