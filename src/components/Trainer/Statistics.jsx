import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

export default function Statistics({ stats, detailedStats, showStats, setShowStats }) {
  const successRate = stats.total > 0 
    ? Math.round((stats.correct / stats.total) * 100) 
    : 0;

  const getPercentage = (correct, total) => {
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  return (
    <>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-semibold">
            Erfolgsquote: {successRate}%
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-white">
            <span className="text-green-300 font-bold">{stats.correct}</span>
            <span className="text-white/70"> / {stats.total}</span>
          </div>
          <button
            onClick={() => setShowStats(!showStats)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <BarChart3 className="w-4 h-4" />
            {showStats ? 'Verbergen' : 'Statistiken'}
          </button>
        </div>
      </div>

      {showStats && (
        <div className="bg-white rounded-xl shadow-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Detaillierte Statistiken
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Nach Score-Bereich:</h3>
            <div className="space-y-2">
              {Object.entries(detailedStats.byRange).map(([range, stat]) => (
                <div key={range} className="flex items-center gap-3">
                  <div className="w-24 text-sm font-medium text-gray-600">{range}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div
                      className="bg-green-500 h-full transition-all duration-300"
                      style={{ width: `${getPercentage(stat.correct, stat.total)}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {stat.total > 0 ? `${getPercentage(stat.correct, stat.total)}%` : '0%'} ({stat.correct}/{stat.total})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Nach Dart-Anzahl:</h3>
            <div className="space-y-2">
              {Object.entries(detailedStats.byDartCount).map(([type, stat]) => {
                const label = type === 'one' ? 'Ein-Dart' : type === 'two' ? 'Zwei-Dart' : 'Drei-Dart';
                return (
                  <div key={type} className="flex items-center gap-3">
                    <div className="w-24 text-sm font-medium text-gray-600">{label}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="bg-blue-500 h-full transition-all duration-300"
                        style={{ width: `${getPercentage(stat.correct, stat.total)}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
                        {stat.total > 0 ? `${getPercentage(stat.correct, stat.total)}%` : '0%'} ({stat.correct}/{stat.total})
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}