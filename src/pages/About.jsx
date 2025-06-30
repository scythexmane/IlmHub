import React, { useContext, memo } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { ThemeContext } from "../ThemeContext";
import { useTranslation } from "react-i18next";
import HeroPng from "../assets/aboutHero.png";

// --- Simplified Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6, // Reduced duration for faster feel
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- Hero Section ---
const HeroSection = memo(() => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDarkMode = theme === "dark";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const heroClass = isDarkMode
    ? "bg-gradient-to-b from-gray-950 to-gray-900 text-white"
    : "bg-white text-gray-900";

  return (
    <motion.section
      className={`relative flex flex-col lg:flex-row items-center justify-center min-h-[500px] lg:min-h-[600px] px-6 sm:px-8 lg:px-16 py-12 sm:py-16 ${heroClass} transition-colors duration-500`}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      {/* Simplified Background Blobs: Reduced opacity and blur for performance */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto">
        <motion.div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 pr-0 lg:pr-8" variants={itemVariants}>
          <motion.h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight font-display ${
              isDarkMode ? "text-white" : "text-gray-950"
            }`}
            variants={itemVariants}
          >
            Ilm Hub{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Learning Center
            </span>
          </motion.h1>
          <motion.p
            className={`text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 font-body ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
            variants={itemVariants}
          >
            {t("hero.description")}
          </motion.p>
        </motion.div>
        <motion.div className="lg:w-1/2 flex justify-center lg:justify-end" variants={itemVariants}>
          <img
            src={HeroPng}
            alt="Learning Center"
            className="max-w-full h-auto"
            loading="lazy" // Added lazy loading for performance
            width={500} // Added width/height for better rendering
            height={400}
          />
        </motion.div>
      </div>
    </motion.section>
  );
});

// --- Key Advantages Section ---
const KeyAdvantagesSection = memo(() => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDarkMode = theme === "dark";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

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
    <motion.section
      className={`relative py-12 sm:py-16 ${sectionBgClass} transition-colors duration-500`}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      <div className="absolute top-0 left-0 w-48 h-48 bg-teal-500 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-lime-500 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-blob animation-delay-3000"></div>

      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 font-display ${
            isDarkMode ? "text-white" : "text-gray-950"
          }`}
          variants={itemVariants}
        >
          {t("advantages.title")}
        </motion.h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={sectionVariants}>
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              className={`flex flex-col p-6 rounded-2xl ${advantage.bgColor} text-white shadow-md hover:shadow-lg transition-shadow duration-300`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <advantage.icon className="text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-center font-display">{advantage.title}</h3>
              <p className="text-base text-center font-body">{advantage.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
});

// --- Teachers Section ---
const TeachersSection = memo(() => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDarkMode = theme === "dark";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

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

  const cardBackgroundClass = isDarkMode ? "bg-gray-800" : "bg-white";
  const accentCardBackgroundClass = isDarkMode ? "bg-purple-700" : "bg-blue-600";
  const commonTextClass = isDarkMode ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDarkMode ? "text-gray-300" : "text-gray-600";

  const sectionBgClass = isDarkMode
    ? "bg-gradient-to-b from-gray-950 to-gray-900 text-white"
    : "bg-gray-100 text-gray-900";

  return (
    <motion.section
      className={`relative py-12 sm:py-16 ${sectionBgClass} transition-colors duration-500`}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 font-display ${isDarkMode ? "text-white" : "text-gray-950"}`}
          variants={itemVariants}
        >
          {t("teachers.title")}
        </motion.h2>
        <motion.div className="flex flex-col lg:flex-row justify-center items-center gap-6" variants={sectionVariants}>
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              className={`flex flex-col items-center w-full max-w-[280px] rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 ${
                index === 1 ? accentCardBackgroundClass : cardBackgroundClass
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={teacher.photo}
                alt={teacher.name}
                className="w-full h-64 object-cover object-top rounded-t-2xl"
                loading="lazy"
                width={280}
                height={256}
              />
              <div className="p-4 text-center">
                <h3 className={`text-lg font-semibold ${index === 1 ? "text-white" : commonTextClass}`}>{teacher.name}</h3>
                <p className={`text-sm ${index === 1 ? "text-purple-100" : secondaryTextClass}`}>{teacher.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
});

// --- Stats Section ---
const StatsSection = memo(() => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDarkMode = theme === "dark";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

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
    <motion.section
      className={`relative py-12 sm:py-16 ${sectionBgClass} transition-colors duration-500`}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 font-display ${
            isDarkMode ? "text-white" : "text-gray-950"
          }`}
          variants={itemVariants}
        >
          {t("stats.title")}
        </motion.h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center" variants={sectionVariants}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 ${
                isDarkMode ? "bg-white/5" : "bg-white/70"
              }`}
              variants={itemVariants}
            >
              <div className={`mb-4 ${stat.color}`}>
                <stat.icon className="w-12 h-12 mx-auto" />
              </div>
              <p className={`text-5xl font-extrabold font-display ${stat.color}`}>
                {inView ? <CountUp end={stat.value} duration={2} /> : "0"}
                {stat.suffix}
              </p>
              <p className={`text-lg font-body ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
});

// --- Call To Action Section ---
const CallToActionSection = memo(() => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDarkMode = theme === "dark";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const sectionBgClass = isDarkMode
    ? "bg-gradient-to-b from-gray-950 to-gray-900 text-white"
    : "bg-gradient-to-b from-blue-700 to-indigo-600 text-white";

  return (
    <motion.section
      className={`relative py-12 sm:py-16 text-center ${sectionBgClass} transition-colors duration-500`}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight font-display text-white"
          variants={itemVariants}
        >
          {t("cta.title")}
        </motion.h2>
        <motion.p
          className={`text-base sm:text-lg max-w-3xl mx-auto mb-6 font-body ${
            isDarkMode ? "text-gray-200" : "text-blue-100"
          }`}
          variants={itemVariants}
        >
          {t("cta.description")}
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row justify-center items-center gap-4" variants={sectionVariants}>
          <motion.button
            className={`px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${
              isDarkMode
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            {t("cta.buttons.enroll")} <ArrowRight className="ml-2 w-5 h-5 inline" />
          </motion.button>
          <motion.button
            className={`px-6 py-3 rounded-full font-semibold border-2 transition-colors duration-300 ${
              isDarkMode
                ? "border-blue-400 text-blue-300 hover:bg-blue-900/20"
                : "border-white text-white hover:bg-white/30"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            {t("cta.buttons.learnMore")} <BookOpenText className="ml-2 w-5 h-5 inline" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
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
    <div className={`font-sans antialiased min-h-screen ${pageBgClass} transition-colors duration-500`}>
      <style>
        {`
          .shadow-md { box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
          .shadow-lg { box-shadow: 0 6px 12px rgba(0,0,0,0.15); }
          .font-display { font-family: 'Inter', sans-serif; }
          .font-body { font-family: 'Roboto', sans-serif; }

          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(5px, 5px) scale(1.02); }
          }
          .animate-blob {
            animation: blob 8s infinite ease-in-out;
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-3000 { animation-delay: 3s; }
        `}
      </style>
      <main>
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