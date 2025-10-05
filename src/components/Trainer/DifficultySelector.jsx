import React from "react";

export default function DifficultySelector({ difficulty, setDifficulty }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
      <p className="text-white font-semibold mb-3 text-center">
        Schwierigkeitsgrad:
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={() => setDifficulty("all")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            difficulty === "all"
              ? "bg-yellow-500 text-black"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          Alle Finishes
        </button>
        <button
          onClick={() => setDifficulty("two-dart")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            difficulty === "two-dart"
              ? "bg-yellow-500 text-black"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          Zwei-Dart-Finish
        </button>
        <button
          onClick={() => setDifficulty("three-dart")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            difficulty === "three-dart"
              ? "bg-yellow-500 text-black"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          Drei-Dart-Finish
        </button>
      </div>
    </div>
  );
}
