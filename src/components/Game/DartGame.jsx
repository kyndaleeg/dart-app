import React from "react";
import { Target, RotateCcw } from "lucide-react";
import { useGame } from "../../context/GameContext";
import PlayerCard from "./PlayerCard";
import VoiceControl from "./VoiceControl";
import QuickScoreButtons from "./QuickScoreButtons";
import ThrowHistory from "./ThrowHistory";

export default function DartGame() {
  const {
    player1Score,
    player2Score,
    player1Throws,
    player2Throws,
    currentPlayer,
    winner,
    subtractScore,
    resetGame,
  } = useGame();

  return (
    <div className="text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Target className="w-10 h-10 text-red-500" />
            <h1 className="text-4xl font-bold">Dart 501 - 2 Spieler</h1>
          </div>
          <p className="text-slate-400">
            Sage deinen Score an oder nutze die Buttons
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <PlayerCard
            playerNumber={1}
            score={player1Score}
            throwCount={player1Throws.length}
            isActive={currentPlayer === 1 && !winner}
            isWinner={winner === 1}
          />
          <PlayerCard
            playerNumber={2}
            score={player2Score}
            throwCount={player2Throws.length}
            isActive={currentPlayer === 2 && !winner}
            isWinner={winner === 2}
          />
        </div>

        <VoiceControl onScore={subtractScore} />

        <QuickScoreButtons onScore={subtractScore} disabled={winner !== null} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ThrowHistory playerNumber={1} throws={player1Throws} />
          <ThrowHistory playerNumber={2} throws={player2Throws} />
        </div>

        <div className="text-center">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg transition-colors mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Neues Spiel starten
          </button>
        </div>
      </div>
    </div>
  );
}
