import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../index.css";
// Importing Lucide-react icons
import {
  Code,
  Book,
  Brain,
  Terminal,
  Server,
  Smartphone,
  Puzzle,
  LayoutGrid,
  DollarSign,
  Clock,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Rocket,
  Cloud,
  Lightbulb,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  ChevronLeft,
  ChevronRight,
  BookOpenText,
} from "lucide-react";

// --- Import CourseModal ---
import CourseModal from "./CourseModal"; // Убедитесь, что путь верный

const courseData = [
  {
    icon: Code,
    key: "foundation_programming",
    category: "foundation",
    color: "#007AFF", // Синий
    price: 790000,
    duration: 4, // Месяца
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
    color: "#5AC8FA", // Светло-голубой
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
    color: "#34C759", // Зеленый
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
    color: "#FF9500", // Оранжевый
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
    color: "#AF52DE", // Фиолетовый
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
    color: "#5856D6", // Индиго
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
    color: "#FF3B30", // Красный
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
    color: "#FFCC00", // Желтый
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
    icon: Book, // Используем Book, так как LayoutGrid был для старого Scratch
    key: "scratch_kids",
    category: "kids",
    color: "#FFCC00", // Желтый
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
    color: "#61DAFB", // Голубой
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
    color: "#FF2D55", // Насыщенный красный
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
    color: "#306998", // Темно-синий
    price: 1090000,
    duration: 7, // 6 месяцев + 1 месяц практики
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
    color: "#4CAF50", // Светло-зеленый
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
    color: "#2196F3", // Ярко-голубой
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
    color: "#FF9800", // Янтарный
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
    color: "#9C27B0", // Фиолетовый
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
  { key: "bootcamp", label: "Bootcamp", icon: Rocket },
  { key: "backend", label: "Backend", icon: Cloud },
  { key: "ai", label: "AI", icon: Lightbulb },
  { key: "mobile", label: "Mobile", icon: Smartphone },
  { key: "kids", label: "Детские", icon: Puzzle },
  { key: "kiddish", label: "Для малышей", icon: BookOpenText },
];

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
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
// Теперь CourseCard принимает onClick пропс
const CourseCard = ({
  Icon,
  course,
  t,
  formatPrice,
  formatDuration,
  onClick,
}) => {
  return (
    <motion.div
      className="course-card rounded-2xl p-6  flex flex-col w-full
                 shadow-lg transition-shadow duration-300 ease-out will-change-transform
                 relative overflow-hidden group
                 bg-[var(--color-bg-alt)] dark:bg-white/5 dark:backdrop-blur-md
                 min-h-[360px] cursor-pointer" // Добавляем cursor-pointer для визуального сигнала
      variants={cardVariants}
      layout
      whileHover={{
        y: -5,
        boxShadow:
          "0 15px 30px rgba(0,0,0,0.1), 0 0 0 1px rgba(var(--color-primary-rgb), 0.1)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      onClick={() => onClick(course)} // Вызываем onClick с текущим курсом
      aria-labelledby={`course-title-${course.key}`}
    >
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="shimmer-line absolute top-0 left-[-100%] w-full h-full
                     bg-gradient-to-r from-transparent via-white/10 to-transparent
                     blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out animate-shimmer"
        />
      </div>
      <div className="relative z-10 flex flex-col items-start w-full h-full">
        <motion.div
          className="mb-5 p-3 rounded-xl border border-[var(--color-border-icon)] bg-[var(--color-bg-icon)]"
          style={{ color: course.color }}
          variants={iconContainerVariants}
          whileHover="hover"
        >
          <Icon size={32} strokeWidth={2} />
        </motion.div>
        <h3
          id={`course-title-${course.key}`}
          className="text-2xl font-bold mb-2 text-[var(--color-heading)] tracking-tight leading-snug group-hover:text-[var(--color-primary)] transition-colors duration-200 ease-out"
        >
          {t(`courses.${course.key}.title`)}
        </h3>
        <p className="text-sm text-[var(--color-muted)] mb-4 min-h-[4rem] leading-relaxed line-clamp-3">
          {t(`courses.${course.key}.desc`)}
        </p>
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
        {/* Удаляем Link из CourseCard, так как теперь он будет в модалке или при прямом переходе */}
        <div
          className="mt-auto self-start inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50"
          // Это становится просто декоративным элементом, или можно убрать, если кнопка "Узнать больше" будет только в модалке
        >
          {t("courses.view_details")} {/* Новый текст для кнопки в карточке */}
          <motion.span variants={linkHoverVariants} className="inline-block">
            <ArrowRight size={16} />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

// --- CoursesPage Main Component ---
const CoursesPage = () => {
  const { t } = useTranslation();

  const minPrice = useMemo(
    () => Math.min(...courseData.map((c) => c.price)),
    []
  );
  const maxPrice = useMemo(
    () => Math.max(...courseData.map((c) => c.price)),
    []
  );
  const minDuration = useMemo(
    () => Math.min(...courseData.map((c) => c.duration)),
    []
  );
  const maxDuration = useMemo(
    () => Math.max(...courseData.map((c) => c.duration)),
    []
  );

  // --- State for Filters, Sorting, and Modal ---
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [durationRange, setDurationRange] = useState([
    minDuration,
    maxDuration,
  ]);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  // Состояния для модального окна
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Обновление диапазонов при изменении данных, если они могут меняться динамически
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
    setDurationRange([minDuration, maxDuration]);
  }, [minPrice, maxPrice, minDuration, maxDuration]);

  // --- Filtering and Sorting Logic ---
  const filteredAndSortedCourses = useMemo(() => {
    let tempCourses = [...courseData];

    if (activeCategory !== "all") {
      tempCourses = tempCourses.filter(
        (course) => course.category === activeCategory
      );
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      tempCourses = tempCourses.filter(
        (course) =>
          t(`courses.${course.key}.title`)
            .toLowerCase()
            .includes(lowerCaseSearchTerm) ||
          t(`courses.${course.key}.desc`)
            .toLowerCase()
            .includes(lowerCaseSearchTerm)
      );
    }

    tempCourses = tempCourses.filter(
      (course) => course.price >= priceRange[0] && course.price <= priceRange[1]
    );

    tempCourses = tempCourses.filter(
      (course) =>
        course.duration >= durationRange[0] &&
        course.duration <= durationRange[1]
    );

    switch (sortBy) {
      case "price_asc":
        tempCourses.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        tempCourses.sort((a, b) => b.price - a.price);
        break;
      case "duration_asc":
        tempCourses.sort((a, b) => a.duration - b.duration);
        break;
      case "duration_desc":
        tempCourses.sort((a, b) => b.duration - a.duration);
        break;
      default:
        tempCourses.sort((a, b) => a.key.localeCompare(b.key));
        break;
    }

    return tempCourses;
  }, [activeCategory, searchTerm, priceRange, durationRange, sortBy, t]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(
    filteredAndSortedCourses.length / coursesPerPage
  );
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredAndSortedCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Handlers for filter/sort changes ---
  const handlePriceRangeChange = useCallback((value) => {
    setPriceRange(value);
    setCurrentPage(1);
  }, []);

  const handleDurationRangeChange = useCallback((value) => {
    setDurationRange(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((categoryKey) => {
    setActiveCategory(categoryKey);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  }, []);

  // --- Modal Handlers ---
  const handleCardClick = useCallback((course) => {
    setSelectedCourse(course);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedCourse(null);
  }, []);

  // --- Formatters ---
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

  return (
    <motion.div
      className="min-h-screen px-4 sm:px-8 lg:px-16 py-12 md:py-20 bg-[var(--color-bg)] text-[var(--color-text)] relative "
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-[var(--color-primary-light)] rounded-full mix-blend-multiply filter blur-3xl animate-blob-one"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[var(--color-secondary-light)] rounded-full mix-blend-multiply filter blur-3xl animate-blob-two"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--color-accent-light)] rounded-full mix-blend-multiply filter blur-3xl animate-blob-three"></div>
      </div>
      <br />
      <br />
      <div className="pt-[100px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={sectionVariants}
        >
          <motion.h1
            variants={titleVariants}
            className="text-4xl md:text-5xl font-extrabold text-[var(--color-heading)] mb-4 tracking-tight"
          >
            {t("coursesPage.title")}
          </motion.h1>
          <motion.p
            variants={subtitleVariants}
            className="text-lg md:text-xl text-[var(--color-muted)] max-w-3xl mx-auto leading-relaxed"
          >
            {t("coursesPage.subtitle")}
          </motion.p>
        </motion.div>

        {/* Основной контент */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- Sidebar Filters (sticky) --- */}
          <div className="w-full lg:w-1/4">
            <motion.div
              className="sticky top-[85px] bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl shadow-xl p-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-[var(--color-heading)] mb-4 flex items-center gap-2">
                <Filter size={24} className="text-[var(--color-primary)]" />{" "}
                {t("coursesPage.filters.title")}
              </h3>

              {/* Search Filter */}
              <div className="filter-group">
                <label
                  htmlFor="search-courses"
                  className="block text-md font-semibold text-[var(--color-text)] mb-2"
                >
                  {t("coursesPage.filters.search")}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search-courses"
                    placeholder={t("coursesPage.filters.search_placeholder")}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-3 pl-10 rounded-md bg-[var(--color-bg-input)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-200"
                  />
                  <Search
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="filter-group">
                <h4 className="text-md font-semibold text-[var(--color-text)] mb-2">
                  {t("coursesPage.filters.category")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const isActive = activeCategory === category.key;
                    const CategoryIcon = category.icon;
                    return (
                      <motion.button
                        key={category.key}
                        onClick={() => handleCategoryChange(category.key)}
                        className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] flex items-center gap-2
                                  ${
                                    isActive
                                      ? "bg-[var(--color-primary)] text-white"
                                      : "bg-[var(--color-bg-input)] text-[var(--color-muted)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]"
                                  }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-pressed={isActive}
                      >
                        <CategoryIcon size={16} />
                        {t(`categories.${category.key}`)}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="filter-group">
                <h4 className="text-md font-semibold text-[var(--color-text)] mb-4">
                  {t("coursesPage.filters.price_range")}
                </h4>
                <Slider
                  range
                  min={minPrice}
                  max={maxPrice}
                  step={10000}
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  trackStyle={[{ backgroundColor: "var(--color-primary)" }]}
                  handleStyle={[
                    {
                      backgroundColor: "var(--color-primary)",
                      borderColor: "var(--color-primary)",
                      opacity: 1,
                    },
                    {
                      backgroundColor: "var(--color-primary)",
                      borderColor: "var(--color-primary)",
                      opacity: 1,
                    },
                  ]}
                  railStyle={{ backgroundColor: "var(--color-border)" }}
                />
                <div className="flex justify-between text-sm text-[var(--color-muted)] mt-2">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>

              {/* Duration Range Filter */}
              <div className="filter-group">
                <h4 className="text-md font-semibold text-[var(--color-text)] mb-4">
                  {t("coursesPage.filters.duration_range")}
                </h4>
                <Slider
                  range
                  min={minDuration}
                  max={maxDuration}
                  step={1}
                  value={durationRange}
                  onChange={handleDurationRangeChange}
                  trackStyle={[{ backgroundColor: "var(--color-primary)" }]}
                  handleStyle={[
                    {
                      backgroundColor: "var(--color-primary)",
                      borderColor: "var(--color-primary)",
                      opacity: 1,
                    },
                    {
                      backgroundColor: "var(--color-primary)",
                      borderColor: "var(--color-primary)",
                      opacity: 1,
                    },
                  ]}
                  railStyle={{ backgroundColor: "var(--color-border)" }}
                />
                <div className="flex justify-between text-sm text-[var(--color-muted)] mt-2">
                  <span>{formatDuration(durationRange[0])}</span>
                  <span>{formatDuration(durationRange[1])}</span>
                </div>
              </div>

              {/* Sort By */}
              <div className="filter-group">
                <label
                  htmlFor="sort-by"
                  className="block text-md font-semibold text-[var(--color-text)] mb-2"
                >
                  {t("coursesPage.filters.sort_by")}
                </label>
                <div className="relative">
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="block appearance-none w-full bg-[var(--color-bg-input)] border border-[var(--color-border)] text-[var(--color-text)] py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all duration-200"
                  >
                    <option value="default">
                      {t("coursesPage.filters.sort_default")}
                    </option>
                    <option value="price_asc">
                      {t("coursesPage.filters.sort_price_asc")}
                    </option>
                    <option value="price_desc">
                      {t("coursesPage.filters.sort_price_desc")}
                    </option>
                    <option value="duration_asc">
                      {t("coursesPage.filters.sort_duration_asc")}
                    </option>
                    <option value="duration_desc">
                      {t("coursesPage.filters.sort_duration_desc")}
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--color-muted)]">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Reset Filters Button */}
              <motion.button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchTerm("");
                  setPriceRange([minPrice, maxPrice]);
                  setDurationRange([minDuration, maxDuration]);
                  setSortBy("default");
                  setCurrentPage(1);
                }}
                className="w-full mt-4 px-6 py-3 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("coursesPage.filters.reset_filters")}
              </motion.button>
            </motion.div>
          </div>

          {/* --- Main Content Area (Courses Grid) --- */}
          <motion.div
            className="flex-1"
            layout
            transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
          >
            <AnimatePresence mode="popLayout">
              {currentCourses.length > 0 ? (
                <motion.div
                  key={
                    activeCategory +
                    searchTerm +
                    sortBy +
                    priceRange.join("-") +
                    durationRange.join("-") +
                    currentPage
                  }
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center"
                >
                  {currentCourses.map((course) => (
                    <CourseCard
                      key={course.key}
                      Icon={course.icon}
                      course={course}
                      t={t}
                      formatPrice={formatPrice}
                      formatDuration={formatDuration}
                      onClick={handleCardClick} // Передаем обработчик клика
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-courses"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="col-span-full text-center text-[var(--color-muted)] text-xl py-20 bg-[var(--color-bg-alt)] rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4"
                >
                  <p className="text-3xl font-bold text-[var(--color-primary)]">
                    {t("coursesPage.no_results.oops")}
                  </p>
                  <p className="max-w-md">
                    {t("coursesPage.no_results.message")}
                  </p>
                  <motion.button
                    onClick={() => {
                      setActiveCategory("all");
                      setSearchTerm("");
                      setPriceRange([minPrice, maxPrice]);
                      setDurationRange([minDuration, maxDuration]);
                      setSortBy("default");
                      setCurrentPage(1);
                    }}
                    className="mt-6 px-6 py-3 rounded-full font-bold text-base
                               bg-[var(--color-primary)] text-white shadow-lg transition-all duration-300 ease-in-out
                               hover:bg-[var(--color-primary-dark)] hover:shadow-xl
                               focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)] focus:ring-opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("coursesPage.no_results.reset_filters_btn")}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination Controls */}
            {totalPages > 1 && currentCourses.length > 0 && (
              <motion.div
                className="flex justify-center items-center gap-4 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full bg-[var(--color-bg-input)] border border-[var(--color-border)] text-[var(--color-text)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-hover)] transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={20} />
                </motion.button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <motion.button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all duration-200
                                ${
                                  currentPage === i + 1
                                    ? "bg-[var(--color-primary)] text-white"
                                    : "bg-[var(--color-bg-input)] text-[var(--color-text)] hover:bg-[var(--color-hover)]"
                                }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {i + 1}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full bg-[var(--color-bg-input)] border border-[var(--color-border)] text-[var(--color-text)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-hover)] transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={20} />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* --- Course Modal --- */}
      {showModal && selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={handleCloseModal}
          formatPrice={formatPrice}
          formatDuration={formatDuration}
        />
      )}
    </motion.div>
  );
};

export default CoursesPage;
