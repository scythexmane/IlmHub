// components/Header.jsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../ThemeContext';
import '../index.css';
// Lucide Icons
import { Phone, Send, Sun, Moon, Menu, X, BookOpenText, Globe } from 'lucide-react';

const Header = () => {
  const { i18n, t } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const location = useLocation();
  const langDropdownRef = useRef(null);

  const languages = [
    { code: 'uz', name: 'Uzbek', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langDropdownRef]);

  // Effect to manage body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset'; // Or 'auto' depending on your preference
    }
    // Cleanup function to reset overflow when component unmounts or menu closes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageDropdownOpen(false);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const navLinks = [
    { name: t("Bosh sahifa"), path: "/" },
    { name: t("Kurslar"), path: "/courses" },
    { name: t("Biz haqimizda"), path: "/about" },
    { name: t("Aloqa"), path: "/contacts" },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scaleY: 0, originY: "top" },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, scaleY: 0, originY: "top", transition: { duration: 0.15, ease: "easeIn" } },
  };

  // Используем класс glass-effect, определенный в globals.css
  const headerBackgroundClass = isScrolled
    ? 'glass-effect shadow-lg' // Стеклянный эффект, тень
    : 'bg-[var(--color-bg)] shadow-md'; // Прозрачность будет из var(--color-bg)

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
                   ${headerBackgroundClass}
                  `}
      role="banner"
      aria-label={t("Основной заголовок сайта с навигацией")}
    >
      <nav
        className={`flex justify-between items-center py-4 px-6
                    ${isScrolled ? 'lg:py-3' : ''} transition-all duration-300 ease-in-out`}
        aria-label={t("Основная навигация сайта")}
      >
        {/* Left Section: Logo and Prominent Phone Number */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight drop-shadow-md"
            aria-label={t("Перейти на домашнюю страницу Ilm Hub")}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2"
            >
              <BookOpenText size={30} style={{ color: 'var(--color-primary)' }} /> {/* Иконка primary */}
              Ilm <span style={{ color: 'var(--color-primary)' }}>Hub</span>
            </motion.span>
          </Link>

          {/* Prominent Phone Number for Desktop */}
          <motion.a
            href="tel:+998901234567"
            className="hidden md:flex items-center gap-2 text-[var(--color-text)]
                        hover:text-[var(--color-primary)] transition-colors duration-200
                        text-lg font-semibold px-3 py-2 rounded-lg bg-[var(--color-bg-alt)] glass-effect-sm shadow-md"
            aria-label={t("Позвонить по номеру телефона")}
            whileHover={{ scale: 1.03, boxShadow: "0px 4px 10px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.97 }}
          >
            <Phone size={20} style={{ color: 'var(--color-primary)' }} />
            <span> +998 93 886 98 98</span>
          </motion.a>
        </div>

        {/* Center Section: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 font-medium">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.08, duration: 0.3 }}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative group text-[var(--color-text)] px-2 py-1 rounded-md
                    hover:text-[var(--color-primary)]
                    transition-all duration-300 ease-in-out
                    ${isActive ? 'font-semibold text-[var(--color-primary)]' : ''}`
                }
                aria-current={({ isActive }) => isActive ? "page" : undefined}
                aria-label={t(`Перейти на страницу ${link.name}`)}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-primary)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left
                                ${ (location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))) ? 'scale-x-100' : ''}`}
                ></span>
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Right Section: Language Selector, Theme Toggle, CTA Button */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Language Selector with Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <motion.button
              onClick={toggleLanguageDropdown}
              className={`flex items-center gap-2 px-3 py-2 rounded-full font-semibold
                          text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]
                          transition-all duration-200 ease-in-out
                          ${isLanguageDropdownOpen ? 'bg-[var(--color-bg-alt)]' : ''}`}
              aria-label={t("Переключить язык")}
              aria-expanded={isLanguageDropdownOpen}
              aria-haspopup="true"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              
              {languages.find(lang => lang.code === i18n.language)?.flag} {i18n.language.toUpperCase()}
            </motion.button>

            <AnimatePresence>
              {isLanguageDropdownOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  className="absolute right-0 mt-2 w-32 rounded-lg shadow-xl
                              glass-effect-sm
                              border border-[var(--color-border)] z-10" // Added z-10 for dropdown
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="language-menu-button"
                >
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left
                                  text-[var(--color-text)]
                                  transition-colors duration-150 ease-in-out rounded-lg
                                  ${i18n.language === lang.code ? 'font-bold text-[var(--color-primary)]' : ''}`}
                      role="menuitem"
                      aria-label={t(`Переключить язык на ${lang.name}`)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.name}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={toggleTheme}
            className="text-lg p-2 rounded-full hover:bg-[var(--color-hover-bg)] transition-colors text-[var(--color-text)]"
            title={t("Переключить тему")}
            aria-label={t("Переключить светлую или темную тему")}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>

          <Link
            to="/contacts"
            aria-label={t("Записаться на курс")}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-semibold btn-primary`}
            >
              {t("Записаться на курс")}
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button & Theme Toggle (Mobile) */}
        <div className="lg:hidden flex items-center gap-4">
          <motion.button
            onClick={toggleTheme}
            className="text-xl p-2 rounded-full hover:bg-[var(--color-hover-bg)] transition-colors text-[var(--color-text)]"
            title={t("Переключить тему")}
            aria-label={t("Переключить светлую или темную тему")}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>
          <motion.button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-[var(--color-text)] hover:bg-[var(--color-hover-bg)] transition-colors"
            aria-label={t("Открыть мобильное меню")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            // Added h-screen to ensure it takes full viewport height
            // Added z-[999] for a very high z-index to ensure it's on top
            className={`lg:hidden fixed inset-0 bg-[var(--color-bg)]/95
                         backdrop-blur-xl flex flex-col items-center justify-center p-8
                         transition-colors duration-300 ease-in-out h-screen z-[999]
                         aria-modal="true" role="dialog"`}
          >
            <motion.button
              onClick={toggleMobileMenu}
              className="absolute top-6 right-6 p-2 rounded-md text-[var(--color-text)] hover:bg-[var(--color-hover-bg)] transition-colors"
              aria-label={t("Закрыть мобильное меню")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={32} />
            </motion.button>

            {/* Mobile Nav Links */}
            <ul className="flex flex-col gap-6 text-2xl font-bold text-[var(--color-text)]">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  variants={mobileMenuItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 * index }}
                >
                  <NavLink
                    to={link.path}
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      `hover:text-[var(--color-primary)] transition-colors
                       ${isActive ? 'text-[var(--color-primary)]' : ''}`
                    }
                    aria-current={({ isActive }) => isActive ? "page" : undefined}
                    aria-label={t(`Перейти на страницу ${link.name}`)}
                  >
                    {link.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            {/* Mobile Contact Info & Language Switch (within mobile menu) */}
            <div className="flex flex-col items-center gap-4 mt-8">
              {/* Phone Number in Mobile Menu */}
              <a href="tel:+998901234567" className="flex items-center gap-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors text-lg" aria-label={t("Позвонить по номеру телефона")}>
                <Phone size={20} />
                <span>+998 90 123 45 67</span>
              </a>
              {/* Telegram in Mobile Menu */}
              <a
                href="https://t.me/ilmhub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors text-lg"
                aria-label={t("Перейти в наш Telegram канал")}
              >
                <Send size={20} />
                Telegram
              </a>

              {/* Language Selector in Mobile Menu */}
              <div className="flex gap-4 mt-4">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`uppercase px-4 py-2 rounded-md text-sm font-semibold
                                ${i18n.language === lang.code ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text)] hover:bg-[var(--color-hover-bg)]'}
                                transition-all duration-200 ease-in-out flex items-center gap-2`}
                    aria-label={t(`Переключить язык на ${lang.name}`)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    {lang.code.toUpperCase()}
                  </motion.button>
                ))}
              </div>

              {/* CTA Button in Mobile Menu */}
              <Link
                to="/contacts"
                onClick={toggleMobileMenu}
                aria-label={t("Записаться на курс")}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-6 px-8 py-4 rounded-full text-lg font-semibold btn-primary`}
                >
                  {t("Записаться на курс")}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;