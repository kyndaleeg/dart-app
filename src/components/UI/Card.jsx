import React from 'react';

export default function Card({ 
  children, 
  className = '',
  variant = 'default',
  padding = 'md'
}) {
  const variants = {
    default: 'bg-slate-800 border-slate-700',
    highlighted: 'bg-slate-800 border-green-500',
    winner: 'bg-slate-800 border-yellow-500'
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`rounded-2xl shadow-2xl border ${variants[variant]} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
}