// Dart-Notation validieren (T20, D16, S5, Bull)
export function validateDartNotation(notation) {
  if (!notation) return false;
  
  const pattern = /^(T|D|S)\d{1,2}$|^Bull$/i;
  return pattern.test(notation.trim());
}

// Dart-Notation parsen und Wert berechnen
export function parseDartNotation(notation) {
  if (!notation) return null;
  
  notation = notation.toUpperCase().trim();
  
  // Bullseye behandeln
  if (notation === 'BULL' || notation === 'BULLSEYE') {
    return { 
      type: 'Bull', 
      value: 50, 
      display: 'Bull',
      number: 25
    };
  }
  
  // Reguläre Dart-Notation parsen
  const match = notation.match(/^([TDS])(\d{1,2})$/);
  if (!match) return null;
  
  const type = match[1];
  const number = parseInt(match[2]);
  
  // Nur Zahlen 1-20 sind gültig
  if (number < 1 || number > 20) return null;
  
  const typeMap = {
    'T': 'Triple',
    'D': 'Double',
    'S': 'Single'
  };
  
  const multiplier = type === 'T' ? 3 : type === 'D' ? 2 : 1;
  const value = number * multiplier;
  
  return {
    type: typeMap[type],
    number,
    value,
    display: `${type}${number}`,
    multiplier
  };
}

// Dart-Wert berechnen
export function calculateDartValue(notation) {
  const dart = parseDartNotation(notation);
  return dart ? dart.value : 0;
}

// Mehrere Darts berechnen
export function calculateMultipleDarts(notations) {
  if (!Array.isArray(notations)) return 0;
  
  return notations.reduce((sum, notation) => {
    return sum + calculateDartValue(notation);
  }, 0);
}

// Überprüfen ob Finish möglich ist
export function isFinishPossible(score) {
  if (score < 2 || score > 170) return false;
  
  // Unmögliche Finishes
  const impossibleFinishes = [163, 166, 169];
  return !impossibleFinishes.includes(score);
}

// Überprüfen ob Score ein gültiges Double ist
export function isValidDouble(score) {
  return score >= 2 && score <= 40 && score % 2 === 0;
}

// Alle möglichen Doubles zurückgeben
export function getAllDoubles() {
  const doubles = [];
  for (let i = 1; i <= 20; i++) {
    doubles.push({ notation: `D${i}`, value: i * 2 });
  }
  doubles.push({ notation: 'Bull', value: 50 }); // Bull als Double
  return doubles;
}

// Validiere Spieler-Score
export function validatePlayerScore(score) {
  return Number.isInteger(score) && score >= 0 && score <= 501;
}

// Validiere Wurf-Score
export function validateThrowScore(score) {
  return Number.isInteger(score) && score >= 0 && score <= 180;
}