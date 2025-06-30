import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MailPlus, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import '../index.css';
import contactsvg from "../assets/contactsvg.svg";
import { ThemeContext } from "../ThemeContext";

// 🔧 Обновлённые анимации
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 15,
      delay: 0.2,
    },
  },
};

const ContactPage = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDarkMode = theme === "dark";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

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
      flex items-center justify-center py-12 px-3 sm:px-6 lg:px-8
      ${sectionBgClass} overflow-hidden`}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto:wght@100;300;400;500;700;900&display=swap');
          .font-display { font-family: 'Inter', sans-serif; }
          .font-body { font-family: 'Roboto', sans-serif; }
        `}
      </style>

      <motion.div
        className={`w-full max-w-[1300px] pt-14 sm:p-8 md:p-16 lg:p-20 rounded-3xl
          ${sectionBgClass} flex flex-col lg:flex-row items-center gap-10 lg:gap-20`}
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        {/* Левая секция */}
        <div className="flex-1 text-center lg:text-left w-full">
          <motion.h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight font-display break-words ${textColorClass}`}
            variants={itemVariants}
          >
            {t("contact.title")}
            <motion.span variants={iconVariants} className="inline-block ml-2">
              <MailPlus className="text-blue-500" size={48} />
            </motion.span>
          </motion.h2>

          <motion.p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-md sm:max-w-xl mx-auto lg:mx-0 mb-8 ${mutedTextColorClass} font-body`}
            variants={itemVariants}
          >
            {t("contact.description")}
          </motion.p>

          <motion.div
            className="w-full flex justify-center lg:justify-start mt-6"
            variants={itemVariants}
          >
            <img
              src={contactsvg}
              alt={t("contact.illustration_alt_text")}
              className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] h-auto drop-shadow-2xl rounded-2xl"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Правая секция */}
        <motion.div className="flex-1 w-full" variants={sectionVariants}>
          <form className="space-y-5 w-full max-w-[500px] mx-auto">
            {/* Имя */}
            <motion.input
              type="text"
              placeholder={t("contact.form.name")}
              className={`w-full px-4 py-3 rounded-xl border ${inputBorderClass}
      focus:outline-none focus:ring-2 ${focusRingColor} focus:border-transparent
      ${inputBgClass} transition duration-300 text-base`}
              variants={itemVariants}
            />

            {/* Телефон */}
            <motion.input
              type="tel"
              placeholder="+998 90 123 45 67"
              required
              className={`w-full px-4 py-3 rounded-xl border ${inputBorderClass}
      focus:outline-none focus:ring-2 ${focusRingColor} focus:border-transparent
      ${inputBgClass} transition duration-300 text-base`}
              variants={itemVariants}
            />

            {/* Сообщение */}
            <motion.textarea
              placeholder={t("contact.form.message")}
              rows="6"
              className={`w-full px-4 py-3 rounded-xl border ${inputBorderClass} resize-y
      focus:outline-none focus:ring-2 ${focusRingColor} focus:border-transparent
      ${inputBgClass} transition duration-300 text-base`}
              variants={itemVariants}
            ></motion.textarea>

            {/* Кнопка отправки */}
            <motion.button
              initial={false}
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3
        ${buttonBgClass} ${buttonHoverClass} ${buttonActiveClass}
        transition-transform duration-200 ease-out
        focus:outline-none focus:ring-2 ${focusRingColor} focus:ring-offset-2 ${
                isDarkMode
                  ? "focus:ring-offset-gray-900"
                  : "focus:ring-offset-white"
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
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
