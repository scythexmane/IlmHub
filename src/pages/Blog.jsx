// Gallery.jsx

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import { HiOutlineVolumeUp, HiOutlineVolumeOff } from "react-icons/hi";

// ИМПОРТИРУЕМ ХУК useTheme ИЗ НАШЕГО КОНТЕКСТА
import { useTheme } from '../ThemeContext';

// --- ИМПОРТ ЛОКАЛЬНЫХ ВИДЕОФАЙЛОВ ---
// Убедитесь, что пути здесь правильные относительно вашего файла Gallery.jsx.
// Например, если Gallery.jsx находится в src/components/, а ваши видео в src/assets/videos/,
// то путь будет '../../assets/videos/v1.mp4'
import video1 from '../assets/v1.mp4';
import video2 from '../assets/v2.mp4';
import video3 from '../assets/v3.mp4';
import video4 from '../assets/v4.mp4';
import video5 from '../assets/v5.mp4';
import video6 from '../assets/v6.mp4';
import video7 from '../assets/v7.mp4';
import video8 from '../assets/v8.mp4';

// --- Начальные данные для галереи (без thumbnail) ---
const initialMediaData = [
  { id: "img-1", type: "image", src: "https://avatars.mds.yandex.net/get-altay/10878699/2a000001907399487aff9ace3836e893c658/XXXL", aspectRatio: "4/3" },
  { id: "vid-2", type: "video", src: video2, aspectRatio: "9/16" },
  { id: "img-2", type: "image", src: "https://avatars.mds.yandex.net/get-vh/4439705/2a0000018ee6730b592c61f457f88b1ff8ee/smart_crop_500x500", aspectRatio: "1/1" },
  { id: "vid-3", type: "video", src: video3, aspectRatio: "9/16" },
  { id: "img-3", type: "image", src: "https://avatars.mds.yandex.net/get-altay/4716261/2a0000018e13848c77cc15d996642591586f/XXXL", aspectRatio: "3/2" },
  { id: "vid-4", type: "video", src: video4, aspectRatio: "9/16" },
  { id: "img-4", type: "image", src: "https://avatars.mds.yandex.net/get-altay/13229524/2a0000018ee682d3f3e69f971e6c62a756d9/XXXL", aspectRatio: "2/3" },
  { id: "vid-5", type: "video", src: video5, aspectRatio: "9/16" },
  { id: "img-5", type: "image", src: "https://avatars.mds.yandex.net/get-altay/13061180/2a0000018ee682dc9a08a4a3be1b9fd218b7/XXXL", aspectRatio: "16/9" },
  { id: "vid-6", type: "video", src: video6, aspectRatio: "9/16" },
  { id: "img-6", type: "image", src: "https://avatars.mds.yandex.net/get-altay/12865251/2a0000018ee682f8be0b8ec7e54c1ad4e33e/XXXL", aspectRatio: "4/3" },
  { id: "vid-7", type: "video", src: video7, aspectRatio: "9/16" },
  { id: "img-7", type: "image", src: "https://avatars.mds.yandex.net/get-vh/5634303/2a0000018ee68d32cd98644720e867208b0d/smart_crop_500x500", aspectRatio: "1/1" },
  { id: "vid-8", type: "video", src: video8, aspectRatio: "9/16" },
    { id: "img-7", type: "image", src: "https://avatars.mds.yandex.net/get-vh/5634303/2a0000018ee68d32cd98644720e867208b0d/smart_crop_500x500", aspectRatio: "1/1" },
  { id: "vid-8", type: "video", src: video8, aspectRatio: "9/16" },
];

// Функция для случайного перемешивания массива (алгоритм Фишера-Йетса)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Обмен элементов
  }
  return array;
}

/**
 * GalleryItem component displays an individual media item (image or video) in the gallery.
 * It uses Framer Motion for hover effects.
 */
const GalleryItem = ({ media, onClick }) => {
  const videoRef = useRef(null);
  const { isDarkMode } = useTheme();

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

  const getAspectRatioClass = (ratio) => {
    switch (ratio) {
      case "9/16": return "pb-[177.77%]"; // Portrait video
      case "4/3": return "pb-[75%]";
      case "16/9": return "pb-[56.25%]";
      case "3/2": return "pb-[66.66%]";
      case "2/3": return "pb-[150%]";
      case "1/1": return "pb-[100%]";
      default: return "pb-[75%]";
    }
  };
  const aspectRatioClass = getAspectRatioClass(media.aspectRatio);

  const itemBorderClass = isDarkMode ? "border-transparent" : "border-gray-300";

  return (
    <motion.div
      className={`relative cursor-pointer rounded-lg overflow-hidden group border ${itemBorderClass} transition-colors duration-300`}
      whileHover={{
        scale: 1.03,
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
              controls={false}
              muted
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
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (media && media.type === "video" && videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn("Video autoplay failed:", error);
          setIsPlaying(false);
        });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    };
  }, [media, isMuted]);

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
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
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

  const modalButtonBgClass = "bg-black/50 hover:bg-black/70";
  const modalButtonTextColorClass = "text-white";
  const modalContentBgClass = isDarkMode ? "bg-gray-800" : "bg-white";

  return (
    <AnimatePresence>
      {media && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className={`relative w-full h-full rounded-lg shadow-2xl flex flex-col items-center justify-center ${
              media.aspectRatio === "9/16"
                ? "max-w-screen-sm"
                : media.aspectRatio === "16/9"
                ? "max-w-screen-xl"
                : "max-w-screen-lg"
            } ${modalContentBgClass} transition-colors duration-300`}
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
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
                    controls={false}
                    className="w-auto h-full object-contain rounded-md"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    loop
                  />
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
  const { isDarkMode } = useTheme();
  // Состояние для хранения перемешанных данных
  const [shuffledMediaData, setShuffledMediaData] = useState([]);

  useEffect(() => {
    // Перемешиваем данные при монтировании компонента
    // Используем spread-оператор [...initialMediaData] для создания копии массива,
    // чтобы не изменять исходный массив initialMediaData
    setShuffledMediaData(shuffleArray([...initialMediaData]));
  }, []); // Пустой массив зависимостей означает, что эффект запустится один раз при монтировании

  const handleNavigate = useCallback((direction) => {
    setMediaIndex((prevIndex) => {
      let newIndex = prevIndex;
      if (direction === "next") {
        newIndex = (prevIndex + 1) % shuffledMediaData.length;
      } else if (direction === "prev") {
        newIndex = (prevIndex - 1 + shuffledMediaData.length) % shuffledMediaData.length;
      }
      setSelectedMedia(shuffledMediaData[newIndex]);
      return newIndex;
    });
  }, [shuffledMediaData]); // Зависимость от shuffledMediaData

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
  }, [shuffledMediaData]); // Зависимость от shuffledMediaData

  const handleCloseModal = useCallback(() => {
    setSelectedMedia(null);
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const pageBgClass = isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900";

  return (
    <div className={`min-h-screen font-sans ${pageBgClass} transition-colors duration-300`}>
      <main className="pt-4 pb-8 px-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {/* Используем shuffledMediaData для рендеринга */}
          {shuffledMediaData.map((media, index) => (
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