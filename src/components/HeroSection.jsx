import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  const imageContentId =
    "https://static.vecteezy.com/system/resources/previews/010/873/197/original/3d-male-graphic-designer-working-on-laptop-png.png";

  return (
    <section
      className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 py-24 lg:py-40 flex flex-col-reverse lg:flex-row items-center justify-between overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]"
    >
      {/* Блоб-анимации */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-60 h-60 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-2xl animate-float-blob" />
        <div className="absolute top-[10%] right-[-5%] w-80 h-80 bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float-blob animation-delay-3000" />
        <div className="absolute bottom-[5%] left-[30%] w-72 h-72 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float-blob animation-delay-6000" />
      </div>

      {/* Контент */}
      <div className="relative z-10 flex flex-col gap-6 max-w-2xl text-center lg:text-left">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
        >
          Ilm Hub —{" "}
          <span className="text-[var(--color-primary)]">
            {t("Zamonaviy")}
          </span>{" "}
          {" "}
          <span className="text-[var(--color-secondary)]">
            {t("Interaktiv")}
          </span>{" "}
          {t("Ta'lim markazi")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-[var(--color-muted)]"
        >
          {t(
            "Eng so‘nggi texnologiyalar asosida darslar, tajribali o‘qituvchilar va kuchli natijalar. Siz ham o‘z sohangizning mutaxassisi bo‘ling!"
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            to="/courses"
            className="inline-block px-8 py-3 rounded-full bg-[var(--color-primary)] hover:bg-opacity-80 text-white font-semibold text-base sm:text-lg shadow-xl transition duration-300 backdrop-blur-md"
          >
            {t("Kurslarni ko‘rish")}
          </Link>
        </motion.div>
      </div>

      {/* Изображение */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative z-10 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-12 lg:mb-0 flex justify-center"
      >
        <img
          src={imageContentId}
          alt={t("Изображение Ilm Hub")}
          className="w-full object-contain drop-shadow-2xl"
        />

        {/* Доп. декоративные эффекты */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-2xl opacity-20" />
        <div className="absolute -top-6 -left-6 w-36 h-36 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-2xl opacity-20" />
      </motion.div>

      {/* Blob анимация keyframes */}
      <style>{`
        @keyframes float-blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(15px, -10px) scale(1.05);
          }
          50% {
            transform: translate(-20px, 10px) scale(0.95);
          }
          75% {
            transform: translate(10px, 20px) scale(1.03);
          }
        }
        .animate-float-blob {
          animation: float-blob 18s ease-in-out infinite;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
