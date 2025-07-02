"use client";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { MailPlus, Send } from "lucide-react";
import { ThemeContext } from "../ThemeContext";
import "../index.css";

const ContactPage = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const sectionBg = isDark ? "bg-gray-950" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const inputBg = isDark
    ? "bg-gray-800 text-white placeholder-gray-500"
    : "bg-gray-50 text-gray-900 placeholder-gray-400";
  const border = isDark ? "border-gray-700" : "border-gray-200";
  const ringColor = isDark ? "focus:ring-blue-400" : "focus:ring-blue-600";
  const btnBg = isDark
    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
    : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white";

  return (
    <div className="relative min-h-screen overflow-hidden isolate">
      {/* 💡 Лампа сверху */}
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 z-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/40 via-transparent to-transparent blur-[160px] animate-pulse-glow pointer-events-none" />

      {/* 💡 Лампа снизу */}
      <div className="absolute bottom-[-250px] left-1/2 -translate-x-1/2 z-0 w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-600/30 via-transparent to-transparent blur-[160px] animate-pulse-glow pointer-events-none" />

      <section
        className={`relative z-10 w-full pt-32 pb-28 px-4 sm:px-8 font-sans transition-colors duration-1000 ${sectionBg}`}
      >
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h1 className={`text-4xl md:text-5xl font-extrabold ${textColor}`}>
            {t("contact.title")}
            <MailPlus className="inline-block text-blue-500 ml-2 mb-1" size={36} />
          </h1>
          <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {t("contact.description")}
          </p>

          {/* Форма */}
          <form className="space-y-5 w-full max-w-md mx-auto mt-10 bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl">
            <input
              type="text"
              placeholder={t("contact.form.name")}
              className={`w-full px-4 py-3 rounded-xl border ${border} ${inputBg}
                focus:outline-none focus:ring-2 ${ringColor} transition duration-300`}
            />
            <input
              type="tel"
              placeholder="+998 90 123 45 67"
              className={`w-full px-4 py-3 rounded-xl border ${border} ${inputBg}
                focus:outline-none focus:ring-2 ${ringColor} transition duration-300`}
            />
            <textarea
              rows="6"
              placeholder={t("contact.form.message")}
              className={`w-full px-4 py-3 rounded-xl border ${border} ${inputBg}
                focus:outline-none focus:ring-2 ${ringColor} resize-y transition duration-300`}
            ></textarea>
            <button
              type="submit"
              className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3
                ${btnBg} hover:brightness-110 active:scale-[0.98]
                shadow-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 ${ringColor}`}
            >
              <Send className="w-5 h-5" />
              {t("contact.form.send")}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
