import React, { createContext, useContext, useState } from "react";

const StatisticsContext = createContext();

export function StatisticsProvider({ children }) {
  const [globalStats, setGlobalStats] = useState({
    gamesPlayed: 0,
    player1Wins: 0,
    player2Wins: 0,
  });

  const updateStats = (winner) => {
    setGlobalStats((prev) => ({
      gamesPlayed: prev.gamesPlayed + 1,
      player1Wins: prev.player1Wins + (winner === 1 ? 1 : 0),
      player2Wins: prev.player2Wins + (winner === 2 ? 1 : 0),
    }));
  };

  return (
    <StatisticsContext.Provider value={{ globalStats, updateStats }}>
      {children}
    </StatisticsContext.Provider>
  );
}

export function useStatistics() {
  return useContext(StatisticsContext);
}
