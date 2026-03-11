import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Expose a unified `changeTheme` function — fixes the easter egg bug
  const changeTheme = useCallback((newTheme) => {
    setTheme(newTheme);
  }, []);

  // Keep `toggleTheme` as an alias so existing code doesn't break
  const toggleTheme = changeTheme;

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
