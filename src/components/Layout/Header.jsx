import React from 'react';
import { Target } from 'lucide-react';

export default function Header({ title, subtitle }) {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Target className="w-10 h-10 text-red-500" />
        <h1 className="text-4xl font-bold text-white">{title}</h1>
      </div>
      {subtitle && <p className="text-slate-400">{subtitle}</p>}
    </div>
  );
}