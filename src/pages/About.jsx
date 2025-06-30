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
import '../index.css';
// --- Animation Variants for Individual Elements ---
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.2, 0.7, 0.3, 0.9] },
  },
};

// --- Hero Section ---
const HeroSection = memo(() => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDarkMode = theme === "dark";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const heroClass = isDarkMode
    ? "bg-gradient-to-b from-gray-950 to-gray-900 text-white"
    : "bg-white text-gray-900";

  return (
    <section
      className={`relative  flex flex-col lg:flex-row items-center justify-center min-h-[500px] lg:min-h-[700px] px-6 sm:px-8 lg:px-16 py-16 sm:py-20 overflow-hidden ${heroClass} transition-all duration-700 ease-[0.22,1,0.36,1] group`}
      ref={ref}
    >
      {/* Background Blobs */}
      <div className="absolute top-0 -left-32 w-80 h-80 bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-0"></div>
      <div className="absolute -bottom-20 right-0 w-1/3 h-1/3 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -top-20 right-1/4 w-64 h-64 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto">
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 pr-0 lg:pr-12">
        <br />
          <motion.h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight font-display drop-shadow-text-heavy ${
              isDarkMode ? "text-white" : "text-gray-950"
            } transition-colors duration-500`}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            Ilm Hub{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Learning Center
            </span>
          </motion.h1>
          <motion.p
            className={`text-lg sm:text-xl max-w-3xl ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            } mx-auto lg:mx-0 opacity-90 font-light font-body transition-colors duration-500`}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {t("hero.description")}
          </motion.p>
        </div>
        <motion.div
          className="lg:w-1/2 flex justify-center lg:justify-end"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <img
            src={HeroPng}
            alt="Learning Center"
            className="max-w-full h-auto drop-shadow-2xl transition-all duration-300 ease-out"
            loading="lazy"
            width={500}
            height={400}
          />
        </motion.div>
      </div>
    </section>
  );
});

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
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-lime-400 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-blob animation-delay-3000"></div>

      <div className="max-w-7xl mx-auto px-4">
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 font-display ${
            isDarkMode ? "text-white" : "text-gray-950"
          } transition-colors duration-500`}
        >
          {t("advantages.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-12">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-[2rem] shadow-xl-strong overflow-hidden cursor-pointer group hover:shadow-2xl-stronger transform hover:-translate-y-2 transition-all duration-300 ease-in-out ${advantage.bgColor} text-white`}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 200, damping: 10 },
              }}
            >
              <div className="absolute inset-0 z-0 opacity-10 bg-grid-pattern"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                  className={`p-5 rounded-full mb-5 shadow-lg-glass bg-white/20 text-white`}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <advantage.icon className="text-4xl sm:text-5xl" />
                </motion.div>
                <motion.h3
                  className={`text-xl sm:text-2xl font-extrabold mb-3 leading-tight font-display drop-shadow-sm text-white`}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  {advantage.title}
                </motion.h3>
                <motion.p
                  className={`text-base sm:text-lg leading-relaxed opacity-90 font-body text-white/90`}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  {advantage.description}
                </motion.p>
              </div>
            </motion.div>
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
        <motion.h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12 font-display ${
            isDarkMode ? "text-white" : "text-gray-950"
          } transition-colors duration-500`}
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {t("teachers.title")}
        </motion.h2>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 sm:gap-6">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              className={`
                relative flex flex-col items-center w-full max-w-[280px] 
                border overflow-hidden group cursor-pointer 
                shadow-lg hover:shadow-xl-stronger 
                transition-all duration-300 ease-in-out 
                ${index === 1 ? accentCardBackgroundClass : cardBackgroundClass} 
                ${index === 1 ? "lg:translate-y-[10%] translate-y-0" : ""} 
                rounded-[2rem]
                sm:min-h-[300px] min-h-[350px]
              `}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{
                y: -4,
                scale: 1.05,
                transition: { type: "spring", stiffness: 300, damping: 10 },
              }}
            >
              <motion.div
                className="relative w-full h-[300px] sm:h-[70%] overflow-hidden flex-shrink-0"
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
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
              </motion.div>
              <motion.div
                className="flex-grow flex flex-col justify-center items-center p-4 text-center"
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <h3
                  className={`text-base sm:text-lg font-semibold mb-1 leading-tight font-heading ${
                    index === 1 ? accentTextClass : commonTextClass
                  }`}
                >
                  {teacher.name}
                </h3>
                <motion.p
                  className={`text-sm font-medium ${
                    index === 1 ? "text-purple-100" : secondaryTextClass
                  }`}
                  variants={itemVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  {teacher.title}
                </motion.p>
              </motion.div>
            </motion.div>
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
        <motion.h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 font-display ${
            isDarkMode ? "text-white" : "text-gray-950"
          } transition-colors duration-500`}
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {t("stats.title")}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`p-6 sm:p-8 rounded-[2rem] glass-effect-sm ${
                isDarkMode
                  ? "bg-white/5 border-gray-700"
                  : "bg-white/70 border-gray-200"
              } shadow-xl-strong flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:scale-[1.02]`}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.div
                className={`mb-4 ${stat.color}`}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <stat.icon className="w-16 h-16 sm:w-20 sm:h-20 mx-auto drop-shadow-lg" />
              </motion.div>
              <motion.p
                className={`text-5xl sm:text-6xl font-extrabold font-display leading-none mb-2 drop-shadow-text-heavy ${stat.color}`}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} separator="" />
                ) : (
                  "0"
                )}
                {stat.suffix}
              </motion.p>
              <motion.p
                className={`text-lg sm:text-xl font-medium font-body ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {stat.label}
              </motion.p>
            </motion.div>
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
        <motion.h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 sm:mb-10 leading-tight font-display drop-shadow-text-light text-white`}
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {t("cta.title")}
        </motion.h2>
        <motion.p
          className={`text-base sm:text-lg max-w-4xl mx-auto mb-8 sm:mb-10 leading-relaxed font-body opacity-90 ${
            isDarkMode ? "text-gray-200" : "text-blue-100"
          }`}
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {t("cta.description")}
        </motion.p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.button
            className={`inline-flex items-center px-8 py-4 rounded-full shadow-button-glow transform transition-all duration-400 ease-[0.22,1,0.36,1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 ${
              isDarkMode
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus-visible:ring-blue-400 focus-visible:ring-offset-gray-900"
                : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus-visible:ring-green-400 focus-visible:ring-offset-gray-50"
            } text-base sm:text-lg font-semibold hover:shadow-button-glow-hover hover:scale-[1.02]`}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{
              scale: 1.025,
              boxShadow: isDarkMode
                ? "0 15px 40px rgba(59,130,246,0.7)"
                : "0 15px 40px rgba(16,185,129,0.6)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {t("cta.buttons.enroll")} <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
         
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
    <div className={`font-sans antialiased min-h-screen ${pageBgClass} transition-colors duration-700 ease-[0.22,1,0.36,1]`}>
      <style>
        {`
          /* Shadows */
          .shadow-2xl-strong { box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
          .shadow-3xl-stronger { box-shadow: 0 15px 30px rgba(0,0,0,0.4); }
          .shadow-xl-strong { box-shadow: 0 8px 16px rgba(0,0,0,0.25); }
          .shadow-lg-glass { box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
          .shadow-button-glow { box-shadow: 0 5px 20px rgba(0,0,0,0.2); }
          .shadow-button-glow-hover { box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
          .drop-shadow-text { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); }
          .drop-shadow-text-light { filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2)); }
          .font-display { font-family: 'Inter', sans-serif; }
          .font-body { font-family: 'Roboto', sans-serif; }
          .font-heading { font-family: 'Inter', sans-serif; }

          /* Blob Animation */
          @keyframes blob {
            0%, 100% {
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
              transform: translate(0px, 0px) scale(1);
            }
            25% {
              border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
              transform: translate(10px, -10px) scale(1.05);
            }
            50% {
              border-radius: 70% 30% 40% 60% / 70% 50% 60% 30%;
              transform: translate(-5px, 15px) scale(0.95);
            }
            75% {
              border-radius: 40% 70% 60% 30% / 30% 70% 40% 60%;
              transform: translate(15px, 5px) scale(1.02);
            }
          }
          .animate-blob {
            animation: blob 10s infinite cubic-bezier(0.6, 0.4, 0.4, 0.6);
          }
          .animation-delay-0 { animation-delay: 0s; }
          .animation-delay-1000 { animation-delay: 1s; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-3000 { animation-delay: 3s; }
          .animation-delay-4000 { animation-delay: 4s; }
          .animation-delay-5000 { animation-delay: 5s; }
          .animation-delay-7000 { animation-delay: 7s; }
          .animation-delay-9000 { animation-delay: 9s; }

          /* Generic pattern for cards in KeyAdvantagesSection */
          .bg-grid-pattern {
            background-image: url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cpath d="M0 0h40v40H0z" fill="rgba(255,255,255,0.05)"/%3E%3Cpath d="M0 0h40v1H0zm0 39h40v1H0zm0 0V0h1v40zm39 0V0h1v40z" stroke="rgba(255,255,255,0.1)"/%3E%3C/g%3E%3C/svg%3E');
          }
        `}
      </style>
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