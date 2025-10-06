import React, { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';

export default function VoiceControl({ onScore }) {
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('');
  const recognitionRef = React.useRef(null);

  // Zahlen-Mapping für bessere Erkennung
  const numberWords = {
    // 0-20
    null: 0,
    ein: 1,
    eins: 1,
    zwei: 2,
    drei: 3,
    vier: 4,
    fünf: 5,
    sechs: 6,
    sieben: 7,
    acht: 8,
    neun: 9,
    zehn: 10,
    elf: 11,
    zwölf: 12,
    dreizehn: 13,
    vierzehn: 14,
    fünfzehn: 15,
    sechzehn: 16,
    siebzehn: 17,
    achtzehn: 18,
    neunzehn: 19,
    zwanzig: 20,

    // 21-29
    einundzwanzig: 21,
    zweiundzwanzig: 22,
    dreiundzwanzig: 23,
    vierundzwanzig: 24,
    fünfundzwanzig: 25,
    sechsundzwanzig: 26,
    siebenundzwanzig: 27,
    achtundzwanzig: 28,
    neunundzwanzig: 29,

    // 30-39
    dreißig: 30,
    einunddreißig: 31,
    zweiunddreißig: 32,
    dreiunddreißig: 33,
    vierunddreißig: 34,
    fünfunddreißig: 35,
    sechsunddreißig: 36,
    siebenunddreißig: 37,
    achtunddreißig: 38,
    neununddreißig: 39,

    // 40-49
    vierzig: 40,
    einundvierzig: 41,
    zweiundvierzig: 42,
    dreiundvierzig: 43,
    vierundvierzig: 44,
    fünfundvierzig: 45,
    sechsundvierzig: 46,
    siebenundvierzig: 47,
    achtundvierzig: 48,
    neunundvierzig: 49,

    // 50-59
    fünfzig: 50,
    einundfünfzig: 51,
    zweiundfünfzig: 52,
    dreiundfünfzig: 53,
    vierundfünfzig: 54,
    fünfundfünfzig: 55,
    sechsundfünfzig: 56,
    siebenundfünfzig: 57,
    achtundfünfzig: 58,
    neunundfünfzig: 59,

    // 60-69
    sechzig: 60,
    einundsechzig: 61,
    zweiundsechzig: 62,
    dreiundsechzig: 63,
    vierundsechzig: 64,
    fünfundsechzig: 65,
    sechsundsechzig: 66,
    siebenundsechzig: 67,
    achtundsechzig: 68,
    neunundsechzig: 69,

    // 70-79
    siebzig: 70,
    einundsiebzig: 71,
    zweiundsiebzig: 72,
    dreiundsiebzig: 73,
    vierundsiebzig: 74,
    fünfundsiebzig: 75,
    sechsundsiebzig: 76,
    siebenundsiebzig: 77,
    achtundsiebzig: 78,
    neunundsiebzig: 79,

    // 80-89
    achtzig: 80,
    einundachtzig: 81,
    zweiundachtzig: 82,
    dreiundachtzig: 83,
    vierundachtzig: 84,
    fünfundachtzig: 85,
    sechsundachtzig: 86,
    siebenundachtzig: 87,
    achtundachtzig: 88,
    neunundachtzig: 89,

    // 90-99
    neunzig: 90,
    einundneunzig: 91,
    zweiundneunzig: 92,
    dreiundneunzig: 93,
    vierundneunzig: 94,
    fünfundneunzig: 95,
    sechsundneunzig: 96,
    siebenundneunzig: 97,
    achtundneunzig: 98,
    neunundneunzig: 99,

    // 100-109
    hundert: 100,
    einhundert: 100,
    hunderteins: 101,
    einhunderteins: 101,
    hundertzwei: 102,
    einhundertzwei: 102,
    hundertdrei: 103,
    einhundertdrei: 103,
    hundertvier: 104,
    einhundertvier: 104,
    hundertfünf: 105,
    einhundertfünf: 105,
    hundertsechs: 106,
    einhundertsechs: 106,
    hundertsieben: 107,
    einhundertsieben: 107,
    hundertacht: 108,
    einhundertacht: 108,
    hundertneun: 109,
    einhundertneun: 109,

    // 110-119
    hundertzehn: 110,
    einhundertzehn: 110,
    hundertelf: 111,
    einhundertelf: 111,
    hundertzwölf: 112,
    einhundertzwölf: 112,
    hundertdreizehn: 113,
    einhundertdreizehn: 113,
    hundertvierzehn: 114,
    einhundertvierzehn: 114,
    hundertfünfzehn: 115,
    einhundertfünfzehn: 115,
    hundertsechzehn: 116,
    einhundertsechzehn: 116,
    hundertsiebzehn: 117,
    einhundertsiebzehn: 117,
    hundertachtzehn: 118,
    einhundertachtzehn: 118,
    hundertneunzehn: 119,
    einhundertneunzehn: 119,

    // 120-129
    hundertzwanzig: 120,
    einhundertzwanzig: 120,
    hunderteinundzwanzig: 121,
    einhunderteinundzwanzig: 121,
    hundertzweiundzwanzig: 122,
    einhundertzweiundzwanzig: 122,
    hundertdreiundzwanzig: 123,
    einhundertdreiundzwanzig: 123,
    hundertvierundzwanzig: 124,
    einhundertvierundzwanzig: 124,
    hundertfünfundzwanzig: 125,
    einhundertfünfundzwanzig: 125,
    hundertsechsundzwanzig: 126,
    einhundertsechsundzwanzig: 126,
    hundertsiebenundzwanzig: 127,
    einhundertsiebenundzwanzig: 127,
    hundertachtundzwanzig: 128,
    einhundertachtundzwanzig: 128,
    hundertneunundzwanzig: 129,
    einhundertneunundzwanzig: 129,

    // 130-139
    hundertdreißig: 130,
    einhundertdreißig: 130,
    hunderteinunddreißig: 131,
    einhunderteinunddreißig: 131,
    hundertzweiunddreißig: 132,
    einhundertzweiunddreißig: 132,
    hundertdreiunddreißig: 133,
    einhundertdreiunddreißig: 133,
    hundertvierunddreißig: 134,
    einhundertvierunddreißig: 134,
    hundertfünfunddreißig: 135,
    einhundertfünfunddreißig: 135,
    hundertsechsunddreißig: 136,
    einhundertsechsunddreißig: 136,
    hundertsiebenunddreißig: 137,
    einhundertsiebenunddreißig: 137,
    hundertachtunddreißig: 138,
    einhundertachtunddreißig: 138,
    hundertneununddreißig: 139,
    einhundertneununddreißig: 139,

    // 140-149
    hundertvierzig: 140,
    einhundertvierzig: 140,
    hunderteinundvierzig: 141,
    einhunderteinundvierzig: 141,
    hundertzweiundvierzig: 142,
    einhundertzweiundvierzig: 142,
    hundertdreiundvierzig: 143,
    einhundertdreiundvierzig: 143,
    hundertvierundvierzig: 144,
    einhundertvierundvierzig: 144,
    hundertfünfundvierzig: 145,
    einhundertfünfundvierzig: 145,
    hundertsechsundvierzig: 146,
    einhundertsechsundvierzig: 146,
    hundertsiebenundvierzig: 147,
    einhundertsiebenundvierzig: 147,
    hundertachtundvierzig: 148,
    einhundertachtundvierzig: 148,
    hundertneunundvierzig: 149,
    einhundertneunundvierzig: 149,

    // 150-159
    hundertfünfzig: 150,
    einhundertfünfzig: 150,
    hunderteinundfünfzig: 151,
    einhunderteinundfünfzig: 151,
    hundertzweiundfünfzig: 152,
    einhundertzweiundfünfzig: 152,
    hundertdreiundfünfzig: 153,
    einhundertdreiundfünfzig: 153,
    hundertvierundfünfzig: 154,
    einhundertvierundfünfzig: 154,
    hundertfünfundfünfzig: 155,
    einhundertfünfundfünfzig: 155,
    hundertsechsundfünfzig: 156,
    einhundertsechsundfünfzig: 156,
    hundertsiebenundfünfzig: 157,
    einhundertsiebenundfünfzig: 157,
    hundertachtundfünfzig: 158,
    einhundertachtundfünfzig: 158,
    hundertneunundfünfzig: 159,
    einhundertneunundfünfzig: 159,

    // 160-169
    hundertsechzig: 160,
    einhundertsechzig: 160,
    hunderteinundsechzig: 161,
    einhunderteinundsechzig: 161,
    hundertzweiundsechzig: 162,
    einhundertzweiundsechzig: 162,
    hundertdreiundsechzig: 163,
    einhundertdreiundsechzig: 163,
    hundertvierundsechzig: 164,
    einhundertvierundsechzig: 164,
    hundertfünfundsechzig: 165,
    einhundertfünfundsechzig: 165,
    hundertsechsundsechzig: 166,
    einhundertsechsundsechzig: 166,
    hundertsiebenundsechzig: 167,
    einhundertsiebenundsechzig: 167,
    hundertachtundsechzig: 168,
    einhundertachtundsechzig: 168,
    hundertneunundsechzig: 169,
    einhundertneunundsechzig: 169,

    // 170-180
    hundertsiebzig: 170,
    einhundertsiebzig: 170,
    hunderteinundsiebzig: 171,
    einhunderteinundsiebzig: 171,
    hundertzweiundsiebzig: 172,
    einhundertzweiundsiebzig: 172,
    hundertdreiundsiebzig: 173,
    einhundertdreiundsiebzig: 173,
    hundertvierundsiebzig: 174,
    einhundertvierundsiebzig: 174,
    hundertfünfundsiebzig: 175,
    einhundertfünfundsiebzig: 175,
    hundertsechsundsiebzig: 176,
    einhundertsechsundsiebzig: 176,
    hundertsiebenundsiebzig: 177,
    einhundertsiebenundsiebzig: 177,
    hundertachtundsiebzig: 178,
    einhundertachtundsiebzig: 178,
    hundertneunundsiebzig: 179,
    einhundertneunundsiebzig: 179,
    hundertachtzig: 180,
    einhundertachtzig: 180,
  };

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "de-DE";
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript.toLowerCase().trim();

        let points = null;
        for (const [word, value] of Object.entries(numberWords)) {
          if (text.includes(word)) {
            points = value;
            break;
          }
        }

        if (points === null) {
          const numbers = text.match(/\d+/g);
          if (numbers) {
            points = parseInt(numbers[0]);
          }
        }

        if (points !== null && points >= 0 && points <= 180) {
          // WICHTIG: onScore direkt aufrufen, NICHT in setState
          const result = onScore(points);
          setMessage(`${points} ✓`);
        } else {
          setMessage("Nicht verstanden");
        }

        setTimeout(() => {
          setMessage("");
          setIsListening(false);
        }, 2000);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Error:", event.error);
        setMessage("Fehler");
        setIsListening(false);
        setTimeout(() => setMessage(""), 2000);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore
        }
      }
    };
  }, [onScore]); // WICHTIG: onScore als Dependency

  const handleClick = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setMessage("");
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Start error:", e);
        setMessage("Fehler beim Starten");
      }
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 mb-6 border border-slate-700">
      <h3 className="text-lg font-semibold mb-4 text-center text-white">
        Spracheingabe
      </h3>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleClick}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
            isListening
              ? "bg-red-500 hover:bg-red-600 animate-pulse"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          <Mic className="w-10 h-10" />
        </button>

        <p className="text-center">
          {isListening ? (
            <span className="text-green-400 font-semibold">
              🎤 Jetzt sprechen...
            </span>
          ) : (
            <span className="text-slate-400">Klicken & Zahl sagen</span>
          )}
        </p>

        {message && (
          <p
            className={`text-sm font-semibold ${
              message.includes("✓") ? "text-green-400 text-lg" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <div className="text-xs text-slate-500 text-center">
          <p>Sage eine Zahl zwischen 0 und 180</p>
        </div>
      </div>
    </div>
  );
}
