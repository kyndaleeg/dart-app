import React from "react";
import { User, Target } from "lucide-react";
import { finishWays } from "../../utils/finishWays";

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

  const hasFinish = finishWays[score];

  return (
    <div
      className={`bg-slate-800 rounded-2xl shadow-2xl p-6 border-4 transition-all 
      max-[1200px]:landscape:rounded-xl max-[1200px]:landscape:p-3 ${
        isActive ? "border-green-500" : "border-slate-700"
      }`}
    >
      <div className="flex items-center justify-center gap-2 mb-4 max-[1200px]:landscape:mb-2 max-[1200px]:landscape:justify-between">
        <div className="flex items-center gap-2">
          <User
            className={`w-6 h-6 max-[1200px]:landscape:w-4 max-[1200px]:landscape:h-4 ${colors.icon}`}
          />
          <h2 className="text-2xl font-bold text-white max-[1200px]:landscape:text-lg">
            <span className="max-[1200px]:landscape:hidden">
              Spieler {playerNumber}
            </span>
            <span className="hidden max-[1200px]:landscape:inline">
              P{playerNumber}
            </span>
          </h2>
        </div>
        {isActive && (
          <span className="ml-2 px-3 py-1 bg-green-500 rounded-full text-sm text-white max-[1200px]:landscape:ml-0 max-[1200px]:landscape:px-2 max-[1200px]:landscape:text-xs">
            Am Zug
          </span>
        )}
        {isWinner && (
          <span className="ml-2 px-3 py-1 bg-yellow-500 rounded-full text-sm text-white max-[1200px]:landscape:ml-0">
            Gewinner!
          </span>
        )}
      </div>

      <div className="text-center">
        <p
          className={`text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient} max-[1200px]:landscape:text-4xl`}
        >
          {score}
        </p>
        <p className="text-slate-400 mt-2 max-[1200px]:landscape:text-xs max-[1200px]:landscape:mt-1">
          Würfe: {throwCount}
        </p>

        {/* Finish-Anzeige - Responsive */}
        {hasFinish && score > 0 && score <= 170 && (
          <div className="mt-4 pt-4 border-t border-slate-700 max-[1200px]:landscape:mt-2 max-[1200px]:landscape:pt-2">
            <div className="flex items-center justify-center gap-2 mb-2 max-[1200px]:landscape:mb-1 max-[1200px]:landscape:hidden">
              <Target className="w-4 h-4 text-yellow-400" />
              <p className="text-sm font-semibold text-yellow-400">
                Finish möglich!
              </p>
            </div>

            {/* Kompakte Darstellung für Landscape */}
            <div className="hidden max-[1200px]:landscape:flex items-center justify-center gap-1 mb-1">
              <Target className="w-3 h-3 text-yellow-400" />
            </div>

            <div className="flex gap-2 justify-center flex-wrap max-[1200px]:landscape:gap-1">
              {finishWays[score].darts.map((dart, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-mono font-bold rounded-md text-sm max-[1200px]:landscape:px-2 max-[1200px]:landscape:py-0.5 max-[1200px]:landscape:text-xs"
                >
                  {dart}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2 italic max-[1200px]:landscape:hidden">
              {finishWays[score].reason}
            </p>
          </div>
        )}

        {score > 170 && (
          <div className="mt-4 pt-4 border-t border-slate-700 max-[1200px]:landscape:mt-2 max-[1200px]:landscape:pt-2">
            <p className="text-sm text-slate-500 max-[1200px]:landscape:text-xs">
              Score runterspielen
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
