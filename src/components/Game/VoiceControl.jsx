import React, { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";

export default function VoiceControl({ onScore }) {
  const [message, setMessage] = useState("");

  const processVoiceCommand = (text) => {
    const numbers = text.match(/\d+/g);

    if (numbers && numbers.length > 0) {
      const points = parseInt(numbers[0]);

      if (points >= 0 && points <= 180) {
        const result = onScore(points);
        if (result.message) {
          setMessage(result.message);
          setTimeout(() => setMessage(""), 3000);
        }
      } else {
        setMessage("Ungültiger Wert. Bitte zwischen 0 und 180.");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  const { isListening, transcript, error, toggleListening } =
    useSpeechRecognition(processVoiceCommand);

  return (
    <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 mb-6 border border-slate-700">
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={toggleListening}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
            isListening
              ? "bg-red-500 hover:bg-red-600 animate-pulse"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isListening ? (
            <MicOff className="w-10 h-10" />
          ) : (
            <Mic className="w-10 h-10" />
          )}
        </button>
        <p className="text-center">
          {isListening ? (
            <span className="text-green-400 font-semibold">🎤 Hört zu...</span>
          ) : (
            <span className="text-slate-400">Klicke zum Starten</span>
          )}
        </p>
        {transcript && (
          <p className="text-blue-400 text-sm">Erkannt: "{transcript}"</p>
        )}
        {(error || message) && (
          <p
            className={`text-sm font-semibold ${
              message?.includes("gewonnen")
                ? "text-green-400 text-xl"
                : "text-red-400"
            }`}
          >
            {error || message}
          </p>
        )}
      </div>
    </div>
  );
}
