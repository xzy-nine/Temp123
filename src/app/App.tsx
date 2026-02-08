import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DesktopGrid } from './components/DesktopGrid';
import { DesktopItem, GridConfig } from './types/desktop';
import { findAvailablePosition } from './utils/grid-utils';
import { Plus } from 'lucide-react';

export default function App() {
  const [items, setItems] = useState<DesktopItem[]>([]);
  const [gridConfig, setGridConfig] = useState<GridConfig>({
    cols: 8,
    rows: 6,
    gap: 16,
    cellSize: 100,
  });

  // 初始化示例数据
  useEffect(() => {
    const initialItems: DesktopItem[] = [
      // 快捷方式
      {
        id: 'shortcut-1',
        type: 'shortcut',
        name: '浏览器',
        icon: 'Globe',
        color: '#3b82f6',
        x: 0,
        y: 0,
        w: 1,
        h: 1,
      },
      {
        id: 'shortcut-2',
        type: 'shortcut',
        name: '相机',
        icon: 'Camera',
        color: '#8b5cf6',
        x: 1,
        y: 0,
        w: 1,
        h: 1,
      },
      {
        id: 'shortcut-3',
        type: 'shortcut',
        name: '音乐',
        icon: 'Music',
        color: '#ec4899',
        x: 2,
        y: 0,
        w: 1,
        h: 1,
      },
      {
        id: 'shortcut-4',
        type: 'shortcut',
        name: '设置',
        icon: 'Settings',
        color: '#6b7280',
        x: 3,
        y: 0,
        w: 1,
        h: 1,
      },
      {
        id: 'shortcut-5',
        type: 'shortcut',
        name: '邮件',
        icon: 'Mail',
        color: '#10b981',
        x: 0,
        y: 1,
        w: 1,
        h: 1,
      },
      {
        id: 'shortcut-6',
        type: 'shortcut',
        name: '地图',
        icon: 'Map',
        color: '#f59e0b',
        x: 1,
        y: 1,
        w: 1,
        h: 1,
      },
      {
        id: 'shortcut-7',
        type: 'shortcut',
        name: '相册',
        icon: 'Image',
        color: '#06b6d4',
        x: 2,
        y: 1,
        w: 1,
        h: 1,
      },
      {
        id: 'shortcut-8',
        type: 'shortcut',
        name: '视频',
        icon: 'Video',
        color: '#ef4444',
        x: 3,
        y: 1,
        w: 1,
        h: 1,
      },
      // 小部件
      {
        id: 'widget-1',
        type: 'widget',
        widgetType: 'clock',
        x: 5,
        y: 0,
        w: 3,
        h: 2,
      },
      {
        id: 'widget-2',
        type: 'widget',
        widgetType: 'weather',
        x: 0,
        y: 2,
        w: 2,
        h: 2,
      },
      {
        id: 'widget-3',
        type: 'widget',
        widgetType: 'calendar',
        x: 2,
        y: 2,
        w: 2,
        h: 2,
      },
      {
        id: 'widget-4',
        type: 'widget',
        widgetType: 'notes',
        x: 4,
        y: 2,
        w: 2,
        h: 2,
      },
      {
        id: 'widget-5',
        type: 'widget',
        widgetType: 'photo',
        x: 6,
        y: 2,
        w: 2,
        h: 2,
      },
    ];
    setItems(initialItems);
  }, []);

  // 响应式网格配置
  useEffect(() => {
    const updateGridConfig = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width < 768) {
        // 移动设备 - 调整网格和项目布局
        const newConfig: GridConfig = {
          cols: 4,
          rows: 10,
          gap: 12,
          cellSize: Math.min(80, (width - 64) / 4 - 12),
        };
        setGridConfig(newConfig);
        
        // 调整项目以适应移动布局，避免重叠
        setItems(prevItems => {
          const adjustedItems: DesktopItem[] = [];
          
          prevItems.forEach(item => {
            const newItem = { ...item };
            
            // 限制尺寸
            if (newItem.w > 2) newItem.w = 2;
            if (newItem.type === 'widget' && newItem.h > 2) newItem.h = 2;
            
            // 如果当前位置超出边界或有冲突，寻找新位置
            if (newItem.x + newItem.w > newConfig.cols || newItem.y + newItem.h > newConfig.rows) {
              const newPos = findAvailablePosition(adjustedItems, newItem.w, newItem.h, newConfig);
              if (newPos) {
                newItem.x = newPos.x;
                newItem.y = newPos.y;
              }
            } else {
              // 检查是否与已添加的项目冲突
              const hasConflict = adjustedItems.some(existingItem => {
                return !(
                  newItem.x + newItem.w <= existingItem.x ||
                  newItem.x >= existingItem.x + existingItem.w ||
                  newItem.y + newItem.h <= existingItem.y ||
                  newItem.y >= existingItem.y + existingItem.h
                );
              });
              
              if (hasConflict) {
                const newPos = findAvailablePosition(adjustedItems, newItem.w, newItem.h, newConfig);
                if (newPos) {
                  newItem.x = newPos.x;
                  newItem.y = newPos.y;
                }
              }
            }
            
            adjustedItems.push(newItem);
          });
          
          return adjustedItems;
        });
      } else if (width < 1024) {
        // 平板
        setGridConfig({
          cols: 6,
          rows: 8,
          gap: 14,
          cellSize: 90,
        });
      } else {
        // 桌面
        setGridConfig({
          cols: 8,
          rows: 6,
          gap: 16,
          cellSize: 100,
        });
      }
    };

    updateGridConfig();
    window.addEventListener('resize', updateGridConfig);
    return () => window.removeEventListener('resize', updateGridConfig);
  }, []);

  const handleItemsChange = (newItems: DesktopItem[]) => {
    setItems(newItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-light text-gray-800">我的桌面</h1>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                拖拽移动项目 • 调整小部件大小
              </p>
            </div>
            <div className="text-xs md:text-sm text-gray-500 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              网格: {gridConfig.cols} × {gridConfig.rows}
            </div>
          </div>

          <DesktopGrid
            items={items}
            gridConfig={gridConfig}
            onItemsChange={handleItemsChange}
          />

          <div className="mt-6 md:mt-8 text-center text-xs md:text-sm text-gray-500 space-y-1">
            <p>💡 提示: 悬停在项目上查看拖拽手柄</p>
            <p className="hidden md:block">小部件右下角可调整大小</p>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}