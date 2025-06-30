import React, { useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView, animate } from "framer-motion";
import { Users, BookOpen, GraduationCap, Award } from "lucide-react";

const AnimatedCounter = ({ initialValue, labelKey, isInView }) => {
  const ref = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    let controls;
    if (isInView) {
      controls = animate(0, initialValue, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) {
            ref.current.textContent = Math.round(v).toLocaleString("ru-RU");
          }
        },
      });
    }
    return () => controls && controls.stop();
  }, [initialValue, isInView]);

  return (
    <div className="text-center">
      <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-primary)]">
        <span ref={ref} />
      </div>
      <p className="mt-2 text-sm sm:text-base md:text-lg font-medium text-[var(--color-muted)]">
        {t(labelKey)}
      </p>
    </div>
  );
};

const StatTile = ({ icon, initialValue, labelKey, isInView, style, index }) => {
  const variants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 14,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      whileHover={{
        scale: 1.04,
        boxShadow: "0 12px 25px rgba(var(--color-primary-rgb), 0.25)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="w-full max-w-[250px] p-5 sm:p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800/10 to-gray-900/10 shadow-xl relative cursor-pointer flex flex-col items-center justify-center text-center backdrop-blur-md"
      style={style}
    >
      <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] mb-4">
        {icon}
      </div>
      <AnimatedCounter initialValue={initialValue} labelKey={labelKey} isInView={isInView} />
    </motion.div>
  );
};

const StatsSection = () => {
  const { t } = useTranslation();

  const stats = useMemo(
    () => [
      { key: "students", initialValue: 1240, icon: <Users size={28} /> },
      { key: "courses", initialValue: 38, icon: <BookOpen size={28} /> },
      { key: "teachers", initialValue: 16, icon: <GraduationCap size={28} /> },
      { key: "certificates", initialValue: 870, icon: <Award size={28} /> },
    ],
    []
  );

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const getZigzagStyle = (i) => {
    const offset = 50;
    if (typeof window !== "undefined" && window.innerWidth < 640) return {}; // отключаем зигзаг на маленьких экранах
    return {
      position: "relative",
      marginTop: i % 2 === 0 ? `-${offset}px` : `${offset}px`,
      zIndex: 10 - i,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 bg-[var(--color-bg)] text-[var(--color-text)] relative overflow-hidden"
    >
     
      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t("stats.title")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-muted)]">
            {t("stats.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-wrap justify-center items-start gap-8 sm:gap-12 md:gap-16"
        >
          {stats.map(({ key, initialValue, icon }, i) => (
            <StatTile
              key={key}
              icon={icon}
              initialValue={initialValue}
              labelKey={`stats.${key}`}
              isInView={isInView}
              style={getZigzagStyle(i)}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
