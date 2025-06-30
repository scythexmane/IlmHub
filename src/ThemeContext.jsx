// src/contexts/ThemeContext.jsx (или ThemeProvider.js, как вам удобнее)
import React, { createContext, useState, useEffect, useContext } from 'react';

// Создаем контекст для темы
export const ThemeContext = createContext();

// Компонент провайдера темы
export const ThemeProvider = ({ children }) => {
  // Изначальное состояние темы:
  // 1. Попытка загрузить из localStorage
  // 2. Если нет в localStorage, определить по системным настройкам (предпочтительная цветовая схема)
  // 3. По умолчанию 'dark'
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      console.error("Failed to read theme from localStorage or system preference, defaulting to dark:", error);
      return 'dark'; // Fallback in case of localStorage access issues
    }
  });

  // Эффект для применения класса темы к элементу <html> и сохранения в localStorage
  useEffect(() => {
    const root = document.documentElement;
    // Удаляем старые классы, добавляем новый
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Сохраняем в localStorage
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error);
    }
  }, [theme]); // Зависимость от изменения темы

  // Функция для переключения темы
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Значения, которые будут доступны для всех компонентов-потребителей контекста
  const contextValue = {
    theme, // 'dark' или 'light'
    isDarkMode: theme === 'dark', // Булевое значение для удобства
    toggleTheme, // Функция для переключения темы
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Пользовательский хук для удобного использования контекста темы
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider; // Экспортируем ThemeProvider по умолчанию