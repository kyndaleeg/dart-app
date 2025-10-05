# Dart Finish Trainer 🎯

Eine interaktive Web-Anwendung zum Lernen von Dart-Finish-Wegen mit verschiedenen Schwierigkeitsgraden und detaillierten Statistiken.

## Features

- ✅ Über 100 Dart-Finishes (2-170)
- 🎮 Drei Schwierigkeitsgrade: Alle, Zwei-Dart, Drei-Dart
- 📊 Detaillierte Statistiken nach Score-Bereich und Dart-Anzahl
- 💡 Sofortiges Feedback mit Erklärungen
- 📱 Responsive Design für Mobile und Desktop
- 🎨 Modernes UI mit Tailwind CSS

## Installation

### Voraussetzungen

- Node.js (Version 14 oder höher)
- npm oder yarn

### Schritt-für-Schritt Anleitung

1. **Projekt-Ordner erstellen:**
```bash
mkdir dart-finish-trainer
cd dart-finish-trainer
```

2. **Dateien erstellen:**

Erstelle folgende Ordnerstruktur:
```
dart-finish-trainer/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

3. **Dependencies installieren:**
```bash
npm install
```

4. **App starten:**
```bash
npm start
```

Die App öffnet sich automatisch unter `http://localhost:3000`

## Deployment

### Option 1: Netlify (Empfohlen)

1. Erstelle ein GitHub-Repository und pushe den Code
2. Gehe zu [netlify.com](https://netlify.com)
3. Klicke auf "Add new site" → "Import from Git"
4. Verbinde dein GitHub-Repository
5. Build-Settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Klicke auf "Deploy site"

Deine App ist nun unter `https://deinname.netlify.app` erreichbar!

### Option 2: Vercel

1. Erstelle ein GitHub-Repository und pushe den Code
2. Gehe zu [vercel.com](https://vercel.com)
3. Klicke auf "New Project"
4. Importiere dein GitHub-Repository
5. Vercel erkennt automatisch die React-App
6. Klicke auf "Deploy"

### Option 3: GitHub Pages

1. Installiere gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Füge in `package.json` hinzu:
```json
"homepage": "https://deinusername.github.io/dart-finish-trainer",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```bash
npm run deploy
```

## Production Build

Für manuelles Deployment:
```bash
npm run build
```

Das erstellt einen `build/` Ordner mit optimierten Dateien, die du auf jedem Webserver hosten kannst.

## Verwendung

1. **Schwierigkeitsgrad wählen:** Wähle zwischen allen Finishes, Zwei-Dart oder Drei-Dart
2. **Finish eingeben:** Gib deine Lösung ein (z.B. `T20, T20, D20`)
3. **Prüfen:** Klicke auf "Prüfen" oder drücke Enter
4. **Feedback erhalten:** Sieh sofort ob richtig/falsch mit Erklärung
5. **Statistiken ansehen:** Klicke auf "Statistiken" für detaillierte Auswertung

### Eingabeformat

- **T** = Triple (z.B. T20)
- **D** = Double (z.B. D20)
- **S** = Single (z.B. S20)
- **Bull** = Bullseye (50 Punkte)

Beispiele:
- `T20, D20` (für 100)
- `T20, T20, D20` (für 160)
- `D16` (für 32)

## Technologie-Stack

- **React 18** - UI Framework
- **Tailwind CSS** - Styling (via CDN)
- **Lucide React** - Icons
- **React Scripts** - Build-Tools

## Browser-Support

- Chrome (neueste Version)
- Firefox (neueste Version)
- Safari (neueste Version)
- Edge (neueste Version)
- Mobile Browser (iOS Safari, Chrome Android)

## Lizenz

MIT License - Frei verwendbar für private und kommerzielle Zwecke

## Support

Bei Fragen oder Problemen erstelle ein Issue im Repository.

---

Viel Erfolg beim Dart-Training! 🎯🎉