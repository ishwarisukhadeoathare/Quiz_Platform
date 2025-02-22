import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  console.log("🏠 Home Component Rendered!"); // Debugging

  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-red-300 to-blue-300">
      <div className="bg-white text-center p-10 rounded-2xl shadow-2xl max-w-lg">
        <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 drop-shadow-lg">
          🧠 Welcome to the Ultimate Quiz!
        </h1>
        <p className="text-lg mb-6 text-gray-800 font-medium">
          Ready to test your knowledge? Challenge yourself with fun and interactive questions! 🎯
        </p>
        <button
          onClick={() => navigate("/quiz")}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
