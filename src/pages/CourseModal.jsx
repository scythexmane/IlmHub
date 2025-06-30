import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Импортируем Link
import { useTranslation } from "react-i18next";
import { X, DollarSign, Clock, Star, Users, Award, Info, PhoneCall } from "lucide-react"; // Добавляем PhoneCall для кнопки контактов

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "100vh", opacity: 0, scale: 0.8 },
  visible: {
    y: "0",
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const CourseModal = ({ course, onClose, formatPrice, formatDuration }) => {
  const { t } = useTranslation();

  // Disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!course) return null;

  // Destructure course properties for easier access
  const { icon: CourseIcon, color, rating, students, level, age } = course;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose} // Close modal when clicking outside
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        className="relative bg-[var(--color-bg-alt)] dark:bg-[var(--color-bg-modal-dark)] rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10
                   max-w-full lg:max-w-4xl max-h-[90vh] overflow-y-auto
                   text-[var(--color-text)] flex flex-col will-change-transform
                   border border-[var(--color-border)]"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-muted)] hover:text-[var(--color-heading)] transition-colors"
          aria-label={t("modal.close_button_aria")}
        >
          <X size={28} strokeWidth={2.5} />
        </button>

        {/* Header section with icon, title, and short description */}
        <div className="flex items-start gap-6 mb-6">
          <div
            className="p-4 rounded-xl border border-[var(--color-border-icon)] bg-[var(--color-bg-icon)] flex-shrink-0"
            style={{ color: color }}
          >
            <CourseIcon size={40} strokeWidth={2} />
          </div>
          <div>
            <h2 id="modal-title" className="text-3xl font-bold text-[var(--color-heading)] mb-2">
              {t(`courses.${course.key}.title`)}
            </h2>
            <p id="modal-description" className="text-[var(--color-muted)] text-lg">
              {t(`courses.${course.key}.desc`)}
            </p>
          </div>
        </div>

        {/* Key details: Price, Duration, Rating, Students, Level, Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 text-base mb-8">
          <div className="flex items-center gap-3">
            <DollarSign size={20} className="text-[var(--color-accent)] opacity-80" />
            <span>
              {t("courses.price_label")}:{" "}
              <strong className="text-[var(--color-text)] font-semibold">
                {formatPrice(course.price)}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-[var(--color-accent)] opacity-80" />
            <span>
              {t("courses.duration_label")}:{" "}
              <strong className="text-[var(--color-text)] font-semibold">
                {formatDuration(course.duration)}
              </strong>
            </span>
          </div>
          {rating && (
            <div className="flex items-center gap-3">
              <Star size={20} className="text-yellow-500 opacity-90" />
              <span>
                {t("modal.rating_label")}:{" "}
                <strong className="text-[var(--color-text)] font-semibold">
                  {rating} / 5
                </strong>
              </span>
            </div>
          )}
          {students && (
            <div className="flex items-center gap-3">
              <Users size={20} className="text-blue-500 opacity-90" />
              <span>
                {t("modal.students_label")}:{" "}
                <strong className="text-[var(--color-text)] font-semibold">
                  {students}+
                </strong>
              </span>
            </div>
          )}
          {level && (
            <div className="flex items-center gap-3">
              <Award size={20} className="text-purple-500 opacity-90" />
              <span>
                {t("modal.level_label")}:{" "}
                <strong className="text-[var(--color-text)] font-semibold">
                  {t(`levels.${level}`)}
                </strong>
              </span>
            </div>
          )}
          {age && (
            <div className="flex items-center gap-3">
              <Info size={20} className="text-green-500 opacity-90" />
              <span>
                {t("modal.age_label")}:{" "}
                <strong className="text-[var(--color-text)] font-semibold">
                  {age}
                </strong>
              </span>
            </div>
          )}
        </div>

        {/* Full description */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-[var(--color-heading)] mb-4 border-b pb-2 border-[var(--color-border)]">
            {t("modal.full_description_heading")}
          </h3>
          <p className="text-[var(--color-muted)] leading-relaxed text-lg">
            {t(`courses.${course.key}.full_description`)}
          </p>
        </div>

        {/* Call to action button */}
        <div className="mt-auto flex justify-center">
          <Link
            to="/contacts" // <-- Эта кнопка ведет на страницу контактов
            onClick={onClose} // <-- Закрыть модалку после клика на кнопку
            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg
                       bg-[var(--color-primary)] text-white shadow-lg transition-all duration-300 ease-in-out
                       hover:bg-[var(--color-primary-dark)] dark:hover:bg-[var(--color-primary-dark-dark)]
                       hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)] focus:ring-opacity-50
                       dark:bg-[var(--color-primary-dark)] dark:text-white dark:hover:text-white"
            aria-label={t("modal.contact_us")} // Добавим перевод для новой кнопки
          >
            <PhoneCall size={22} className="mr-2" />
            {t("modal.contact_us")}
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourseModal;   