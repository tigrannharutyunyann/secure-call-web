import AppRouter from "./router/AppRouter";
import { useTheme } from "./theme/ThemeContext";

export default function App() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 text-slate-900 dark:bg-[#0D0D0D] dark:text-white transition-colors">
        <AppRouter />
      </div>
    </div>
  );
}
