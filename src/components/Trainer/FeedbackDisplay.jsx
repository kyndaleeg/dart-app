import React from "react";
import { CheckCircle, XCircle, Star, TrendingUp } from "lucide-react";

export default function FeedbackDisplay({ feedback }) {
  return (
    <div>
      {/* Hauptfeedback */}
      <div
        className={`p-6 rounded-lg ${
          feedback.isCorrect
            ? feedback.isOptimal
              ? "bg-green-50 border-2 border-green-300"
              : "bg-blue-50 border-2 border-blue-300"
            : "bg-red-50 border-2 border-red-300"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          {feedback.isCorrect ? (
            feedback.isOptimal ? (
              <>
                <CheckCircle className="w-8 h-8 text-green-600" />
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <span className="text-2xl font-bold text-green-700">
                  Perfekt! Optimaler Weg! 🎯
                </span>
              </>
            ) : (
              <>
                <CheckCircle className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-blue-700">
                  Richtig! Aber es gibt einen besseren Weg 👍
                </span>
              </>
            )
          ) : (
            <>
              <XCircle className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold text-red-700">
                Nicht ganz...
              </span>
            </>
          )}
        </div>

        {/* Deine Antwort (wenn richtig aber nicht optimal) */}
        {feedback.isCorrect && !feedback.isOptimal && (
          <div className="mb-4 p-4 bg-white rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>Dein Weg:</strong>
            </p>
            <div className="flex gap-2 mb-2 flex-wrap">
              {feedback.userDarts.map((dart, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-500 text-white font-mono font-bold rounded-lg text-sm"
                >
                  {dart}
                </span>
              ))}
            </div>
            <p className="text-gray-600 text-sm italic">
              {feedback.userReason}
            </p>
          </div>
        )}

        {/* Deine Antwort (wenn falsch) */}
        {!feedback.isCorrect && (
          <div className="mb-4">
            <p className="text-gray-700 mb-2">
              <strong>Deine Antwort:</strong> {feedback.userDarts.join(", ")}
            </p>
          </div>
        )}

        {/* Optimaler Weg */}
        {!feedback.isOptimal && (
          <div className="bg-white p-4 rounded-lg border-2 border-green-400">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <p className="text-gray-700 font-bold">
                {feedback.isCorrect ? "Besserer Weg:" : "Optimaler Weg:"}
              </p>
            </div>
            <div className="flex gap-2 mb-3 flex-wrap">
              {feedback.correctDarts.map((dart, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-green-600 text-white font-mono font-bold rounded-lg text-lg"
                >
                  {dart}
                </span>
              ))}
            </div>
            <p className="text-gray-600 italic">
              <strong>Warum:</strong> {feedback.reason}
            </p>
          </div>
        )}
      </div>

      {/* Alternative Wege */}
      {feedback.alternatives && feedback.alternatives.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-300">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>📚</span>
            Weitere Alternativen:
          </h4>
          <div className="space-y-3">
            {feedback.alternatives.map((alt, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-lg border border-gray-200"
              >
                <div className="flex gap-2 mb-2 flex-wrap">
                  {alt.darts.map((dart, dartIdx) => (
                    <span
                      key={dartIdx}
                      className="px-3 py-1 bg-gray-600 text-white font-mono font-bold rounded text-sm"
                    >
                      {dart}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic">{alt.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lern-Tipp */}
      {feedback.isCorrect && !feedback.isOptimal && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
          <p className="text-sm text-yellow-800">
            <strong>💡 Tipp:</strong> Der optimale Weg nutzt größere
            Doppel-Felder oder ist bei Profis am gebräuchlichsten. Dein Weg
            funktioniert aber auch! 👍
          </p>
        </div>
      )}
    </div>
  );
}
