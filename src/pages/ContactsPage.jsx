// Ваш файл: ContactPage.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MailPlus, Send } from "lucide-react";
import { useTranslation } from "react-i18next"; // Импортируем хук для переводов

import contactsvg from "../assets/contactsvg.svg"; // Проверяйте путь!
import { ThemeContext } from "../ThemeContext"; // Проверяйте путь!

// Animation Variants (без изменений)
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 10, delay: 0.5 },
  },
};

// Компонент ContactPage
const ContactPage = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation(); // Хук для получения переводов
  const isDarkMode = theme === "dark";

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Динамические классы в зависимости от темы
  const sectionBgClass = isDarkMode ? "bg-gray-950" : "bg-white";
  const textColorClass = isDarkMode ? "text-white" : "text-gray-900";
  const mutedTextColorClass = isDarkMode ? "text-gray-300" : "text-gray-600";
  const inputBgClass = isDarkMode
    ? "bg-gray-800 text-white placeholder-gray-500"
    : "bg-gray-50 text-gray-900 placeholder-gray-400";
  const inputBorderClass = isDarkMode ? "border-gray-700" : "border-gray-200";
  const focusRingColor = isDarkMode
    ? "focus:ring-blue-400"
    : "focus:ring-blue-600";

  const buttonBgClass = isDarkMode
    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
    : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/30";
  const buttonHoverClass = isDarkMode
    ? "hover:from-blue-600 hover:to-indigo-700 hover:shadow-blue-600/40"
    : "hover:from-blue-700 hover:to-indigo-800 hover:shadow-blue-700/40";
  const buttonActiveClass = "active:scale-[0.98]";

  return (
    <div
      className={`font-sans antialiased min-h-screen w-full
    flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8
    ${isDarkMode ? "bg-gray-950" : "bg-white"}
    transition-colors duration-700 ease-[0.22,1,0.36,1]`}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto:wght@100;300;400;500;700;900&display=swap');
          .font-display { font-family: 'Inter', sans-serif; }
          .font-body { font-family: 'Roboto', sans-serif; }

          .shadow-custom-light {
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
          }
          .shadow-custom-dark {
            box-shadow: 0 20px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05);
          }
        `}
      </style>
      <motion.div
        className={`w-full p-8 sm:p-12 md:p-16 lg:p-20 rounded-[2.5rem] ${sectionBgClass}
          transition-all duration-700 ease-[0.22,1,0.36,1] flex flex-col lg:flex-row items-center gap-12 lg:gap-20`}
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        {/* Левая секция: Текст и иллюстрация */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          variants={sectionVariants}
        >
          <motion.h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight font-display ${textColorClass}`}
            variants={itemVariants}
          >
            {t("contact.title")}
            <motion.span variants={iconVariants} className="inline-block ml-3">
              <MailPlus
                className="inline-block text-blue-500"
                size={isDarkMode ? 56 : 64}
              />
            </motion.span>
          </motion.h2>
          <motion.p
            className={`text-lg sm:text-xl lg:text-2xl max-w-xl mx-auto lg:mx-0 mb-10 ${mutedTextColorClass} font-body`}
            variants={itemVariants}
          >
            {t("contact.description")}
          </motion.p>

          {/* Иллюстрация */}
          <motion.div
            className="w-full flex justify-center lg:justify-start mt-8"
            variants={itemVariants}
          >
            <img
              src={contactsvg}
              alt={t("contact.illustration_alt_text")}
              className="max-w-130 h-auto drop-shadow-2xl rounded-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Правая секция: Контактная форма */}
        <motion.div
          className="flex-1 w-full lg:w-auto"
          variants={sectionVariants}
        >
          <form className="space-y-6 w-full">
            <motion.input
              type="text"
              placeholder={t("contact.form.name")}
              className={`w-full p-4 rounded-xl border ${inputBorderClass} focus:outline-none focus:ring-2 ${focusRingColor} focus:border-transparent ${inputBgClass} transition-all duration-300 ease-in-out`}
              variants={itemVariants}
            />
            <motion.input
              type="email"
              placeholder={t("contact.form.email")}
              className={`w-full p-4 rounded-xl border ${inputBorderClass} focus:outline-none focus:ring-2 ${focusRingColor} focus:border-transparent ${inputBgClass} transition-all duration-300 ease-in-out`}
              variants={itemVariants}
            />
            <motion.input
              type="text"
              placeholder={t("contact.form.subject")}
              className={`w-full p-4 rounded-xl border ${inputBorderClass} focus:outline-none focus:ring-2 ${focusRingColor} focus:border-transparent ${inputBgClass} transition-all duration-300 ease-in-out`}
              variants={itemVariants}
            />
            <motion.textarea
              placeholder={t("contact.form.message")}
              rows="7"
              className={`w-full p-4 rounded-xl border ${inputBorderClass} resize-y focus:outline-none focus:ring-2 ${focusRingColor} focus:border-transparent ${inputBgClass} transition-all duration-300 ease-in-out`}
              variants={itemVariants}
            ></motion.textarea>
            <motion.button
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3
                ${buttonBgClass} ${buttonHoverClass} ${buttonActiveClass}
                transition-all duration-300 ease-in-out transform
                focus:outline-none focus:ring-2 ${focusRingColor} focus:ring-offset-2 ${
                isDarkMode
                  ? "focus:ring-offset-gray-900"
                  : "focus:ring-offset-white"
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-6 h-6" /> {t("contact.form.send")}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
