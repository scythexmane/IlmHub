// Ваш файл: ThemeProvider.js
import React, { createContext, useState, useEffect, useContext } from "react"; // Добавил useContext

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem("theme")) return localStorage.getItem("theme");
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme); // Этот класс применяется к <html>
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

// ДОБАВЛЯЕМ ЭКСПОРТ ХУКА useTheme
export const useTheme = () => { // <--- Вот этот блок добавлен
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};