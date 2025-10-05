import { useState, useEffect, useRef } from "react";

export function useSpeechRecognition(onResult) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "de-DE";
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript.toLowerCase().trim();
        setTranscript(text);
        if (onResult) onResult(text);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setError("Fehler bei der Spracherkennung");
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };
    } else {
      setError("Spracherkennung wird von diesem Browser nicht unterstützt");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening, onResult]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setError("Spracherkennung nicht verfügbar");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setError("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return {
    isListening,
    transcript,
    error,
    toggleListening,
    setError,
  };
}
