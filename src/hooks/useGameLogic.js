import { useState } from "react";

export function useGameLogic() {
  const [player1Score, setPlayer1Score] = useState(501);
  const [player2Score, setPlayer2Score] = useState(501);
  const [player1Throws, setPlayer1Throws] = useState([]);
  const [player2Throws, setPlayer2Throws] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);

  const subtractScore = (points) => {
    if (winner) return { success: false, message: "Spiel ist beendet" };

    const currentScore = currentPlayer === 1 ? player1Score : player2Score;
    const newScore = currentScore - points;

    if (newScore < 0) {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      return {
        success: false,
        message: `Überwurf! Spieler ${currentPlayer} bleibt bei ${currentScore}.`,
      };
    }

    if (newScore === 0) {
      setWinner(currentPlayer);
      return {
        success: true,
        message: `🎉 Spieler ${currentPlayer} hat gewonnen!`,
      };
    }

    if (currentPlayer === 1) {
      setPlayer1Score(newScore);
      setPlayer1Throws([
        { points, remaining: newScore, timestamp: new Date() },
        ...player1Throws,
      ]);
    } else {
      setPlayer2Score(newScore);
      setPlayer2Throws([
        { points, remaining: newScore, timestamp: new Date() },
        ...player2Throws,
      ]);
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    return { success: true, message: null };
  };

  const resetGame = () => {
    setPlayer1Score(501);
    setPlayer2Score(501);
    setPlayer1Throws([]);
    setPlayer2Throws([]);
    setCurrentPlayer(1);
    setWinner(null);
  };

  return {
    player1Score,
    player2Score,
    player1Throws,
    player2Throws,
    currentPlayer,
    winner,
    subtractScore,
    resetGame,
  };
}
