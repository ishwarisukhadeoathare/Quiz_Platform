import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAttempts, saveAttempt } from "../utils/db";

const Result = () => {
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const quizScore = Number(localStorage.getItem("quizScore"));
    const isQuizCompleted = localStorage.getItem("quizStatus") === "completed";

    if (quizScore) {
      setScore(quizScore);
      if (!isQuizCompleted) {
        saveAttempt({ date: new Date().toLocaleString(), quizScore });
        localStorage.setItem("quizStatus", "completed");
      }
    }

    getAttempts().then(setHistory);
  }, [score]);

  const getMessage = () => {
    if (score > 8) return "🎉 Excellent! You did great!";
    if (score > 5) return "😊 Good job! Keep improving.";
    return "😢 Don't worry, try again!";
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-[#D8BFD8] via-[#87CEFA] to-[#FFC0CB]">
      {/* Quiz Result Card with Glassmorphism */}
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-center w-full max-w-md border border-white/50">
        <h2 className="text-2xl font-semibold text-black">Quiz Completed!</h2>

        {/* Display user's score */}
        <p className="text-lg mt-2">
          Your Score: <span className="font-bold text-blue-500">{score}</span>
        </p>

        {/* Display message based on performance */}
        <p className="text-black mt-2">{getMessage()}</p>

        {/* Previous Attempts Section */}
        {history.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mt-4 text-black">
              Previous Attempts:
            </h3>
            <ul className="space-y-2 mt-2">
              {history.map((attempt, index) => (
                <li
                  key={index}
                  className="bg-white/40 p-3 rounded-lg shadow-md text-black"
                >
                  <span className="font-medium">{attempt.date}</span>
                  <span className="text-gray-700"> - Score: </span>
                  <span className="font-bold text-blue-600">
                    {attempt.quizScore}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Button to restart the quiz */}
        <button
          className="mt-4 px-4 py-2 bg-purple-400 text-black font-semibold rounded-lg hover:bg-purple-500 transition"
          onClick={() => {
            navigate("/");
            localStorage.setItem("quizStatus", "pending");
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Result;
