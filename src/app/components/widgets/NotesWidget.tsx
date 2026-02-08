import React, { useState } from 'react';
import { StickyNote } from 'lucide-react';

export function NotesWidget() {
  const [note, setNote] = useState('点击编辑笔记...');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-3xl p-4 md:p-6 shadow-xl border-2 border-yellow-400">
      <div className="flex items-center gap-2 mb-3">
        <StickyNote className="w-4 h-4 md:w-5 md:h-5 text-yellow-700" />
        <span className="text-xs md:text-sm font-medium text-yellow-800">便签</span>
      </div>
      {isEditing ? (
        <textarea
          className="w-full h-[calc(100%-2.5rem)] bg-transparent text-yellow-900 text-xs md:text-sm resize-none outline-none placeholder-yellow-600"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <div
          className="w-full h-[calc(100%-2.5rem)] text-yellow-900 text-xs md:text-sm cursor-text overflow-auto"
          onClick={() => setIsEditing(true)}
        >
          {note}
        </div>
      )}
    </div>
  );
}