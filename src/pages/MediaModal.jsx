import React, { useEffect, useRef, useState } from 'react'; // Added useState for video controls
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2, ease: "easeIn" } }
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

function MediaModal({ media, onClose, onNavigate }) {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // This effect runs whenever 'media' changes
    if (media && media.type === 'video' && videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Autoplay failed:", error);
        setIsPlaying(false);
      });
      videoRef.current.muted = true; // Start muted
      setIsMuted(true);
    }
    // Cleanup function: Pause video and reset state when modal is closed or media changes
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset video to start
      }
      setIsPlaying(false);
      setIsMuted(true);
    };
  }, [media]); // Dependency array: run effect when 'media' changes

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

  // Check current theme (assuming 'dark' class is set on html or body)
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <AnimatePresence>
      {/* Conditionally render the entire modal structure ONLY if 'media' is not null */}
      {media && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose} // Close on backdrop click
        >
          <motion.div
            className={`relative max-w-5xl w-full max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden flex flex-col
              ${isDarkMode ? 'bg-opacity-80 backdrop-filter backdrop-blur-lg' : 'bg-opacity-90 backdrop-filter backdrop-blur-lg'}`}
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={t('closeModal')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {/* Navigation buttons */}
            <button
              onClick={() => onNavigate('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={t('previousMedia')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button
              onClick={() => onNavigate('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={t('nextMedia')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>

            <div className="flex-grow flex items-center justify-center p-2 sm:p-4">
              {media.type === 'image' ? (
                <img
                  src={media.src}
                  alt={t(media.titleKey)}
                  className="max-h-[70vh] w-auto object-contain rounded-md"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src={media.src}
                    controls={false} // Hide native controls, use custom ones
                    className="max-h-[70vh] w-full object-contain rounded-md"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 p-2 bg-black/50 rounded-lg">
                    <button onClick={handleTogglePlay} className="text-white p-2">
                      {isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg> // Pause icon
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg> // Play icon
                      )}
                    </button>
                    <button onClick={handleToggleMute} className="text-white p-2">
                      {isMuted ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.37 14.28 21 13.19 21 12c0-4.42-3.58-8-8-8-1.55 0-3.02.46-4.28 1.25l1.45 1.45C9.73 6.47 11.3 6 13 6c3.09 0 5.61 2.37 5.95 5.43l1.54 1.54c-.21.02-.42.03-.64.03zM4.27 3L3 4.27l9 9V12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.37 14.28 21 13.19 21 12c0-4.42-3.58-8-8-8-1.55 0-3.02.46-4.28 1.25l1.45 1.45C9.73 6.47 11.3 6 13 6c3.09 0 5.61 2.37 5.95 5.43l1.54 1.54c-.21.02-.42.03-.64.03zM1.49 1.49L.22 2.76l2.12 2.12C2.12 5.25 2 5.61 2 6v10c0 1.1.9 2 2 2h10c.39 0 .75-.12 1.06-.27l2.12 2.12 1.27-1.27L1.49 1.49zm1.88 5.66l2.12 2.12L7 12v-2.21c-.79-.58-1.42-1.34-1.83-2.21H3.37zm2.46 8.35L15 15.11V16c0 1.1-.9 2-2 2H4c-.74 0-1.4-.33-1.85-.85L5.83 15.49z" /></svg> // Mute icon
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.81 5 3.54 5 6.71s-2.11 5.9-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg> // Unmute icon
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-2">{t(media.titleKey)}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{media.date}</p>
              <p className="text-gray-700 dark:text-gray-300">{t(media.descriptionKey)}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ... (rest of your MediaGalleryPage component remains the same)