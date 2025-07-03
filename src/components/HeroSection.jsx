import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../ThemeContext";

const HeroSection = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <section
      className={`relative z-10 overflow-hidden px-6 sm:px-12 lg:px-24 pt-32 pb-24 min-h-[90vh] transition-colors duration-500 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Звёздный фон */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="night w-full h-full absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="shooting_star" />
          ))}
        </div>
      </div>
<br />
<br />
<br />
      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-10">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-br from-blue-500 via-green-500 to-indigo-500 dark:from-blue-400 dark:via-green-400 dark:to-indigo-400"
        >
          Ilm Hub <br />{t("Zamonaviy")} {t("Interaktiv")} {t("Ta'lim markazi")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-600"
        >
          {t(
            "Eng so‘nggi texnologiyalar asosida darslar, tajribali o‘qituvchilar va kuchli natijalar. Siz ham o‘z sohangizning mutaxassisi bo‘ling!"
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            to="/courses"
            className="inline-block px-8 py-3 font-semibold rounded-full shadow-lg transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {t("Kurslarni ko‘rish")}
          </Link>
        </motion.div>
      </div>

      {/* Стили анимации звёзд */}
      <style>{`
        .night {
          position: relative;
          transform: rotateZ(45deg);
        }

        .shooting_star {
          position: absolute;
          height: 2px;
          width: 100px;
          background: linear-gradient(-45deg, rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
          border-radius: 999px;
          filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
          animation:
            tail 3000ms ease-in-out infinite,
            shooting 3000ms ease-in-out infinite;
        }

        .shooting_star::before,
        .shooting_star::after {
          content: '';
          position: absolute;
          top: calc(50% - 1px);
          right: 0;
          height: 2px;
          background: linear-gradient(-45deg, rgba(0, 0, 255, 0), rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
          transform: translateX(50%) rotateZ(45deg);
          border-radius: 100%;
          animation: shining 3000ms ease-in-out infinite;
        }

        .shooting_star::after {
          transform: translateX(50%) rotateZ(-45deg);
        }

        /* Случайные позиции звёзд */
        ${Array.from({ length: 40 })
          .map((_, i) => {
            const top = Math.floor(Math.random() * 95) + 2;
            const left = Math.floor(Math.random() * 95) + 2;
            const delay = Math.floor(Math.random() * 7000);
            return `
              .shooting_star:nth-child(${i + 1}) {
                top: ${top}%;
                left: ${left}%;
                animation-delay: ${delay}ms;
              }
            `;
          })
          .join("")}

        @keyframes tail {
          0% { width: 0; }
          30% { width: 100px; }
          100% { width: 0; }
        }

        @keyframes shining {
          0% { width: 0; }
          50% { width: 30px; }
          100% { width: 0; }
        }

        @keyframes shooting {
          0% { transform: translateX(0); }
          100% { transform: translateX(300px); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
