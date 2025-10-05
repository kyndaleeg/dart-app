import React from 'react';

export default function ProgressBar({ 
  value, 
  max = 100, 
  color = 'green', 
  label = '',
  showPercentage = true,
  height = 'md'
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const colors = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500'
  };

  const heights = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-700">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${heights[height]} overflow-hidden`}>
        <div
          className={`h-full ${colors[color] || colors.green} transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}