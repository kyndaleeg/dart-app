import { useState, useEffect } from 'react';
import { finishWays, getScoreRange, getDartCountLabel } from '../utils/finishWays';

export function useTrainerLogic() {
  const [currentScore, setCurrentScore] = useState(null);
  const [difficulty, setDifficulty] = useState('all');
  const [detailedStats, setDetailedStats] = useState({
    byRange: {
      '161-170': { correct: 0, total: 0 },
      '141-160': { correct: 0, total: 0 },
      '121-140': { correct: 0, total: 0 },
      '101-120': { correct: 0, total: 0 },
      '81-100': { correct: 0, total: 0 },
      '61-80': { correct: 0, total: 0 },
      '41-60': { correct: 0, total: 0 },
      '21-40': { correct: 0, total: 0 },
      '2-20': { correct: 0, total: 0 },
    },
    byDartCount: {
      'one': { correct: 0, total: 0 },
      'two': { correct: 0, total: 0 },
      'three': { correct: 0, total: 0 },
    }
  });

  const getFilteredScores = () => {
    const scores = Object.keys(finishWays).map(Number);
    if (difficulty === 'two-dart') {
      return scores.filter(score => finishWays[score].dartCount === 2);
    }
    if (difficulty === 'three-dart') {
      return scores.filter(score => finishWays[score].dartCount === 3);
    }
    return scores;
  };

  const getRandomFinish = () => {
    const scores = getFilteredScores();
    return scores[Math.floor(Math.random() * scores.length)];
  };

  const nextQuestion = () => {
    setCurrentScore(getRandomFinish());
  };

  useEffect(() => {
    nextQuestion();
  }, [difficulty]);

  const checkAnswer = (userDarts, isCorrect) => {
    const dartCount = finishWays[currentScore].dartCount;
    const range = getScoreRange(currentScore);
    const dartLabel = getDartCountLabel(dartCount);
    
    setDetailedStats(prev => ({
      byRange: {
        ...prev.byRange,
        [range]: {
          correct: prev.byRange[range].correct + (isCorrect ? 1 : 0),
          total: prev.byRange[range].total + 1
        }
      },
      byDartCount: {
        ...prev.byDartCount,
        [dartLabel]: {
          correct: prev.byDartCount[dartLabel].correct + (isCorrect ? 1 : 0),
          total: prev.byDartCount[dartLabel].total + 1
        }
      }
    }));
  };

  const getTotalStats = () => {
    let correct = 0;
    let total = 0;
    Object.values(detailedStats.byRange).forEach(stat => {
      correct += stat.correct;
      total += stat.total;
    });
    return { correct, total };
  };

  return {
    currentScore,
    difficulty,
    setDifficulty,
    detailedStats,
    checkAnswer,
    nextQuestion,
    getTotalStats
  };
}