import React from 'react';
import { User, Target } from 'lucide-react';
import { finishWays } from '../../utils/finishWays';

export default function PlayerCard({ playerNumber, score, throwCount, isActive, isWinner }) {
  const colors = playerNumber === 1 
    ? { gradient: 'from-green-400 to-blue-500', icon: 'text-blue-400', finish: 'from-green-500 to-emerald-600' }
    : { gradient: 'from-purple-400 to-pink-500', icon: 'text-purple-400', finish: 'from-purple-500 to-pink-600' };

  const hasFinish = finishWays[score];

  return (
    <div className={`bg-slate-800 rounded-2xl shadow-2xl p-6 border-4 transition-all ${
      isActive ? 'border-green-500' : 'border-slate-700'
    }`}>
      <div className="flex items-center justify-center gap-2 mb-4">
        <User className={`w-6 h-6 ${colors.icon}`} />
        <h2 className="text-2xl font-bold text-white">Spieler {playerNumber}</h2>
        {isActive && (
          <span className="ml-2 px-3 py-1 bg-green-500 rounded-full text-sm text-white">Am Zug</span>
        )}
        {isWinner && (
          <span className="ml-2 px-3 py-1 bg-yellow-500 rounded-full text-sm text-white">Gewinner!</span>
        )}
      </div>
      
      <div className="text-center">
        <p className={`text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient}`}>
          {score}
        </p>
        <p className="text-slate-400 mt-2">Würfe: {throwCount}</p>
        
        {/* Animierte Finish-Anzeige */}
        {hasFinish && score > 0 && score <= 170 && (
          <div className="mt-4 animate-pulse">
            <div className={`bg-gradient-to-r ${colors.finish} p-4 rounded-xl shadow-lg`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-5 h-5 text-white animate-bounce" />
                <p className="text-sm font-bold text-white">FINISH MÖGLICH!</p>
              </div>
              <div className="flex gap-2 justify-center flex-wrap">
                {finishWays[score].darts.map((dart, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-white text-gray-900 font-mono font-bold rounded-lg text-lg shadow-md"
                  >
                    {dart}
                  </span>
                ))}
              </div>
              <p className="text-xs text-white/90 mt-2">
                {finishWays[score].reason}
              </p>
            </div>
          </div>
        )}
        
        {/* Info wenn kein Finish */}
        {score > 170 && (
          <div className="mt-3">
            <p className="text-sm text-slate-500">
              Noch {score - 170} Punkte bis zum Finish-Bereich
            </p>
          </div>
        )}
        
        {score > 0 && score <= 170 && !hasFinish && (
          <div className="mt-3">
            <p className="text-xs text-slate-600">
              Kein Standard-Finish verfügbar
            </p>
          </div>
        )}
      </div>
    </div>
  );
}