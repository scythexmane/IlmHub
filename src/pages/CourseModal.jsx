import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  X,
  DollarSign,
  Clock,
  Star,
  Users,
  Award,
  Info,
  PhoneCall,
} from "lucide-react";
import '../index.css';
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "100vh", opacity: 0, scale: 0.9 },
  visible: {
    y: "0",
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const CourseModal = ({ course, onClose, formatPrice, formatDuration }) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!course) return null;

  const { icon: CourseIcon, color, rating, students, level, age } = course;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm" />

      <motion.div
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="relative w-full max-w-[95vw] sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto
                   rounded-2xl bg-white text-gray-900 dark:bg-neutral-900 dark:text-white
                   shadow-2xl p-5 sm:p-8 md:p-10 border border-gray-200 dark:border-white/10"
      >
        {/* Закрыть */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white transition"
          aria-label={t("modal.close_button_aria")}
        >
          <X size={28} strokeWidth={2.5} />
        </button>

        {/* Заголовок */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <div
            className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-neutral-800 flex-shrink-0"
            style={{ color: color }}
          >
            <CourseIcon size={40} strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h2
              id="modal-title"
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2"
            >
              {t(`courses.${course.key}.title`)}
            </h2>
            <p
              id="modal-description"
              className="text-sm sm:text-base text-gray-700 dark:text-gray-300"
            >
              {t(`courses.${course.key}.desc`)}
            </p>
          </div>
        </div>

        {/* Инфо */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm sm:text-base mb-8">
          <InfoItem icon={<DollarSign size={20} />} label={t("courses.price_label")} value={formatPrice(course.price)} />
          <InfoItem icon={<Clock size={20} />} label={t("courses.duration_label")} value={formatDuration(course.duration)} />
          {rating && <InfoItem icon={<Star size={20} className="text-yellow-500" />} label={t("modal.rating_label")} value={`${rating} / 5`} />}
          {students && <InfoItem icon={<Users size={20} className="text-blue-500" />} label={t("modal.students_label")} value={`${students}+`} />}
          {level && <InfoItem icon={<Award size={20} className="text-purple-500" />} label={t("modal.level_label")} value={t(`levels.${level}`)} />}
          {age && <InfoItem icon={<Info size={20} className="text-green-500" />} label={t("modal.age_label")} value={age} />}
        </div>

        {/* Полное описание */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-3 border-b pb-2 border-gray-200 dark:border-white/10">
            {t("modal.full_description_heading")}
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
            {t(`courses.${course.key}.full_description`)}
          </p>
        </div>

        {/* Кнопка */}
        <div className="mt-auto flex justify-center">
          <Link
            to="/contacts"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-base
                       bg-[var(--color-primary)] text-white shadow-lg hover:shadow-xl transition
                       hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)] focus:ring-opacity-50"
          >
            <PhoneCall size={20} />
            {t("modal.contact_us")}
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Вспомогательный компонент для отображения инфо-блока
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="opacity-80">{icon}</div>
    <span>
      {label}:{" "}
      <strong className="font-semibold text-gray-900 dark:text-white">{value}</strong>
    </span>
  </div>
);

export default CourseModal;
