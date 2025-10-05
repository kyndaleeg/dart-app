import React from "react";

export default function QuickScoreButtons({ onScore, disabled }) {
  const quickScores = [26, 41, 45, 60, 81, 100, 140, 180];

  return (
    <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 mb-6 border border-slate-700">
      <h3 className="text-lg font-semibold mb-4 text-center text-white">
        Schnellauswahl
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {quickScores.map((points) => (
          <button
            key={points}
            onClick={() => onScore(points)}
            className="bg-slate-700 hover:bg-slate-600 rounded-lg py-3 px-2 font-semibold transition-colors text-sm text-white disabled:opacity-50"
            disabled={disabled}
          >
            {points}
          </button>
        ))}
      </div>
    </div>
  );
}
