import React from "react";
import { Gamepad2, GraduationCap } from "lucide-react";

export default function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-6xl mx-auto flex gap-2 p-4">
        <button
          onClick={() => setActiveTab("game")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === "game"
              ? "bg-green-600 text-white shadow-lg"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          <Gamepad2 className="w-5 h-5" />
          501 Spiel
        </button>
        <button
          onClick={() => setActiveTab("trainer")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === "trainer"
              ? "bg-green-600 text-white shadow-lg"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          Finish Trainer
        </button>
      </div>
    </div>
  );
}
