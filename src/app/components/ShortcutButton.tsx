import React from 'react';
import { ShortcutItem } from '../types/desktop';
import * as LucideIcons from 'lucide-react';

interface ShortcutButtonProps {
  item: ShortcutItem;
  onClick?: () => void;
  isDragging?: boolean;
}

export function ShortcutButton({ item, onClick, isDragging }: ShortcutButtonProps) {
  // 动态获取图标组件
  const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.AppWindow;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 cursor-pointer transition-all h-full ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 hover:scale-105'
      }`}
      onClick={onClick}
    >
      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
        style={{
          backgroundColor: item.color || '#3b82f6',
        }}
      >
        <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" />
      </div>
      <span className="text-xs md:text-sm text-center text-gray-800 max-w-[80px] truncate px-1 leading-tight">
        {item.name}
      </span>
    </div>
  );
}