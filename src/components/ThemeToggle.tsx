import SunIcon from "../assets/icons/sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
import { useTheme } from "../theme/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition"
      aria-label="Toggle theme"
    >
      <span className="w-10 h-5 flex items-center rounded-full bg-black/10 dark:bg-white/20 p-[2px]">
        <span
          className={`h-4 w-4 rounded-full bg-accent transition-transform ${
            isDark ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      {isDark ? (
        <MoonIcon className="w-5 h-5 text-slate-900 dark:text-white" />
      ) : (
        <SunIcon className="w-5 h-5 text-slate-900 dark:text-white" />
      )}
    </button>
  );
}
