import React, { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { finishWays, checkFinishAnswer } from "../../utils/finishWays";
import FeedbackDisplay from "./FeedbackDisplay";

export default function FinishQuestion({ currentScore, onCheck, onNext }) {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    setUserInput("");
    setFeedback(null);
  }, [currentScore]);

  const normalizeInput = (input) => {
    return input
      .toUpperCase()
      .replace(/\s+/g, "")
      .split(",")
      .map((dart) => dart.trim())
      .filter((dart) => dart.length > 0);
  };

  const handleCheck = () => {
    if (!userInput.trim() || !currentScore || !finishWays[currentScore]) return;

    const userDarts = normalizeInput(userInput);
    const result = checkFinishAnswer(currentScore, userDarts);

    setFeedback({
      isCorrect: result.found,
      isOptimal: result.isOptimal,
      userDarts: userDarts,
      userReason: result.userReason,
      correctDarts: result.correctDarts,
      reason: result.reason,
      alternatives: result.alternatives || [],
    });

    onCheck(userDarts, result.found);
  };

  const handleNext = () => {
    setUserInput("");
    setFeedback(null);
    onNext();
  };

  if (!currentScore || !finishWays[currentScore]) {
    return (
      <div className="bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center">
          <p className="text-gray-600">Lade Frage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-2">Wie finishst du:</p>
        <div className="text-7xl font-bold text-green-700 mb-4">
          {currentScore}
        </div>
        <p className="text-sm text-gray-500">
          Gib deine Antwort ein (z.B. T20, T20, D20)
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !feedback && handleCheck()}
          placeholder="z.B. T20, S20, D20"
          disabled={feedback !== null}
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none disabled:bg-gray-100 text-gray-900"
        />
      </div>

      <div className="flex gap-3 mb-6">
        {!feedback ? (
          <button
            onClick={handleCheck}
            disabled={!userInput.trim()}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Prüfen
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Nächste Frage
          </button>
        )}
      </div>

      {feedback && <FeedbackDisplay feedback={feedback} />}
    </div>
  );
}
