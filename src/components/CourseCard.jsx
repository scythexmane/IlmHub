import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Все еще нужен для ссылки на страницу курса
import { DollarSign, Clock, ArrowRight } from "lucide-react"; // Импортируем только нужные иконки

// Animation Variants (можно перенести сюда, если CourseCard - отдельный файл)
const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const iconContainerVariants = {
  hover: {
    scale: 1.1,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

const linkHoverVariants = {
  hover: { x: 4, transition: { duration: 0.2 } },
};

// --- CourseCard Component ---
const CourseCard = ({
  Icon,
  course,
  t,
  formatPrice,
  formatDuration,
  onCardClick,
}) => {
  return (
    <motion.div
      className="course-card rounded-2xl p-6 flex flex-col w-full cursor-pointer
                 shadow-lg transition-shadow duration-300 ease-out will-change-transform
                 relative overflow-hidden group
                 bg-[var(--color-bg-alt)] dark:bg-white/5 dark:backdrop-blur-md
                 border border-[var(--color-border)] hover:border-[var(--color-primary)]"
      variants={cardVariants}
      layout // This is important for smooth re-ordering
      whileHover={{
        y: -5,
        boxShadow:
          "0 15px 30px rgba(0,0,0,0.1), 0 0 0 1px rgba(var(--color-primary-rgb), 0.1)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      onClick={() => onCardClick(course)} // <-- Клик по всей карточке открывает модалку
      aria-labelledby={`course-title-${course.key}`}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="shimmer-line absolute top-0 left-[-100%] w-full h-full
                     bg-gradient-to-r from-transparent via-white/10 to-transparent
                     blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
        />
      </div>
      <div className="relative z-10 flex flex-col items-start w-full h-full">
        {/* Course Icon */}
        <motion.div
          className="mb-5 p-3 rounded-xl border border-[var(--color-border-icon)] bg-[var(--color-bg-icon)]"
          style={{ color: course.color }}
          variants={iconContainerVariants}
          whileHover="hover"
        >
          <Icon size={32} strokeWidth={2} />
        </motion.div>

        {/* Course Title */}
        <h3
          id={`course-title-${course.key}`}
          className="text-2xl font-bold mb-2 text-[var(--color-heading)] tracking-tight leading-snug group-hover:text-[var(--color-primary)] transition-colors duration-200 ease-out"
        >
          {t(`courses.${course.key}.title`)}
        </h3>

        {/* Course Description */}
        <p className="text-sm text-[var(--color-muted)] mb-4 min-h-[4rem] leading-relaxed line-clamp-3">
          {t(`courses.${course.key}.desc`)}
        </p>

        {/* Price and Duration */}
        <div className="w-full flex flex-col gap-2 text-[var(--color-muted)] my-3 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign
              size={16}
              className="text-[var(--color-accent)] opacity-80"
            />
            <span>
              {t("courses.price_label")}:{" "}
              <strong className="font-semibold text-[var(--color-text)]">
                {formatPrice(course.price)}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock
              size={16}
              className="text-[var(--color-accent)] opacity-80"
            />
            <span>
              {t("courses.duration_label")}:{" "}
              <strong className="font-semibold text-[var(--color-text)]">
                {formatDuration(course.duration)}
              </strong>
            </span>
          </div>
        </div>

        {/* "Learn More" Link - now exclusively for the dedicated course page */}
        <Link
          to={`/courses/`}
          className="mt-auto self-start inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50"
          onClick={(e) => {
            e.stopPropagation(); // предотвратить открытие модалки
            window.scrollTo({ top: 0, behavior: "smooth" }); // принудительная прокрутка вверх
          }}
        >
          {t("courses.learn_more")}
          <motion.span variants={linkHoverVariants} className="inline-block">
            <ArrowRight size={16} />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;
