import React, { useState, useEffect } from 'react';

export function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const date = time.toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-4 md:p-6 flex flex-col justify-between text-white shadow-xl border-2 border-purple-600">
      <div className="text-xs md:text-sm opacity-90">{date}</div>
      <div className="flex flex-col items-center">
        <div className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider">
          {hours}:{minutes}
        </div>
        <div className="text-lg md:text-xl lg:text-2xl opacity-75 mt-1">{seconds}</div>
      </div>
    </div>
  );
}