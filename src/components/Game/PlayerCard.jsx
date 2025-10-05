import React from "react";
import { User } from "lucide-react";

export default function PlayerCard({
  playerNumber,
  score,
  throwCount,
  isActive,
  isWinner,
}) {
  const colors =
    playerNumber === 1
      ? { gradient: "from-green-400 to-blue-500", icon: "text-blue-400" }
      : { gradient: "from-purple-400 to-pink-500", icon: "text-purple-400" };

  return (
    <div
      className={`bg-slate-800 rounded-2xl shadow-2xl p-6 border-4 transition-all ${
        isActive ? "border-green-500" : "border-slate-700"
      }`}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <User className={`w-6 h-6 ${colors.icon}`} />
        <h2 className="text-2xl font-bold">Spieler {playerNumber}</h2>
        {isActive && (
          <span className="ml-2 px-3 py-1 bg-green-500 rounded-full text-sm">
            Am Zug
          </span>
        )}
        {isWinner && (
          <span className="ml-2 px-3 py-1 bg-yellow-500 rounded-full text-sm">
            Gewinner!
          </span>
        )}
      </div>
      <div className="text-center">
        <p
          className={`text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient}`}
        >
          {score}
        </p>
        <p className="text-slate-400 mt-2">Würfe: {throwCount}</p>
      </div>
    </div>
  );
}
