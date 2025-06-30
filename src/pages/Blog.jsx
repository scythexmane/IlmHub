// Gallery.jsx

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import { HiOutlineVolumeUp, HiOutlineVolumeOff } from "react-icons/hi";

// ИМПОРТИРУЕМ ХУК useTheme ИЗ НАШЕГО КОНТЕКСТА
import { useTheme } from '../ThemeContext';

// --- Начало данных для галереи (без изменений) ---
const mediaData = [
  {
    id: "1",
    type: "image",
    src: "https://avatars.mds.yandex.net/get-altay/13061180/2a0000018ee682dc9a08a4a3be1b9fd218b7/XXXL",
    thumbnail: "/src/assets/images/screen_img_1_thumb.jpg",
    aspectRatio: "4/3",
  },
  {
    id: "2",
    type: "video",
    src: "https://scontent-ams2-1.cdninstagram.com/o1/v/t16/f2/m86/AQOxKEu1uPewGnTPQxIJVdC0yETwLGlBXAlDDry0FnhJoJliW-knhyZv0pqJ4_wbfeBfJx9ypYDHLacgg1lcUwP8xzFTpsq3FN46g3Q.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzIuNzIwLmJhc2VsaW5lIn0&_nc_cat=105&vs=1912436529510619_352456777&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9EMDQ0QkM3QkI4QTU2RjA2OUZENjhGM0EzNUUwQTU4OV92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HT3N0ZlI1ellpdklHNllEQUhiU3d5Yko1aEJRYmtZTEFBQUYVAgLIARIAKAAYABsAFQAAJs7G2fDv9YtAFQIoAkMzLBdAOyp%2B%2Bdsi0RgSZGFzaF9iYXNlbGluZV8xX3YxEQB1%2Fgdl5p0BAA%3D%3D&_nc_rid=c758847b6f&ccb=9-4&oh=00_AfN1yVgGv9drsDI3KalvwG9OzddmkxcH249L6JBY4IxW0Q&oe=6864930D&_nc_sid=10d13b",
    thumbnail: "/src/assets/images/screen_video_1_thumb.jpg",
    aspectRatio: "9/16",
  },
  {
    id: "3",
    type: "image",
    src: "https://avatars.mds.yandex.net/get-altay/10878699/2a000001907399487aff9ace3836e893c658/XXXL",
    thumbnail: "/src/assets/images/screen_img_2_thumb.jpg",
    aspectRatio: "4/3",
  },
  {
    id: "4",
    type: "video",
    src: "https://scontent-ams2-1.cdninstagram.com/o1/v/t16/f2/m86/AQNvLpg6k5oZ3ZzYCrSSaUUdjgcxhABUdNU-CqzrkvQtHEiuKmLSPYtnxeCNijUKl_jAdCAu5zpFbG7zK1PTEO0YQ0mjllmJrgtBZFo.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzIuMzYwLmJhc2VsaW5lIn0&_nc_cat=108&vs=624351543793062_3006855563&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC81MjQ3NTA5MzdDMjY1NzgwOTRFNDA3MEJEQTA0ODE4OF92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HTkx3YkJ6ZUtaWDhTaFlDQUtKLV9VXzB6aEpfYnFfRUFBQUYVAgLIARIAKAAYABsAFQAAJpL7w6iqyLg%2FFQIoAkMzLBdATZmZmZmZmhgSZGFzaF9iYXNlbGluZV8zX3YxEQB1%2Fgdl5p0BAA%3D%3D&_nc_rid=8742351844&ccb=9-4&oh=00_AfOwyNmkivVW3pLNiU5ht7WvL5GLMqfWzfWkdHd3OziKkw&oe=68647CF9&_nc_sid=10d13b",
    thumbnail: "/src/assets/images/screen_video_2_thumb.jpg",
    aspectRatio: "9/16",
  },
  {
    id: "5",
    type: "image",
    src: "https://avatars.mds.yandex.net/get-altay/12865251/2a0000018ee682f8be0b8ec7e54c1ad4e33e/XXXL",
    thumbnail: "/src/assets/images/screen_img_3_thumb.jpg",
    aspectRatio: "9/16",
  },
  {
    id: "6",
    type: "image",
    src: "https://avatars.mds.yandex.net/get-altay/4716261/2a0000018e13848c77cc15d996642591586f/XXXL",
    thumbnail: "/src/assets/images/screen_img_6_thumb.jpg",
    aspectRatio: "4/3",
  },
  {
    id: "7",
    type: "video",
    src: "https://scontent-ams2-1.cdninstagram.com/o1/v/t16/f2/m86/AQPe8C7wAaET0R8m3u16k4whdv6QFMSQHQF09YuGUShSduW_J0B7l9OdB7I1084t4ptaTo_NSp9acPGOmnb6uF1UB59NcYqaWL65yvA.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzIuNzIwLmJhc2VsaW5lIn0&_nc_cat=105&vs=1525934631702506_2024537453&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC8wMzQyRDA5N0JFNEM4N0U1NDY5M0M5NENDMzhEQjNCQl92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HR19FWFI0Tk5ucEsxUGNFQUI2dF9wUXQ1MDVyYnFfRUFBQUYVAgLIARIAKAAYABsAFQAAJpTd%2BLXMhKlAFQIoAkMzLBdARrul41P3zxgSZGFzaF9iYXNlbGluZV8xX3YxEQB1%2Fgdl5p0BAA%3D%3D&_nc_rid=123e376e5f&ccb=9-4&oh=00_AfP9XpQhUo_yXBhW5ocn-aj2L3Oa7H2aeHBmOKqVQaOfAA&oe=686493AC&_nc_sid=10d13b",
    thumbnail: "/src/assets/images/screen_img_4_thumb.jpg",
    aspectRatio: "9/16",
  },
  {
    id: "8",
    type: "image",
    src: "https://avatars.mds.yandex.net/get-altay/10661403/2a000001907399637fd57394aa1734a38e64/XXXL",
    thumbnail: "/src/assets/images/screen_img_5_thumb.jpg",
    aspectRatio: "4/3",
  },
];
// --- Конец данных для галереи ---

/**
 * GalleryItem component displays an individual media item (image or video) in the gallery.
 * It uses Framer Motion for hover effects. Lazy loading is removed.
 */
const GalleryItem = ({ media, onClick }) => {
  const videoRef = useRef(null);
  const { isDarkMode } = useTheme(); // Получаем isDarkMode из контекста

  const isVideo = media.type === "video";

  const handleMouseEnter = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch((e) => console.error("Video autoplay on hover failed:", e));
    }
  };

  const handleMouseLeave = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video to start
    }
  };

  const aspectRatioClass = media.aspectRatio === "9/16" ? "pb-[177.77%]" : "pb-[75%]";
  // Динамический класс для фона элементов галереи
  // В темной теме border-transparent, в светлой - border-gray-300
  const itemBorderClass = isDarkMode ? "border-transparent" : "border-gray-300";

  return (
    <motion.div
      // Применяем border-class и transition-colors для плавного изменения цвета рамки
      className={`relative cursor-pointer rounded-lg overflow-hidden group border ${itemBorderClass} transition-colors duration-300`}
      whileHover={{
        scale: 1.03,
        // Тени для hover, можно настроить для разных тем, но сейчас одинаковые
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`w-full h-0 relative bg-gray-900 ${aspectRatioClass}`}>
        {isVideo ? (
          <>
            <video
              ref={videoRef}
              src={media.src}
              poster={media.thumbnail}
              controls={false}
              muted // Всегда muted для автовоспроизведения на hover
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </>
        ) : (
          <img
            src={media.src}
            alt="Gallery item"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
    </motion.div>
  );
};

/**
 * MediaModal component displays a media item in a full-screen modal.
 * It includes navigation, custom video controls, and animations with Framer Motion.
 */
const MediaModal = ({ media, onClose, onNavigate }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false); // Состояние для отслеживания muted
  const [isPlaying, setIsPlaying] = useState(false);
  const { isDarkMode } = useTheme(); // Получаем isDarkMode из контекста

  // Эффект для управления видео при открытии модала или смене медиа
  useEffect(() => {
    if (media && media.type === "video" && videoRef.current) {
      // Устанавливаем muted статус видеоплеера на основе состояния isMuted
      videoRef.current.muted = isMuted;

      // Пытаемся воспроизвести видео
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          // Автовоспроизведение может быть заблокировано браузером
          console.warn("Video autoplay failed:", error);
          setIsPlaying(false);
        });
    }

    // Cleanup-функция при закрытии модала или смене медиа
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        // ВАЖНО: УДАЛЕНО: videoRef.current.currentTime = 0;
        // Это было причиной перезапуска видео при переключении между медиа.
        // Если вы хотите, чтобы видео всегда начиналось с начала при ЛЮБОМ закрытии/открытии,
        // вы можете вернуть эту строку, но это не соответствует "не начинается заново".
      }
      setIsPlaying(false);
      // isMuted не сбрасываем, чтобы состояние mute сохранялось между открытиями/навигацией,
      // пока модал полностью не закрыт.
    };
  }, [media, isMuted]); // Зависит от media (для смены видео) и isMuted (для применения состояния)

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted; // Переключаем muted свойство видео элемента
      setIsMuted(videoRef.current.muted); // Обновляем состояние isMuted
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 50,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  // Цвета для кнопок модального окна в зависимости от темы
  // Используем более нейтральный темный фон для кнопок модала, чтобы они были видны на любом фоне медиа
  const modalButtonBgClass = "bg-black/50 hover:bg-black/70";
  const modalButtonTextColorClass = "text-white";
  const modalContentBgClass = isDarkMode ? "bg-gray-800" : "bg-white"; // Фон самого окна модала

  return (
    <AnimatePresence>
      {media && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" // Фон модала всегда темный для контраста с содержимым
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className={`relative w-full h-full rounded-lg shadow-2xl flex flex-col items-center justify-center ${
              media.aspectRatio === "9/16" ? "max-w-screen-md" : "max-w-screen-xl"
            } ${modalContentBgClass} transition-colors duration-300`}
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 z-10 p-2 rounded-full ${modalButtonBgClass} ${modalButtonTextColorClass} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            {/* Navigation buttons */}
            <button
              onClick={() => onNavigate("prev")}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full ${modalButtonBgClass} ${modalButtonTextColorClass} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-label="Previous media"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <button
              onClick={() => onNavigate("next")}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full ${modalButtonBgClass} ${modalButtonTextColorClass} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-label="Next media"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>

            {/* Media content (Image or Video) */}
            <div className="relative flex-grow w-full h-full flex items-center justify-center p-2 sm:p-4">
              {media.type === "image" ? (
                <img
                  src={media.src}
                  alt="Full-size media"
                  className="w-auto h-full object-contain rounded-md"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src={media.src}
                    controls={false} // Отключаем нативные контролы
                    className="w-auto h-full object-contain rounded-md"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    loop // Видео зацикливается
                    // muted={isMuted} // Muted состояние управляется в useEffect и handleToggleMute
                  />
                  {/* Custom video controls */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 p-2 bg-black/50 rounded-lg">
                    <button onClick={handleTogglePlay} className="text-white p-2">
                      {isPlaying ? (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                    <button onClick={handleToggleMute} className="text-white p-2">
                      {isMuted ? (
                        <HiOutlineVolumeOff className="w-6 h-6" />
                      ) : (
                        <HiOutlineVolumeUp className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Основной компонент Галереи ---

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(0);
  const { isDarkMode } = useTheme(); // Получаем isDarkMode из контекста

  const handleNavigate = useCallback((direction) => {
    setMediaIndex((prevIndex) => {
      let newIndex = prevIndex;
      if (direction === "next") {
        newIndex = (prevIndex + 1) % mediaData.length;
      } else if (direction === "prev") {
        newIndex = (prevIndex - 1 + mediaData.length) % mediaData.length;
      }
      setSelectedMedia(mediaData[newIndex]);
      return newIndex;
    });
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedMedia) {
        if (event.key === "Escape") {
          setSelectedMedia(null);
        } else if (event.key === "ArrowRight") {
          handleNavigate("next");
        } else if (event.key === "ArrowLeft") {
          handleNavigate("prev");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMedia, handleNavigate]);

  const handleMediaClick = useCallback((media, index) => {
    setSelectedMedia(media);
    setMediaIndex(index);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMedia(null);
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  // Определяем основной класс для фона и текста всей страницы
  const pageBgClass = isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900";

  return (
    <div className={`min-h-screen font-sans ${pageBgClass} transition-colors duration-300`}>
      {/* Здесь должна быть ваша существующая навигационная панель */}
      {/* Ваша глобальная кнопка смены темы будет использовать toggleTheme из ThemeContext */}

      <main className="pt-4 pb-8 px-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {mediaData.map((media, index) => (
            <GalleryItem
              key={media.id}
              media={media}
              onClick={() => handleMediaClick(media, index)}
            />
          ))}
        </Masonry>
      </main>

      <MediaModal
        media={selectedMedia}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
      />

      
    </div>
  );
};

export default Gallery;