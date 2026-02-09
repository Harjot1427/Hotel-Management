// src/components/ThankYou.js
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowMessage(true), 500); // Trigger the message after a delay
  }, []);

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center relative">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        run={showMessage}
        numberOfPieces={200}
      />
      <div className="text-center p-10 rounded-lg shadow-lg bg-white max-w-lg mx-auto relative z-10">
        <div className="space-y-5">
          <h1
            className={`text-5xl font-extrabold text-gray-800 transform transition duration-1000 ${
              showMessage
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            🎉 Thank You! 🎉
          </h1>
          <p
            className={`text-xl text-gray-600 transform transition duration-1000 ${
              showMessage
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Thank you for using our service! We appreciate your support.
          </p>
          <button
            className="bg-indigo-600 text-white py-2 px-6 rounded-full text-lg transition-all duration-300 hover:bg-indigo-700 focus:outline-none"
            onClick={() => navigate("/")}
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
