import { THEME } from '@workspace/ui/lib';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export type ThemeCode = 'dark' | 'light' | 'system';

export function useDarkMode() {
  const [theme, setLocalTheme] = useState<ThemeCode>('dark');

  useEffect(() => {
    let localTheme = getCookie(THEME) as ThemeCode;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    setLocalTheme(localTheme);
    if (localTheme === 'system') localTheme = systemTheme;

    document.documentElement.className = localTheme;
  }, [theme]);

  const setTheme = (newTheme: ThemeCode) => {
    setLocalTheme(newTheme);
    setCookie(THEME, newTheme);
  };

  return { theme, setTheme };
}
