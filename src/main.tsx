
  import App from "./app/App.tsx";
import "./styles/index.css";

// 导出 App 组件
 export { App };

// 导出其他组件
 export * from "./app/components/DesktopGrid";
 export * from "./app/components/DraggableItem";
 export * from "./app/components/ShortcutButton";
 export * from "./app/components/WidgetRenderer";

// 开发模式下渲染到 DOM
if (import.meta.env.DEV) {
  import("react-dom/client").then(({ createRoot }) => {
    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
  });
}
  