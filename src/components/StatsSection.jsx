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
      <div className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-primary)]">
        <span ref={ref} />
      </div>
      <p className="mt-2 text-base md:text-lg font-medium text-[var(--color-muted)]">
        {t(labelKey)}
      </p>
    </div>
  );
};

const StatTile = ({ icon, initialValue, labelKey, isInView, style, index }) => {
  const variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 12, delay: index * 0.15 },
    },
  };

  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.05, boxShadow: "0 12px 25px rgba(var(--color-primary-rgb), 0.25)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={style}
      className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800/20 to-gray-900/20 shadow-xl relative cursor-pointer flex flex-col items-center justify-center text-center min-w-[200px] sm:min-w-[220px] lg:min-w-[250px] backdrop-blur-md"
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] mb-4">
        {icon}
      </div>
      <AnimatedCounter initialValue={initialValue} labelKey={labelKey} isInView={isInView} />
    </motion.div>
  );
};

const StatsSection = () => {
  const { t } = useTranslation();

  const stats = useMemo(() => [
    { key: "students", initialValue: 1240, icon: <Users size={32} /> },
    { key: "courses", initialValue: 38, icon: <BookOpen size={32} /> },
    { key: "teachers", initialValue: 16, icon: <GraduationCap size={32} /> },
    { key: "certificates", initialValue: 870, icon: <Award size={32} /> },
  ], []);

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
    const offset = 60;
    return {
      position: "relative",
      marginTop: i % 2 === 0 ? `-${offset}px` : `${offset}px`,
      zIndex: 10 - i,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 px-6 bg-[var(--color-bg)] text-[var(--color-text)] relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10">
        <div className="w-[100vw] h-[50vh] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] opacity-10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t("stats.title")}</h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">{t("stats.subtitle")}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 items-center justify-center relative"
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
