import React from 'react';
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';

export function WeatherWidget() {
  // 模拟天气数据
  const weather = {
    temp: 22,
    condition: 'sunny',
    location: '北京',
    high: 25,
    low: 18,
  };

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="w-12 h-12" />;
      case 'cloudy':
        return <Cloud className="w-12 h-12" />;
      case 'rainy':
        return <CloudRain className="w-12 h-12" />;
      default:
        return <Sun className="w-12 h-12" />;
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-4 md:p-6 flex flex-col justify-between text-white shadow-xl border-2 border-blue-500">
      <div>
        <div className="text-sm md:text-lg opacity-90">{weather.location}</div>
        <div className="text-4xl md:text-5xl font-light mt-2">{weather.temp}°</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            {getWeatherIcon()}
          </div>
          <div className="text-xs md:text-sm">
            <div>最高 {weather.high}°</div>
            <div>最低 {weather.low}°</div>
          </div>
        </div>
      </div>
    </div>
  );
}