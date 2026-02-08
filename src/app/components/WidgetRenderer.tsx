import React from 'react';
import { WidgetItem } from '../types/desktop';
import { ClockWidget } from './widgets/ClockWidget';
import { WeatherWidget } from './widgets/WeatherWidget';
import { CalendarWidget } from './widgets/CalendarWidget';
import { NotesWidget } from './widgets/NotesWidget';
import { PhotoWidget } from './widgets/PhotoWidget';

interface WidgetRendererProps {
  item: WidgetItem;
  isDragging?: boolean;
}

export function WidgetRenderer({ item, isDragging }: WidgetRendererProps) {
  const renderWidget = () => {
    switch (item.widgetType) {
      case 'clock':
        return <ClockWidget />;
      case 'weather':
        return <WeatherWidget />;
      case 'calendar':
        return <CalendarWidget />;
      case 'notes':
        return <NotesWidget />;
      case 'photo':
        return <PhotoWidget imageUrl={item.data?.imageUrl} />;
      default:
        return <div className="w-full h-full bg-gray-200 rounded-3xl" />;
    }
  };

  return (
    <div
      className={`w-full h-full transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {renderWidget()}
    </div>
  );
}
