import React, { useState } from "react";
import TabNavigation from "./components/Layout/TabNavigation";
import DartGame from "./components/Game/DartGame";
import DartFinishTrainer from "./components/Trainer/DartFinishTrainer";
import { GameProvider } from "./context/GameContext";
import { StatisticsProvider } from "./context/StatisticsContext";

function App() {
  const [activeTab, setActiveTab] = useState("game");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <GameProvider>
        <StatisticsProvider>
          {activeTab === "game" && <DartGame />}
          {activeTab === "trainer" && <DartFinishTrainer />}
        </StatisticsProvider>
      </GameProvider>
    </div>
  );
}

export default App;
