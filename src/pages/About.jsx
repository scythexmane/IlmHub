import React, { useContext, memo } from "react";
// import { motion } from "framer-motion"; // Удаляем framer-motion
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import {
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Rocket,
  Brain,
  Users,
  BookOpenText,
  Award,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { ThemeContext } from "../ThemeContext";
import { useTranslation } from "react-i18next";
import "../index.css"; // Убедитесь, что ваш index.css подключен и содержит Tailwind CSS
import { Link } from "react-router-dom";
// --- Hero Section ---
import { motion } from "framer-motion";

import  AboutHero from "./AboutHero";

const HeroSection = () => {
  return (
    <div>
      <AboutHero />
    </div>
  );
};

// --- Key Advantages Section ---
const KeyAdvantagesSection = memo(() => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDarkMode = theme === "dark";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const advantages = [
    {
      icon: Rocket,
      title: t("advantages.items.0.title"),
      description: t("advantages.items.0.description"),
      bgColor: "bg-blue-600",
    },
    {
      icon: Users,
      title: t("advantages.items.1.title"),
      description: t("advantages.items.1.description"),
      bgColor: "bg-orange-600",
    },
    {
      icon: ShieldCheck,
      title: t("advantages.items.2.title"),
      description: t("advantages.items.2.description"),
      bgColor: "bg-green-600",
    },
    {
      icon: Brain,
      title: t("advantages.items.3.title"),
      description: t("advantages.items.3.description"),
      bgColor: "bg-purple-600",
    },
    {
      icon: Lightbulb,
      title: t("advantages.items.4.title"),
      description: t("advantages.items.4.description"),
      bgColor: "bg-yellow-600",
    },
    {
      icon: Award,
      title: t("advantages.items.5.title"),
      description: t("advantages.items.5.description"),
      bgColor: "bg-red-600",
    },
  ];

  const sectionBgClass = isDarkMode
    ? "bg-gradient-to-b from-gray-900 to-gray-950 text-white"
    : "bg-gray-100 text-gray-900";

  return (
    <section
      className={`relative py-16 sm:py-20 overflow-hidden ${sectionBgClass} transition-colors duration-700 ease-[0.22,1,0.36,1]`}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 font-display ${
            isDarkMode ? "text-white" : "text-gray-950"
          } transition-colors duration-500
            ${inView ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`}
        >
          {t("advantages.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-12">
          {advantages.map((advantage, index) => (
            <div // motion.div заменена на обычную div
              key={index}
              className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-[2rem] shadow-medium overflow-hidden cursor-pointer group
                transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-medium
                ${advantage.bgColor} text-white
                ${
                  inView
                    ? `animate-fade-in-up animation-delay-${index * 100}`
                    : "opacity-0 translate-y-8"
                }`} // CSS-анимация со стаггером
              style={{ animationDelay: `${index * 100}ms` }} // Устанавливаем задержку динамически
            >
              <div className="absolute inset-0 z-0 opacity-10 bg-grid-pattern"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div
                  className={`p-5 rounded-full mb-5 shadow-smooth bg-white/20 text-white`} // Изменены тени
                >
                  <advantage.icon className="text-4xl sm:text-5xl" />
                </div>
                <h3
                  className={`text-xl sm:text-2xl font-extrabold mb-3 leading-tight font-display drop-shadow-text-subtle text-white`}
                >
                  {advantage.title}
                </h3>
                <p
                  className={`text-base sm:text-lg leading-relaxed opacity-90 font-body text-white/90`}
                >
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// --- Teachers Section ---
const TeachersSection = memo(() => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDarkMode = theme === "dark";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const teachers = [
    {
      id: 1,
      name: t("teachers.teachers.0.name"),
      title: t("teachers.teachers.0.title"),
      photo: "https://ilmhub.uz/assets/images/avatar/wahid.webp",
    },
    {
      id: 2,
      name: t("teachers.teachers.1.name"),
      title: t("teachers.teachers.1.title"),
      photo: "https://ilmhub.uz/assets/images/avatar/kilichbek.webp",
    },
    {
      id: 3,
      name: t("teachers.teachers.2.name"),
      title: t("teachers.teachers.2.title"),
      photo: "https://ilmhub.uz/assets/images/avatar/davron.webp",
    },
  ];

  const cardBackgroundClass = isDarkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";
  const accentCardBackgroundClass = isDarkMode
    ? "bg-purple-700 border-purple-600"
    : "bg-blue-600 border-blue-500";
  const accentTextClass = "text-white";
  const commonTextClass = isDarkMode ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDarkMode ? "text-gray-300" : "text-gray-600";

  const sectionBgClass = isDarkMode
    ? "bg-gradient-to-b from-gray-950 to-gray-900 text-white"
    : "bg-gray-100 text-gray-900";

  return (
    <section
      className={`relative py-16 sm:py-20 overflow-visible sm:min-h-[400px] ${sectionBgClass} transition-colors duration-700 ease-[0.22,1,0.36,1]`}
      ref={ref}
    >
      <div className="absolute top-0 left-1/4 w-56 h-56 bg-red-400 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-blob animation-delay-1000"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-blob animation-delay-5000"></div>

      <div className="max-w-7xl mx-auto px-4">
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12 font-display ${
            isDarkMode ? "text-white" : "text-gray-950"
          } transition-colors duration-500
            ${inView ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`}
        >
          {t("teachers.title")}
        </h2>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 sm:gap-6">
          {teachers.map((teacher, index) => (
            <div // motion.div заменена на обычную div
              key={teacher.id}
              className={`
                relative flex flex-col items-center w-full max-w-[280px]
                border overflow-hidden group cursor-pointer
                shadow-medium transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-medium
                ${index === 1 ? accentCardBackgroundClass : cardBackgroundClass}
                ${index === 1 ? "lg:translate-y-[10%]" : ""}
                rounded-[2rem]
                sm:min-h-[300px] min-h-[350px]
                ${
                  inView
                    ? `animate-fade-in-up animation-delay-${index * 100}`
                    : "opacity-0 translate-y-8"
                }
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative w-full h-[300px] sm:h-[70%] overflow-hidden flex-shrink-0">
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  className="w-full h-full object-cover object-top transition-transform duration-300 ease-in-out group-hover:scale-105"
                  loading="lazy"
                  width={280}
                  height={300}
                />
                {isDarkMode && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                )}
              </div>
              <div className="flex-grow flex flex-col justify-center items-center p-4 text-center">
                <h3
                  className={`text-base sm:text-lg font-semibold mb-1 leading-tight font-heading ${
                    index === 1 ? accentTextClass : commonTextClass
                  }`}
                >
                  {teacher.name}
                </h3>
                <p
                  className={`text-sm font-medium ${
                    index === 1 ? "text-purple-100" : secondaryTextClass
                  }`}
                >
                  {teacher.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// --- Stats Section ---
const StatsSection = memo(() => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDarkMode = theme === "dark";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    {
      icon: Users,
      value: 1000,
      suffix: "+",
      label: t("stats.students"),
      color: "text-blue-500",
    },
    {
      icon: Award,
      value: 50,
      suffix: "+",
      label: t("stats.courses"),
      color: "text-green-500",
    },
    {
      icon: BookOpenText,
      value: 10,
      suffix: "+",
      label: t("stats.teachers"),
      color: "text-purple-500",
    },
  ];

  const sectionBgClass = isDarkMode
    ? "bg-gradient-to-b from-gray-900 to-gray-950 text-white"
    : "bg-gray-200 text-gray-900";

  return (
    <section
      className={`relative py-16 sm:py-20 overflow-hidden ${sectionBgClass} transition-colors duration-700 ease-[0.22,1,0.36,1]`}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 font-display ${
            isDarkMode ? "text-white" : "text-gray-950"
          } transition-colors duration-500
            ${inView ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`}
        >
          {t("stats.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center">
          {stats.map((stat, index) => (
            <div // motion.div заменена на обычную div
              key={index}
              className={`p-6 sm:p-8 rounded-[2rem] glass-effect-sm ${
                isDarkMode
                  ? "bg-white/5 border-gray-700"
                  : "bg-white/70 border-gray-200"
              } shadow-medium flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:scale-[1.02]
                ${
                  inView
                    ? `animate-fade-in-up animation-delay-${index * 100}`
                    : "opacity-0 translate-y-8"
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`mb-4 ${stat.color}`}>
                <stat.icon className="w-16 h-16 sm:w-20 sm:h-20 mx-auto drop-shadow-text-subtle" />{" "}
                {/* Изменены тени */}
              </div>
              <p
                className={`text-5xl sm:text-6xl font-extrabold font-display leading-none mb-2 drop-shadow-text-strong ${stat.color}`}
              >
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} separator="" />
                ) : (
                  "0"
                )}
                {stat.suffix}
              </p>
              <p
                className={`text-lg sm:text-xl font-medium font-body ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// --- Call To Action Section ---
const CallToActionSection = memo(() => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDarkMode = theme === "dark";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const sectionBgClass = isDarkMode
    ? "bg-gradient-to-b from-gray-950 to-gray-900 text-white"
    : "bg-gradient-to-b from-blue-700 to-indigo-600 text-white";

  return (
    <section
      className={`relative py-16 sm:py-20 text-center overflow-hidden ${sectionBgClass} transition-colors duration-700 ease-[0.22,1,0.36,1]`}
      ref={ref}
    >
      <div className="absolute top-10 -left-10 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-7000"></div>
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-9000"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 sm:mb-10 leading-tight font-display drop-shadow-text-light text-white
            ${inView ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`}
        >
          {t("cta.title")}
        </h2>
        <p
          className={`text-base sm:text-lg max-w-4xl mx-auto mb-8 sm:mb-10 leading-relaxed font-body opacity-90 ${
            isDarkMode ? "text-gray-200" : "text-blue-100"
          }
            ${
              inView
                ? "animate-fade-in-up delay-200"
                : "opacity-0 translate-y-8"
            }`}
        >
          {t("cta.description")}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/contacts"
            className={`inline-flex items-center px-8 py-4 rounded-full shadow-button-subtle-glow transform transition-all duration-400 ease-[0.22,1,0.36,1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4
      ${
        isDarkMode
          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus-visible:ring-blue-400 focus-visible:ring-offset-gray-900"
          : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus-visible:ring-green-400 focus-visible:ring-offset-gray-50"
      } text-base sm:text-lg font-semibold hover:shadow-button-hover-glow hover:scale-[1.02]
      ${inView ? "animate-fade-in-up delay-400" : "opacity-0 translate-y-8"}`}
          >
            {t("cta.buttons.enroll")} <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
});

// --- Main About Us Page Component ---
const AboutUsPage = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const pageBgClass = isDarkMode
    ? "bg-gradient-to-b from-gray-950 to-gray-900 text-white"
    : "bg-gray-100 text-gray-800";

  return (
    <div
      className={`font-sans antialiased min-h-screen ${pageBgClass} transition-colors duration-700 ease-[0.22,1,0.36,1]`}
    >
      {/* <style> block удален, так как все стили перенесены в tailwind.config.js или index.css */}
      <main className="min-h-screen">
        <HeroSection />
        <KeyAdvantagesSection />
        <TeachersSection />
        <StatsSection />
        <CallToActionSection />
      </main>
    </div>
  );
};

export default AboutUsPage;
