import React from "react";

export default function ThrowHistory({ playerNumber, throws }) {
  const color = playerNumber === 1 ? "text-blue-400" : "text-purple-400";

  return (
    <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 border border-slate-700">
      <h3 className={`text-lg font-semibold mb-4 ${color}`}>
        Spieler {playerNumber} - Verlauf
      </h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {throws.length === 0 ? (
          <p className="text-slate-500 text-center py-4">Noch keine Würfe</p>
        ) : (
          throws.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-700 rounded-lg p-3 flex justify-between items-center"
            >
              <span className={`font-semibold ${color}`}>-{t.points}</span>
              <span className="text-slate-400">→ {t.remaining}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
