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
        {/* Header - versteckt im Landscape auf kleinen Screens */}
        <div className="text-center mb-4 landscape:hidden">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Target className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold">Dart 501</h1>
          </div>
          <p className="text-slate-400 text-sm">2 Spieler</p>
        </div>

        {/* Landscape Mode: Optimiert für Smartphone Querformat */}
        <div className="landscape:min-h-screen landscape:flex landscape:flex-col landscape:justify-center">
          {/* Player Cards - Nebeneinander im Querformat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 landscape:grid-cols-2 landscape:gap-2 landscape:mb-3">
            <PlayerCard
              playerNumber={1}
              score={player1Score}
              throwCount={player1Throws.length}
              isActive={currentPlayer === 1 && !winner}
              isWinner={winner === 1}
              compact={true}
            />
            <PlayerCard
              playerNumber={2}
              score={player2Score}
              throwCount={player2Throws.length}
              isActive={currentPlayer === 2 && !winner}
              isWinner={winner === 2}
              compact={true}
            />
          </div>

          {/* Input Section - Kompakt im Querformat */}
          <div className="landscape:mb-2">
            <QuickScoreButtons
              onScore={subtractScore}
              disabled={winner !== null}
              compact={true}
            />
          </div>

          {/* Voice Control - Versteckt oder sehr kompakt im Querformat */}
          <div className="mb-4 landscape:hidden">
            <VoiceControl onScore={subtractScore} />
          </div>

          {/* History & Reset - Versteckt im Querformat oder in Tabs */}
          <div className="landscape:hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

          {/* Kompakter Reset Button im Querformat */}
          <div className="hidden landscape:block text-center mt-2">
            <button
              onClick={resetGame}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4 inline mr-1" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
