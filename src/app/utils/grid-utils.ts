import { DesktopItem, GridConfig } from '../types/desktop';

// 检查两个项目是否重叠
export function checkCollision(
  item1: { x: number; y: number; w: number; h: number },
  item2: { x: number; y: number; w: number; h: number }
): boolean {
  return !(
    item1.x + item1.w <= item2.x ||
    item1.x >= item2.x + item2.w ||
    item1.y + item1.h <= item2.y ||
    item1.y >= item2.y + item2.h
  );
}

// 查找可用的网格位置
export function findAvailablePosition(
  items: DesktopItem[],
  width: number,
  height: number,
  gridConfig: GridConfig
): { x: number; y: number } | null {
  for (let y = 0; y <= gridConfig.rows - height; y++) {
    for (let x = 0; x <= gridConfig.cols - width; x++) {
      const newItem = { x, y, w: width, h: height };
      const hasCollision = items.some(item => checkCollision(newItem, item));
      if (!hasCollision) {
        return { x, y };
      }
    }
  }
  return null;
}

// 检查项目是否在网格边界内
export function isWithinBounds(
  item: { x: number; y: number; w: number; h: number },
  gridConfig: GridConfig
): boolean {
  return (
    item.x >= 0 &&
    item.y >= 0 &&
    item.x + item.w <= gridConfig.cols &&
    item.y + item.h <= gridConfig.rows
  );
}

// 将像素坐标转换为网格坐标
export function pixelToGrid(
  pixels: number,
  cellSize: number,
  gap: number
): number {
  return Math.round(pixels / (cellSize + gap));
}

// 将网格坐标转换为像素坐标
export function gridToPixel(
  gridPos: number,
  cellSize: number,
  gap: number
): number {
  return gridPos * (cellSize + gap);
}
