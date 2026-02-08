import React from 'react';

export function CalendarWidget() {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('zh-CN', { weekday: 'long' });
  const date = today.getDate();
  const month = today.toLocaleDateString('zh-CN', { month: 'long' });
  const year = today.getFullYear();

  return (
    <div className="w-full h-full bg-white rounded-3xl p-4 md:p-6 flex flex-col items-center justify-center shadow-xl border-2 border-gray-300">
      <div className="text-red-500 text-xs md:text-sm font-medium">{month}</div>
      <div className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 my-2">{date}</div>
      <div className="text-gray-600 text-xs md:text-sm">{year}</div>
      <div className="text-gray-500 text-xs mt-1 md:mt-2">{dayOfWeek}</div>
    </div>
  );
}