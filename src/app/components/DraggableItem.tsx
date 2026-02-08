import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Resizable } from 're-resizable';
import { DesktopItem, GridConfig } from '../types/desktop';
import { ShortcutButton } from './ShortcutButton';
import { WidgetRenderer } from './WidgetRenderer';
import { GripVertical, Move } from 'lucide-react';

interface DraggableItemProps {
  item: DesktopItem;
  gridConfig: GridConfig;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
}

export function DraggableItem({
  item,
  gridConfig,
  onMove,
  onResize,
}: DraggableItemProps) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'DESKTOP_ITEM',
    item: () => ({
      id: item.id,
      type: item.type,
      currentX: item.x,
      currentY: item.y,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const { cellSize, gap } = gridConfig;
  const width = item.w * cellSize + (item.w - 1) * gap;
  const height = item.h * cellSize + (item.h - 1) * gap;

  // 计算位置
  const left = item.x * (cellSize + gap);
  const top = item.y * (cellSize + gap);

  const handleResizeStop = (
    e: any,
    direction: any,
    ref: HTMLElement,
    delta: any
  ) => {
    const newWidth = Math.max(1, Math.round(ref.offsetWidth / (cellSize + gap)));
    const newHeight = Math.max(1, Math.round(ref.offsetHeight / (cellSize + gap)));
    
    // 确保调整后不超过网格边界
    const maxW = gridConfig.cols - item.x;
    const maxH = gridConfig.rows - item.y;
    
    onResize(
      item.id,
      Math.min(newWidth, maxW),
      Math.min(newHeight, maxH)
    );
  };

  return (
    <div
      ref={preview}
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        opacity: isDragging ? 0.5 : 1,
        transition: isDragging ? 'none' : 'all 0.2s ease',
        zIndex: isDragging ? 50 : 1,
      }}
      className={isDragging ? 'ring-2 ring-blue-400 rounded-xl' : ''}
    >
      <Resizable
        size={{ width: '100%', height: '100%' }}
        onResizeStop={handleResizeStop}
        grid={[cellSize + gap, cellSize + gap]}
        enable={{
          top: false,
          right: item.type === 'widget',
          bottom: item.type === 'widget',
          left: false,
          topRight: false,
          bottomRight: item.type === 'widget',
          bottomLeft: false,
          topLeft: false,
        }}
        minWidth={cellSize}
        minHeight={cellSize}
        handleComponent={{
          bottomRight: (
            <div className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-center justify-center">
              <GripVertical className="w-4 h-4 text-gray-400" />
            </div>
          ),
        }}
      >
        <div className="w-full h-full relative group">
          {/* 拖拽手柄 */}
          <div
            ref={drag}
            className="absolute top-0 left-0 right-0 h-8 cursor-move z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            style={{ touchAction: 'none' }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-full px-3 py-1">
              <Move className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* 渲染内容 */}
          <div className="w-full h-full pointer-events-auto">
            {item.type === 'shortcut' ? (
              <ShortcutButton item={item} isDragging={isDragging} />
            ) : (
              <WidgetRenderer item={item} isDragging={isDragging} />
            )}
          </div>
        </div>
      </Resizable>
    </div>
  );
}