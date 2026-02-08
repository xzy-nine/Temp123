import React, { useState, useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { DesktopItem, GridConfig } from '../types/desktop';
import { DraggableItem } from './DraggableItem';
import { checkCollision, isWithinBounds } from '../utils/grid-utils';

interface DesktopGridProps {
  items: DesktopItem[];
  gridConfig: GridConfig;
  onItemsChange: (items: DesktopItem[]) => void;
}

export function DesktopGrid({
  items,
  gridConfig,
  onItemsChange,
}: DesktopGridProps) {
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);
  const [draggedItemSize, setDraggedItemSize] = useState<{ w: number; h: number } | null>(null);
  const [isDraggingAny, setIsDraggingAny] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: 'DESKTOP_ITEM',
    drop: (draggedItem: any, monitor) => {
      const offset = monitor.getClientOffset();
      if (!offset) return;

      const gridElement = document.getElementById('desktop-grid');
      if (!gridElement) return;

      const rect = gridElement.getBoundingClientRect();
      const x = Math.floor((offset.x - rect.left) / (gridConfig.cellSize + gridConfig.gap));
      const y = Math.floor((offset.y - rect.top) / (gridConfig.cellSize + gridConfig.gap));

      handleMove(draggedItem.id, x, y);
      setDraggedItemSize(null);
      setIsDraggingAny(false);
    },
    hover: (draggedItem: any, monitor) => {
      const offset = monitor.getClientOffset();
      if (!offset) return;

      const gridElement = document.getElementById('desktop-grid');
      if (!gridElement) return;

      const rect = gridElement.getBoundingClientRect();
      const x = Math.floor((offset.x - rect.left) / (gridConfig.cellSize + gridConfig.gap));
      const y = Math.floor((offset.y - rect.top) / (gridConfig.cellSize + gridConfig.gap));

      setHoveredCell({ x, y });
      setIsDraggingAny(true);
      
      // 获取拖拽项目的尺寸用于预览
      const item = items.find(i => i.id === draggedItem.id);
      if (item) {
        setDraggedItemSize({ w: item.w, h: item.h });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleMove = useCallback(
    (id: string, newX: number, newY: number) => {
      const itemIndex = items.findIndex((item) => item.id === id);
      if (itemIndex === -1) return;

      const item = items[itemIndex];
      const newItem = { ...item, x: newX, y: newY };

      // 检查是否在边界内
      if (!isWithinBounds(newItem, gridConfig)) {
        return;
      }

      // 检查是否与其他项目冲突
      const otherItems = items.filter((_, index) => index !== itemIndex);
      const hasCollision = otherItems.some((otherItem) =>
        checkCollision(newItem, otherItem)
      );

      if (!hasCollision) {
        const newItems = [...items];
        newItems[itemIndex] = newItem;
        onItemsChange(newItems);
      }
    },
    [items, gridConfig, onItemsChange]
  );

  const handleResize = useCallback(
    (id: string, newWidth: number, newHeight: number) => {
      const itemIndex = items.findIndex((item) => item.id === id);
      if (itemIndex === -1) return;

      const item = items[itemIndex];
      const newItem = { ...item, w: newWidth, h: newHeight };

      // 检查是否在边界内
      if (!isWithinBounds(newItem, gridConfig)) {
        return;
      }

      // 检查是否与其他项目冲突
      const otherItems = items.filter((_, index) => index !== itemIndex);
      const hasCollision = otherItems.some((otherItem) =>
        checkCollision(newItem, otherItem)
      );

      if (!hasCollision) {
        const newItems = [...items];
        newItems[itemIndex] = newItem;
        onItemsChange(newItems);
      }
    },
    [items, gridConfig, onItemsChange]
  );

  const containerWidth = gridConfig.cols * gridConfig.cellSize + (gridConfig.cols - 1) * gridConfig.gap;
  const containerHeight = gridConfig.rows * gridConfig.cellSize + (gridConfig.rows - 1) * gridConfig.gap;

  return (
    <div
      id="desktop-grid"
      ref={drop}
      className="relative mx-auto"
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
      }}
    >
      {/* 网格背景 - 仅在拖动时显示 */}
      {isDraggingAny && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: gridConfig.rows }).map((_, row) =>
            Array.from({ length: gridConfig.cols }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                className="absolute border-2 border-blue-300/50 rounded-lg bg-blue-50/20"
                style={{
                  left: `${col * (gridConfig.cellSize + gridConfig.gap)}px`,
                  top: `${row * (gridConfig.cellSize + gridConfig.gap)}px`,
                  width: `${gridConfig.cellSize}px`,
                  height: `${gridConfig.cellSize}px`,
                }}
              />
            ))
          )}
        </div>
      )}

      {/* 渲染所有桌面项目 */}
      {items.map((item) => (
        <DraggableItem
          key={item.id}
          item={item}
          gridConfig={gridConfig}
          onMove={handleMove}
          onResize={handleResize}
        />
      ))}
    </div>
  );
}