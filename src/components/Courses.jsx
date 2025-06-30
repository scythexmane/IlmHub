import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Добавлен useLocation
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

// Importing CourseCard component
import CourseCard from "./CourseCard.jsx";
// Importing CourseModal component
import CourseModal from "../pages/CourseModal.jsx";

// Importing Lucide-react icons
import {
  Code, Book, Brain, Terminal, Server, Smartphone, Puzzle, LayoutGrid,
  TrendingUp, Sparkles, GraduationCap, Rocket, Cloud, Lightbulb, BookOpenText
} from "lucide-react";

// --- Course Data ---
const courseData = [
  {
    icon: Code,
    key: "foundation_programming",
    category: "foundation",
    color: "#007AFF",
    price: 790000,
    duration: 4,
    rating: 4.8,
    students: 150,
    level: "beginner",
    age: "14+",
    full_description:
      "Этот курс является идеальной отправной точкой для всех, кто мечтает стать программистом, но не знает, с чего начать. Мы покрываем основы логики программирования, алгоритмов и структур данных, используя простые и понятные примеры. Вы научитесь писать чистый и эффективный код, что заложит крепкий фундамент для дальнейшего изучения любого языка программирования. По окончании курса вы будете готовы к более продвинутым темам, таким как веб-разработка или анализ данных.",
  },
  {
    icon: Terminal,
    key: "dotnet_bootcamp",
    category: "bootcamp",
    color: "#5AC8FA",
    price: 2190000,
    duration: 7,
    rating: 4.9,
    students: 85,
    level: "intermediate",
    age: "18+",
    full_description:
      "Интенсивный .NET буткемп, который подготовит вас к карьере разработчика. Глубокое погружение в C#, ASP.NET Core и базы данных. Курс включает практические проекты, работу в команде и подготовку к собеседованиям. Вы научитесь создавать полноценные веб-приложения, работать с фреймворками и паттернами проектирования, а также разворачивать приложения в облаке. Идеально подходит для тех, кто хочет быстро освоить востребованную профессию.",
  },
  {
    icon: Server,
    key: "dotnet_backend",
    category: "backend",
    color: "#34C759",
    price: 1190000,
    duration: 5,
    rating: 4.7,
    students: 120,
    level: "intermediate",
    age: "16+",
    full_description:
      "Создавайте мощные и масштабируемые серверные приложения с использованием .NET. Курс охватывает разработку API, микросервисы, работу с базами данных (SQL, NoSQL) и облачные технологии (Azure/AWS). Вы узнаете, как строить отказоустойчивые системы, обеспечивать безопасность данных и оптимизировать производительность. Этот курс необходим для бэкенд-разработчиков, желающих углубить свои знания в экосистеме Microsoft.",
  },
  {
    icon: Brain,
    key: "ai_bootcamp",
    category: "ai",
    color: "#FF9500",
    price: 1190000,
    duration: 7,
    rating: 4.8,
    students: 60,
    level: "beginner",
    age: "18+",
    full_description:
      "Погрузитесь в мир искусственного интеллекта и машинного обучения. Практический курс по созданию и развертыванию AI-моделей. Вы изучите основы Python для анализа данных, алгоритмы машинного обучения (классификация, регрессия, кластеризация), а также введение в нейронные сети. Курс ориентирован на практическое применение полученных знаний для решения реальных задач.",
  },
  {
    icon: Smartphone,
    key: "flutter_mobile",
    category: "mobile",
    color: "#AF52DE",
    price: 1190000,
    duration: 5,
    rating: 4.6,
    students: 90,
    level: "beginner",
    age: "16+",
    full_description:
      "Научитесь создавать красивые и производительные мобильные приложения для iOS и Android с помощью фреймворка Flutter от Google. Курс охватывает основы языка Dart, виджеты Flutter, управление состоянием, работу с API и публикацию приложений. Вы создадите несколько полнофункциональных приложений, которые будут работать на обеих платформах с единой кодовой базой.",
  },
  {
    icon: Book,
    key: "python_beginner_kids",
    category: "kids",
    color: "#5856D6",
    price: 490000,
    duration: 3,
    rating: 4.7,
    students: 200,
    level: "beginner",
    age: "8-12",
    full_description:
      "Весёлый и интерактивный курс по основам программирования на Python, специально разработанный для детей. Развиваем логику и творчество через решение головоломок, создание простых игр и анимаций. Дети научатся базовым концепциям кодирования в игровой форме, что стимулирует их интерес к IT и развивает навыки критического мышления.",
  },
  {
    icon: Puzzle,
    key: "arduino_robotics_kids",
    category: "kids",
    color: "#FF3B30",
    price: 490000,
    duration: 3,
    rating: 4.9,
    students: 180,
    level: "beginner",
    age: "9-14",
    full_description:
      "Введение в мир электроники и робототехники с помощью платформы Arduino. Дети научатся собирать и программировать простых роботов, управлять датчиками и исполнительными механизмами. Курс развивает инженерное мышление, навыки решения проблем и мелкую моторику, а также знакомит с основами физики и электроники.",
  },
  {
    icon: LayoutGrid,
    key: "scratch_kids_original",
    category: "kids",
    color: "#FFCC00",
    price: 490000,
    duration: 3,
    rating: 4.5,
    students: 250,
    level: "preschool",
    age: "6-9",
    full_description:
      "Визуальное программирование для самых маленьких, развивающее логическое мышление через создание игр и анимаций в среде Scratch. Дети осваивают основы алгоритмов, циклов, условий и переменных без необходимости писать код, просто перетаскивая блоки. Это отличный старт для развития креативности и аналитических способностей.",
  },
  {
    icon: Book,
    key: "scratch_kids",
    category: "kids",
    color: "#FFCC00",
    price: 490000,
    duration: 2,
    rating: 4.6,
    students: 300,
    level: "beginner",
    age: "7-10",
    full_description:
      "Наш курс предназначен для школьников, которые хотят сделать первые шаги в программировании с помощью визуального языка Scratch. Они научатся создавать свои собственные интерактивные истории, игры и анимации, развивая логическое мышление и творческие способности. Курс проходит в игровой форме, что делает обучение увлекательным и доступным для юных программистов.",
  },
  {
    icon: Smartphone,
    key: "react_native_mobile",
    category: "mobile",
    color: "#61DAFB",
    price: 790000,
    duration: 4,
    rating: 4.7,
    students: 75,
    level: "intermediate",
    age: "18+",
    full_description:
      "Изучите React Native для создания кроссплатформенных мобильных приложений. Постройте реальные приложения, которые работают на iOS и Android с единой кодовой базой. Курс охватывает основы React, Redux, навигацию, работу с локальным хранилищем и API. Вы освоите все инструменты, необходимые для создания современных мобильных приложений.",
  },
  {
    icon: Smartphone,
    key: "ios_mobile_swift",
    category: "mobile",
    color: "#FF2D55",
    price: 1190000,
    duration: 5,
    rating: 4.8,
    students: 50,
    level: "intermediate",
    age: "18+",
    full_description:
      "Создавайте нативные приложения для iPhone и iPad, используя Swift — мощный и интуитивно понятный язык программирования от Apple. Курс погружает в основы Swift, UIKit/SwiftUI, жизненный цикл приложения, работу с данными и взаимодействие с аппаратным обеспечением устройства. Вы разработаете несколько полноценных iOS-приложений, готовых к публикации в App Store.",
  },
  {
    icon: Server,
    key: "python_backend",
    category: "backend",
    color: "#306998",
    price: 1090000,
    duration: 7,
    rating: 4.7,
    students: 110,
    level: "intermediate",
    age: "16+",
    full_description:
      "Наш курс Python Backend — отличный выбор для тех, кто хочет освоить разработку серверной части веб-приложений с использованием Python, Django и Flask. Вы изучите RESTful API, базы данных (PostgreSQL), аутентификацию, авторизацию и развертывание приложений. Курс включает множество практических заданий и реальных проектов, которые помогут вам стать квалифицированным бэкенд-разработчиком.",
  },
  {
    icon: BookOpenText,
    key: "phonics_level1",
    category: "kiddish",
    color: "#4CAF50",
    price: 300000,
    duration: 3,
    rating: 4.5,
    students: 80,
    level: "preschool",
    age: "4-6",
    full_description:
      "Phonics Level 1 — это начальный курс, разработанный специально для детей дошкольного и младшего школьного возраста, чтобы заложить прочный фундамент в чтении и произношении английских слов. Мы используем интерактивные игры, песни и увлекательные задания, чтобы сделать процесс обучения веселым и эффективным. Дети научатся распознавать основные звуки английского языка, сопоставлять их с буквами и читать простые слова, что является ключевым шагом к свободному чтению.",
  },
  {
    icon: BookOpenText,
    key: "phonics_level2",
    category: "kiddish",
    color: "#2196F3",
    price: 300000,
    duration: 3,
    rating: 4.6,
    students: 70,
    level: "preschool",
    age: "5-7",
    full_description:
      "Phonics Level 2 продолжает развивать навыки, полученные в Phonics Level 1, углубляя понимание звуков и буквенных сочетаний. На этом этапе дети учатся читать более сложные слова, осваивают диграфы и дифтонги. Курс включает больше групповых игр и упражнений на чтение коротких предложений, что способствует формированию уверенности в своих навыках чтения.",
  },
  {
    icon: BookOpenText,
    key: "phonics_level3",
    category: "kiddish",
    color: "#FF9800",
    price: 300000,
    duration: 3,
    rating: 4.7,
    students: 65,
    level: "preschool",
    age: "6-8",
    full_description:
      "Phonics Level 3 углубляет знания учеников в области фонетики и помогает им справляться с более сложными правилами чтения и произношения. В этом курсе рассматриваются долгие гласные, правила слогоделения и чтение слов с несколькими слогами. Ученики начинают читать небольшие рассказы и стихотворения, что улучшает их понимание текста и беглость чтения.",
  },
  {
    icon: BookOpenText,
    key: "phonics_level4",
    category: "kiddish",
    color: "#9C27B0",
    price: 300000,
    duration: 3,
    rating: 4.8,
    students: 60,
    level: "preschool",
    age: "7-9",
    full_description:
      "Phonics Level 4 является завершающим этапом в программе Phonics, укрепляя все полученные знания и навыки для свободного чтения. Дети изучают исключения из правил, осваивают чтение сложных текстов и работают над интонацией. Курс направлен на развитие самостоятельного чтения и подготовки к более сложным учебным материалам в будущем.",
  },
];

// --- Categories for the filter with icons ---
const categories = [
  { key: "all", label: "Все", icon: Sparkles },
  { key: "foundation", label: "Foundation", icon: GraduationCap },
  { key: "bootcamp", label: "Буткемп", icon: Rocket },
  { key: "backend", label: "Backend", icon: Cloud },
  { key: "ai", label: "ИИ", icon: Lightbulb },
  { key: "mobile", label: "Мобильная", icon: Smartphone },
  { key: "kids", label: "Детские", icon: Puzzle },
  { key: "kiddish", label: "Для малышей", icon: BookOpenText },
];

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// --- CoursesPreview Main Component ---
const CoursesPreview = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const controls = useAnimation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const navigate = useNavigate(); // Используем useNavigate внутри компонента
  const location = useLocation(); // Используем useLocation внутри компонента

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const filteredCourses =
    activeCategory === "all"
      ? courseData
      : courseData.filter((course) => course.category === activeCategory);

  const formatPrice = useCallback(
    (price) =>
      new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "UZS",
      }).format(price),
    []
  );

  const formatDuration = useCallback(
    (duration) => {
      if (duration === 1) return `${duration} ${t("courses.month_one")}`;
      if (duration > 1 && duration < 5)
        return `${duration} ${t("courses.month_few")}`;
      return `${duration} ${t("courses.month_many")}`;
    },
    [t]
  );

  const handleCardClick = useCallback((course) => {
    setSelectedCourse(course);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCourse(null);
  }, []);

  // Обновленная функция для кнопки "Все курсы" - ПЕРЕМЕЩЕНА ВНУТРЬ КОМПОНЕНТА
  const handleViewAllCoursesClick = useCallback(() => {
    if (location.pathname !== "/courses") {
      navigate("/courses");
      // Небольшая задержка, чтобы навигация успела завершиться,
      // прежде чем мы пытаемся прокрутить окно.
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      // Если мы уже на странице /courses, просто прокручиваем вверх
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Также можно сбросить категорию на "все", если это имеет смысл для страницы курсов
    // setActiveCategory('all'); // Раскомментировать, если хотите сбрасывать фильтр
  }, [navigate, location.pathname]);


  return (
    <motion.section
      id="courses"
      ref={ref}
      className="px-4 sm:px-8 lg:px-16 py-20 bg-[var(--color-bg)] text-[var(--color-text)] relative overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-[var(--color-primary-light)] rounded-full mix-blend-multiply filter blur-3xl animate-blob-one"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[var(--color-secondary-light)] rounded-full mix-blend-multiply filter blur-3xl animate-blob-two"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--color-accent-light)] rounded-full mix-blend-multiply filter blur-3xl animate-blob-three"></div>
      </div>

      <div className="text-center mb-16 relative z-10">
        <motion.h2
          variants={titleVariants}
          className="text-4xl md:text-5xl font-extrabold text-[var(--color-heading)] mb-4 tracking-tight"
        >
          {t("courses.title")}
        </motion.h2>
        <motion.p
          variants={subtitleVariants}
          className="text-lg md:text-xl text-[var(--color-muted)] max-w-3xl mx-auto leading-relaxed"
        >
          {t("courses.subtitle")}
        </motion.p>
      </div>

      {/* Improved Category Filter */}
      <motion.div
        variants={titleVariants}
        className="flex justify-center mb-16 relative z-10"
      >
        <div className="flex flex-row flex-wrap justify-center items-center gap-2 p-2 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl shadow-inner">
          {categories.map((category) => {
            const isActive = activeCategory === category.key;
            const CategoryIcon = category.icon;
            return (
              <motion.button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className="relative px-4 py-2 text-sm sm:text-base font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                style={{
                  color: isActive
                    ? "var(--color-button-text-active)"
                    : "var(--color-muted)",
                }}
                whileHover={{ color: "var(--color-text)" }}
                aria-pressed={isActive}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <CategoryIcon size={18} />
                  {t(`categories.${category.key}`)}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-[var(--color-primary)] rounded-lg z-0"
                    layoutId="active-category-pill"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 35,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Improved Course Grid */}
      <motion.div
        layout
        transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
        className="relative z-10 max-w-400 m-auto"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center"
          >
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course.key}
                  Icon={course.icon}
                  course={course}
                  t={t}
                  formatPrice={formatPrice}
                  formatDuration={formatDuration}
                  onCardClick={handleCardClick}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="col-span-full text-center text-[var(--color-muted)] text-xl py-10"
              >
                {t("courses.no_courses_found", "Курсы не найдены.")}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* "View All Courses" Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center mt-20 relative z-10"
      >
        <button
          onClick={handleViewAllCoursesClick}
          className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg
                     bg-[var(--color-primary)] text-white shadow-lg transition-all duration-300 ease-in-out
                     hover:bg-[var(--color-primary-dark)] dark:hover:bg-[var(--color-primary-dark-dark)]
                     hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)] focus:ring-opacity-50
                     dark:bg-[var(--color-primary-dark)] dark:text-white dark:hover:text-white"
          aria-label={t("courses.view_all")}
        >
          {t("courses.view_all")}
          <span className="ml-2 transition-transform group-hover:translate-x-1">
            <TrendingUp size={22} />
          </span>
        </button>
      </motion.div>

      <AnimatePresence>
        {selectedCourse && (
          <CourseModal
            course={selectedCourse}
            onClose={handleCloseModal}
            formatPrice={formatPrice}
            formatDuration={formatDuration}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default CoursesPreview;