'use client';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggle}
      className="rounded-md p-2 hover:bg-surface transition-colors duration-[var(--transition)]"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
