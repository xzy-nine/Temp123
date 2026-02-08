// 桌面项目类型
export type ItemType = 'shortcut' | 'widget';

// 基础项目接口
export interface BaseItem {
  id: string;
  type: ItemType;
  x: number; // 网格列位置
  y: number; // 网格行位置
  w: number; // 宽度（占据的网格单元数）
  h: number; // 高度（占据的网格单元数）
}

// 快捷方式
export interface ShortcutItem extends BaseItem {
  type: 'shortcut';
  name: string;
  icon: string;
  color?: string;
  url?: string;
}

// 小部件
export interface WidgetItem extends BaseItem {
  type: 'widget';
  widgetType: 'clock' | 'weather' | 'calendar' | 'notes' | 'photo';
  title?: string;
  data?: any;
}

// 桌面项目联合类型
export type DesktopItem = ShortcutItem | WidgetItem;

// 网格配置
export interface GridConfig {
  cols: number; // 列数
  rows: number; // 行数
  gap: number; // 间距
  cellSize: number; // 单元格大小（像素）
}
