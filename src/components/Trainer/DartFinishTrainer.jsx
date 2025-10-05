import React, { useState, useEffect } from "react";
import { Target } from "lucide-react";
import DifficultySelector from "./DifficultySelector";
import FinishQuestion from "./FinishQuestion";
import Statistics from "./Statistics";
import { useTrainerLogic } from "../../hooks/useTrainerLogic";

export default function DartFinishTrainer() {
  const {
    currentScore,
    difficulty,
    setDifficulty,
    detailedStats,
    checkAnswer,
    nextQuestion,
    getTotalStats,
  } = useTrainerLogic();

  const [showStats, setShowStats] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Target className="w-10 h-10 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">
              Dart Finish Trainer
            </h1>
          </div>
          <p className="text-green-200">Lerne die optimalen Finish-Wege</p>
        </div>

        <DifficultySelector
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />

        <Statistics
          stats={getTotalStats()}
          detailedStats={detailedStats}
          showStats={showStats}
          setShowStats={setShowStats}
        />

        <FinishQuestion
          currentScore={currentScore}
          onCheck={checkAnswer}
          onNext={nextQuestion}
        />

        <div className="text-center mt-6 text-green-200 text-sm">
          <p>
            Legende: T = Triple, D = Double, S = Single, Bull = Bullseye (50)
          </p>
        </div>
      </div>
    </div>
  );
}
