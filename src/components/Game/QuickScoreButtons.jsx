import React, { useState } from "react";

export default function QuickScoreButtons({ onScore, disabled }) {
  const [inputValue, setInputValue] = useState("");
  const quickScores = [26, 41, 45, 60, 81, 100, 140, 180];

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = parseInt(inputValue);

    if (isNaN(score)) {
      return;
    }

    if (score < 0 || score > 180) {
      alert("Bitte eine Zahl zwischen 0 und 180 eingeben");
      return;
    }

    onScore(score);
    setInputValue("");

    // Fokus zurück auf Eingabefeld
    document.querySelector('input[type="number"]')?.focus();
  };

  const handleQuickScore = (points) => {
    onScore(points);
    // Fokus zurück auf Eingabefeld
    document.querySelector('input[type="number"]')?.focus();
  };

  return (
    <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 mb-6 border border-slate-700">
      <h3 className="text-lg font-semibold mb-4 text-center text-white">
        Score eingeben
      </h3>

      {/* Eingabefeld */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Score eingeben (0-180)"
            min="0"
            max="180"
            disabled={disabled}
            autoFocus
            className="flex-1 px-4 py-3 text-xl border-2 border-slate-600 bg-slate-700 text-white rounded-lg focus:border-green-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder-slate-400 font-semibold text-center"
          />
          <button
            type="submit"
            disabled={disabled || !inputValue}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            ✓
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">
          Enter zum Eintragen drücken
        </p>
      </form>

      {/* Schnellauswahl Buttons */}
      <div className="border-t border-slate-600 pt-4">
        <p className="text-sm text-slate-400 mb-3 text-center">
          Schnellauswahl:
        </p>
        <div className="grid grid-cols-4 gap-2">
          {quickScores.map((points) => (
            <button
              key={points}
              onClick={() => handleQuickScore(points)}
              className="bg-slate-700 hover:bg-slate-600 rounded-lg py-2 px-2 font-semibold transition-colors text-sm text-white disabled:opacity-50 hover:scale-105 transform"
              disabled={disabled}
            >
              {points}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
