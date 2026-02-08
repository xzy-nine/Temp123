import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface PhotoWidgetProps {
  imageUrl?: string;
}

export function PhotoWidget({ imageUrl }: PhotoWidgetProps) {
  return (
    <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl border-2 border-gray-300">
      <ImageWithFallback
        src={imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'}
        alt="Photo"
        className="w-full h-full object-cover"
      />
    </div>
  );
}