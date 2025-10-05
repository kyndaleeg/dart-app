import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function FeedbackDisplay({ feedback }) {
  return (
    <div className={`p-6 rounded-lg ${
      feedback.isCorrect 
        ? 'bg-green-50 border-2 border-green-300' 
        : 'bg-red-50 border-2 border-red-300'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        {feedback.isCorrect ? (
          <>
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-green-700">
              Richtig! 🎯
            </span>
          </>
        ) : (
          <>
            <XCircle className="w-8 h-8 text-red-600" />
            <span className="text-2xl font-bold text-red-700">
              Nicht ganz...
            </span>
          </>
        )}
      </div>

      {!feedback.isCorrect && (
        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            <strong>Deine Antwort:</strong> {feedback.userDarts.join(', ')}
          </p>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg">
        <p className="text-gray-700 mb-2">
          <strong>Optimaler Weg:</strong>
        </p>
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
    </div>
  );
}