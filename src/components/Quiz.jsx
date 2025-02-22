import { useState, useEffect } from "react";
import questions from "../data/questions.json";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showAns, setShowAns] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) nextQuestion();
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      let newScore = score + 1;
      localStorage.setItem("quizScore", newScore);
      setScore((prevScore) => prevScore + 1);
      toast.success("✅ Correct!");
    } else {
      toast.error("❌ Incorrect!");
    }
    setShowAns(true);
    setTimeout(nextQuestion, 1500);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowAns(false);
      setSelectedOption("");
      setTimeLeft(30);
    } else {
      navigate("/result");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-[#D8BFD8] via-[#87CEFA] to-[#FFC0CB]">
      <motion.div
        className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl flex flex-col gap-4 w-full max-w-lg border border-white/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold text-black text-center">
          Question {currentQuestion + 1}/{questions.length}
        </h2>

        <p className="text-xl text-black font-medium text-center">
          {questions[currentQuestion].question}
        </p>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-white/50 rounded-full h-3 mt-3">
          <div
            className={`h-3 rounded-full transition-all ${
              timeLeft < 10 ? "bg-red-500" : "bg-blue-400"
            }`}
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          ></div>
        </div>
        <p className="text-black text-center font-semibold">
          ⏳ <span className={timeLeft < 10 ? "text-red-500 font-bold" : ""}>{timeLeft}s left</span>
        </p>

        {/* Multiple Choice Question */}
        {questions[currentQuestion].type === "mcq" &&
          questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full py-3 rounded-lg text-black font-semibold transition-all ${
                showAns
                  ? questions[currentQuestion].answer === option
                    ? "bg-green-300"
                    : "bg-red-300"
                  : "bg-purple-300 hover:bg-purple-400"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option}
            </motion.button>
          ))}

        {/* Integer Type Question */}
        {questions[currentQuestion].type === "integer" && (
          <div className="flex flex-col gap-3">
            <input
              type="number"
              name="option"
              id="option"
              value={selectedOption}
              onChange={(ev) => setSelectedOption(ev.target.value)}
              className="px-4 py-2 w-full border-gray-400 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-black bg-white"
            />
            <motion.button
              onClick={() => handleAnswer(Number(selectedOption))}
              className="w-full py-3 bg-purple-400 text-black font-semibold rounded-lg shadow-md hover:bg-purple-500 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
            {showAns && selectedOption && (
              <p
                className={`p-2 rounded-lg text-center ${
                  questions[currentQuestion].answer == selectedOption
                    ? "bg-green-300 text-black"
                    : "bg-red-300 text-black"
                }`}
              >
                Correct Answer: {questions[currentQuestion].answer}
              </p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;
