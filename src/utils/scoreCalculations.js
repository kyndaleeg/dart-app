// Durchschnittswurf berechnen
export function calculateAverage(throws) {
  if (throws.length === 0) return 0;
  const total = throws.reduce((sum, t) => sum + t.points, 0);
  return (total / throws.length).toFixed(2);
}

// 3-Dart-Durchschnitt berechnen
export function calculate3DartAverage(throws) {
  if (throws.length === 0) return 0;
  const total = throws.reduce((sum, t) => sum + t.points, 0);
  const rounds = Math.ceil(throws.length / 3);
  return (total / rounds).toFixed(2);
}

// Checkout-Prozentsatz berechnen
export function getCheckoutPercentage(throws, checkouts) {
  if (throws.length === 0) return 0;
  return ((checkouts / throws.length) * 100).toFixed(1);
}

// Überprüfen ob Score gültig ist
export function isValidDartScore(score) {
  if (score < 0 || score > 180) return false;
  
  // Unmögliche Scores im Dart
  const impossibleScores = [163, 166, 169, 172, 173, 175, 176, 178, 179];
  return !impossibleScores.includes(score);
}

// Höchsten Score in einer Serie finden
export function getHighestScore(throws) {
  if (throws.length === 0) return 0;
  return Math.max(...throws.map(t => t.points));
}

// Niedrigsten Score in einer Serie finden  
export function getLowestScore(throws) {
  if (throws.length === 0) return 0;
  return Math.min(...throws.map(t => t.points));
}

// Anzahl 180er berechnen
export function count180s(throws) {
  return throws.filter(t => t.points === 180).length;
}

// Anzahl 100+ Scores berechnen
export function count100Plus(throws) {
  return throws.filter(t => t.points >= 100).length;
}

// Berechne verbleibende Würfe bis zum Finish
export function calculateDartsToFinish(currentScore) {
  if (currentScore <= 170 && currentScore > 0) {
    // Vereinfachte Berechnung
    if (currentScore <= 40 && currentScore % 2 === 0) return 1;
    if (currentScore <= 100) return 2;
    return 3;
  }
  return null;
}