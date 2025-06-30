import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// --- 1. Данные отзывов ---
const testimonialsData = [
  {
    id: 1,
    nameKey: "testimonial1.name",
    quoteKey: "testimonial1.quote",
    rating: 5,
    avatar: "avatar-1.jpg",
  },
  {
    id: 2,
    nameKey: "testimonial2.name",
    quoteKey: "testimonial2.quote",
    rating: 4.5,
    avatar: "avatar-2.jpg",
  },
  {
    id: 3,
    nameKey: "testimonial3.name",
    quoteKey: "testimonial3.quote",
    rating: 5,
    avatar: "avatar-3.jpg",
  },
  {
    id: 4,
    nameKey: "testimonial4.name",
    quoteKey: "testimonial4.quote",
    rating: 5,
    avatar: "avatar-4.jpg",
  },
  {
    id: 5,
    nameKey: "testimonial5.name",
    quoteKey: "testimonial5.quote",
    rating: 4,
    avatar: "avatar-5.jpg",
  },
  {
    id: 6,
    nameKey: "testimonial6.name",
    quoteKey: "testimonial6.quote",
    rating: 5,
    avatar: "avatar-6.jpg",
  },
  {
    id: 7,
    nameKey: "testimonial7.name",
    quoteKey: "testimonial7.quote",
    rating: 3.5,
    avatar: "avatar-7.jpg",
  },
  {
    id: 8,
    nameKey: "testimonial8.name",
    quoteKey: "testimonial8.quote",
    rating: 4.5,
    avatar: "avatar-8.jpg",
  },
];

// --- 2. Компонент StarRatingDisplay ---
export const StarRatingDisplay = ({ rating, size = "w-5 h-5" }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }, (_, i) => (
        <svg
          key={`full-${i}`}
          className={`${size} text-amber-400`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          className={`${size} text-amber-400`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            {/* Уникальный ID для градиента, чтобы избежать конфликтов при множественном рендере */}
            <linearGradient
              id={`half-star-gradient-${Math.random()
                .toString(36)
                .substring(7)}`}
            >
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#half-star-gradient-${Math.random()
              .toString(36)
              .substring(7)})`}
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"
          />
        </svg>
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <svg
          key={`empty-${i}`}
          className={`${size} text-gray-200 dark:text-gray-600`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// --- 3. Компонент TestimonialCard ---
const TestimonialCard = ({ testimonial }) => {
  const { t } = useTranslation();
  const { nameKey, quoteKey, rating, avatar } = testimonial;

  const avatarSrc = `https://png.pngtree.com/png-vector/20190329/ourmid/pngtree-vector-avatar-icon-png-image_889398.jpg`;

  return (
    <motion.div
      className="flex flex-col p-6 rounded-3xl
                 bg-[--color-bg-card]
                 w-[320px] md:w-[320px] h-64 flex-shrink-0 mx-3 mb-6
                 shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out
                 transform hover:-translate-y-2
                 md:mb-0 relative overflow-hidden group
                 testimonial-card-responsive"
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{
        scale: 1,
        boxShadow: "0 18px 36px -8px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.1, ease: "easeOut" },
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[--color-primary]/5 to-[--color-secondary]/5 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl z-0"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center mb-5 flex-shrink-0">
          <img
            src={avatarSrc}
            alt={t(nameKey)}
            className="w-16 h-16 rounded-full mr-4 object-cover border-4 border-[--color-primary]/30 shadow-md flex-shrink-0"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/150x150/9CA3AF/374151?text=User";
            }}
          />
          <div>
            <h3 className="font-extrabold text-xl text-[--color-text] tracking-tight mb-0.5">
              {t(nameKey)}
            </h3>
            <StarRatingDisplay rating={rating} />
          </div>
        </div>

        <blockquote className="text-[--color-text-light] text-lg leading-relaxed mt-4 italic relative flex-grow overflow-hidden text-ellipsis testimonial-quote">
          <span className="absolute -top-4 -left-4 text-6xl font-serif text-[--color-primary]/20 opacity-70">
            "
          </span>
          "{t(quoteKey)}"
          <span className="absolute -bottom-4 -right-4 text-6xl font-serif text-[--color-primary]/20 opacity-70 rotate-180">
            "
          </span>
        </blockquote>
      </div>
    </motion.div>
  );
};

// --- 4. Компонент RatingSummaryCard ---
const RatingSummaryCard = ({
  averageRating = 4.7,
  totalRatings = 6,
  link = "https://yandex.uz/maps/org/196532200053/reviews/?ll=71.658637%2C41.003807&utm_campaign=v1&utm_medium=rating&utm_source=badge&z=16",
}) => {
  const { t } = useTranslation();

  const handleClick = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      className="flex flex-col items-start p-6 rounded-2xl cursor-pointer w-full max-w-[220px]
                 bg-[--glass-bg-base] border border-[--glass-border-base] backdrop-blur-lg
                 shadow-[--glass-shadow-base] transition-all duration-300 ease-in-out
                 hover:border-[--color-primary]/50 hover:shadow-[--glass-shadow-hover]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <div className="text-4xl font-extrabold text-[--color-text] mb-2 leading-none">
        {averageRating.toFixed(1)}/5.0
      </div>
      <StarRatingDisplay rating={averageRating} size="w-6 h-6" />
      <p className="text-[--color-text-light] text-sm mt-3 font-medium">
        {t("basedOn")}{" "}
        <strong className="text-[--color-text]">{totalRatings}</strong>{" "}
        {t("reviews")}
      </p>
    </motion.div>
  );
};

// --- 5. Инициализация i18n и переводы ---
const resources = {
  en: {
    translation: {
      clientFeedback: "Client Feedback",
      whatTheySay: "What Our Amazing Clients Say About Us",
      basedOn: "Based on",
      reviews: "reviews",
      readAllReviews: "Read All Reviews",
      "testimonial1.name": "Alex Johnson",
      "testimonial1.quote":
        "The best service I've ever experienced! Highly recommend.",
      "testimonial2.name": "Maria Rodriguez",
      "testimonial2.quote":
        "Absolutely transformed our workflow. Incredible product!",
      "testimonial3.name": "David Lee",
      "testimonial3.quote":
        "Exceptional quality and outstanding support. A true game-changer!",
      "testimonial4.name": "Sophia Chen",
      "testimonial4.quote":
        "User-friendly interface and powerful features. Couldn't be happier.",
      "testimonial5.name": "Omar Al-Farsi",
      "testimonial5.quote":
        "Reliable and efficient. It has streamlined our operations significantly.",
      "testimonial6.name": "Emily White",
      "testimonial6.quote":
        "Fantastic team and a product that truly delivers on its promises.",
      "testimonial7.name": "Liam Murphy",
      "testimonial7.quote":
        "Good start, but there's room for improvement in integration options.",
      "testimonial8.name": "Chloe Green",
      "testimonial8.quote":
        "A solid solution that met all our needs. Very impressed with the results.",
    },
  },
  ru: {
    translation: {
      clientFeedback: "Отзывы Клиентов",
      whatTheySay: "Что говорят наши прекрасные клиенты",
      basedOn: "На основе",
      reviews: "отзывов",
      readAllReviews: "Читать все отзывы",
      "testimonial1.name": "Алекс Джонсон",
      "testimonial1.quote":
        "Лучший сервис, который я когда-либо встречал! Настоятельно рекомендую.",
      "testimonial2.name": "Мария Родригес",
      "testimonial2.quote":
        "Полностью изменил наш рабочий процесс. Невероятный продукт!",
      "testimonial3.name": "Дэвид Ли",
      "testimonial3.quote":
        "Исключительное качество и выдающаяся поддержка. Настоящий прорыв!",
      "testimonial4.name": "София Чен",
      "testimonial4.quote":
        "Удобный интерфейс и мощные функции. Очень доволен.",
      "testimonial5.name": "Омар Аль-Фарси",
      "testimonial5.quote":
        "Надежный и эффективный. Значительно упростил наши операции.",
      "testimonial6.name": "Эмили Уайт",
      "testimonial6.quote":
        "Фантастическая команда и продукт, который действительно выполняет свои обещания.",
      "testimonial7.name": "Лиам Мерфи",
      "testimonial7.quote":
        "Хорошее начало, но есть куда расти в плане интеграций.",
      "testimonial8.name": "Хлоя Грин",
      "testimonial8.quote":
        "Надежное решение, которое удовлетворило все наши потребности. Очень впечатлены результатами.",
    },
  },
  uz: {
    translation: {
      clientFeedback: "Mijozlarning Fikri",
      whatTheySay: "Ajoyib mijozlarimiz biz haqimizda nima deydi",
      basedOn: "Asosan",
      reviews: "sharhlar",
      readAllReviews: "Barcha sharhlarni o'qish",
      "testimonial1.name": "Aleks Jonson",
      "testimonial1.quote":
        "Men ko'rgan eng yaxshi xizmat! Juda tavsiya qilaman.",
      "testimonial2.name": "Mariya Rodriges",
      "testimonial2.quote":
        "Bizning ish jarayonimizni butunlay o'zgartirdi. Ajoyib mahsulot!",
      "testimonial3.name": "Devid Li",
      "testimonial3.quote":
        "Ajoyib sifat va a'lo darajadagi qo'llab-quvvatlash. Haqiqiy o'yin o'zgartiruvchi!",
      "testimonial4.name": "Sofiya Chen",
      "testimonial4.quote":
        "Foydalanuvchi uchun qulay interfeys va kuchli xususiyatlar. Juda mamnunman.",
      "testimonial5.name": "Umar Al-Farsi",
      "testimonial5.quote":
        "Ishonchli va samarali. U bizning operatsiyalarimizni sezilarli darajada soddalashtirdi.",
      "testimonial6.name": "Emili Uayt",
      "testimonial6.quote":
        "Ajoyib jamoa va o'z va'dalarini chindan ham bajaradigan mahsulot.",
      "testimonial7.name": "Liyam Merfi",
      "testimonial7.quote":
        "Yaxshi boshlanish, ammo integratsiya variantlarida yaxshilash uchun joy bor.",
      "testimonial8.name": "Chloe Green",
      "testimonial8.quote":
        "Barcha ehtiyojlarimizni qondiradigan mustahkam yechim. Natijalar juda taassurot qoldirdi.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// --- 6. Основной компонент Feedback ---
export function Feedback() {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const storedPreference = localStorage.getItem("theme");
      if (storedPreference) return storedPreference === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "en");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setCurrentLanguage(lng);
    };
    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
  };

  // Дублируем отзывы больше раз для более плавного и длинного "бесконечного" скролла
  const duplicatedTestimonials = [
    ...testimonialsData,
    ...testimonialsData,
    ...testimonialsData,
    ...testimonialsData,
    ...testimonialsData,
  ];

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <>
      {/* Стили Tailwind CSS переменных и анимаций */}
      <style>
        {`
    :root {
      --color-primary: #6366f1; /* Индиго */
      --color-primary-dark: #4f46e5;
      --color-secondary: #0ea5e9; /* Светло-голубой */
      --color-secondary-dark: #0284c7;
      --color-bg: #f8fafc; /* Светлый фон */
      --color-bg-card: #ffffff; /* Фон карточки светлый */
      --color-text: #1e293b; /* Темный текст */
      --color-text-light: #475569; /* Светлый текст */
      --color-border: #e2e8f0; /* Светлая рамка */

      /* Glassmorphism Light Mode */
      --glass-bg-base: rgba(255, 255, 255, 0.7);
      --glass-border-base: rgba(226, 232, 240, 0.9);
      --glass-shadow-base: 0 8px 16px -4px rgba(0, 0, 0, 0.1);
      --glass-shadow-hover: 0 16px 32px -8px rgba(99, 102, 241, 0.25);
    }

    .dark {
      --color-primary: #818cf8; /* Светлый индиго для темной темы */
      --color-primary-dark: #6366f1;
      --color-secondary: #38bdf8; /* Более яркий светло-голубой */
      --color-secondary-dark: #0ea5e9;
      --color-bg: #0f172a; /* Темный фон */
      --color-bg-card: #1e293b; /* Фон карточки темный */
      --color-text: #f1f5f9; /* Светлый текст */
      --color-text-light: #cbd5e1; /* Более светлый текст */
      --color-border: #334155; /* Темная рамка */

      /* Glassmorphism Dark Mode */
      --glass-bg-base: rgba(30, 41, 59, 0.7);
      --glass-border-base: rgba(51, 65, 85, 0.9);
      --glass-shadow-base: 0 8px 16px -4px rgba(0, 0, 0, 0.3);
      --glass-shadow-hover: 0 16px 32px -8px rgba(129, 140, 248, 0.35);
    }

    .testimonial-section-wrapper {
      overflow: hidden;
      width: 100vw;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-left: 0;
      margin-right: 0;
      padding-left: 0;
      padding-right: 0;
      mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
      -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    }

    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-66.666%); }
    }

    .animate-marquee {
      animation: marquee 30s linear infinite;
    }

    .marquee-container:hover .animate-marquee {
      animation-play-state: paused;
    }

    /* Скрываем секцию отзывов на экранах менее 760px */
    @media (max-width: 767px) {
      .testimonial-section-wrapper {
        display: none;
      }
    }

    .testimonial-quote {
      display: -webkit-box;
      -webkit-line-clamp: 5; /* Ограничение до 5 строк по умолчанию */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `}
      </style>

      <div className="min-h-screen bg-[--color-bg] flex flex-col items-center justify-center py-12 px-4 transition-colors duration-500 ease-in-out">
        {/* Заголовок секции */}
        <div className="relative w-full max-w-7xl flex flex-col md:flex-row items-center justify-between mb-12 mt-16 md:mt-0 px-4 md:px-0 z-10">
          <motion.div
            className="text-center md:text-left mb-8 md:mb-0 md:flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-[--color-primary] text-base font-semibold uppercase tracking-widest mb-3">
              {t("clientFeedback")}
            </p>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[--color-text] leading-tight max-w-4xl mx-auto md:mx-0 tracking-tight">
              {t("whatTheySay")}
            </h2>
          </motion.div>

          <motion.div
            className="md:ml-auto md:mr-8 md:flex-shrink-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <RatingSummaryCard />
          </motion.div>
        </div>

        {/* Секция отзывов с бесконечной прокруткой */}
        <div className="testimonial-section-wrapper py-6 md:py-10">
          <div className="flex marquee-container md:flex-nowrap animate-marquee">
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.id}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
