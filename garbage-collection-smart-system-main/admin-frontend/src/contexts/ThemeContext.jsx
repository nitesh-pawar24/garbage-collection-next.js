'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('adminTheme');
      return saved ? saved === 'dark' : false;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminTheme', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Component to apply the 'dark' class to the root element based on theme state and current route.
 */
export function ThemeWatcher() {
  const { isDark } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const isLoginPage = pathname === '/' || pathname === '/login';

      if (isDark && !isLoginPage) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [isDark, pathname]);

  return null;
}

export const useTheme = () => useContext(ThemeContext);
