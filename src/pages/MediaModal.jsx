import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const modal = {
  hidden: { opacity: 0, scale: 0.96, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, y: 40, transition: { duration: 0.2, ease: "easeIn" } }
};

const MediaModal = ({ media, onClose, onNavigate }) => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (media?.type === 'video' && videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      setIsMuted(true);

      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsMuted(true);
      setIsPlaying(false);
    };
  }, [media]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
    setIsPlaying(!video.paused);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <AnimatePresence>
      {media && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            variants={modal}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/70 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              aria-label={t("closeModal")}
            >
              <svg className="w-5 h-5 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation */}
            <button
              onClick={() => onNavigate('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/70 dark:bg-gray-800/60 hover:bg-white hover:scale-105 transition"
              aria-label={t("previousMedia")}
            >
              <svg className="w-5 h-5 text-gray-800 dark:text-gray-100" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => onNavigate('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/70 dark:bg-gray-800/60 hover:bg-white hover:scale-105 transition"
              aria-label={t("nextMedia")}
            >
              <svg className="w-5 h-5 text-gray-800 dark:text-gray-100" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Content */}
            <div className="flex-grow flex items-center justify-center bg-black/5 dark:bg-white/5 p-4">
              {media.type === 'image' ? (
                <img
                  src={media.src}
                  alt={t(media.titleKey)}
                  className="max-h-[70vh] object-contain rounded-md shadow"
                  loading="lazy"
                />
              ) : (
                <div className="relative w-full flex justify-center items-center">
                  <video
                    ref={videoRef}
                    src={media.src}
                    className="w-full max-h-[70vh] object-contain rounded-md"
                    controls={false}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  <div className="absolute bottom-4 flex items-center space-x-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <button onClick={togglePlay} className="text-white">
                      {isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      )}
                    </button>
                    <button onClick={toggleMute} className="text-white">
                      {isMuted ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" /></svg>
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3z" /></svg>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="p-4 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{t(media.titleKey)}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{media.date}</p>
              <p className="text-base mt-2 text-gray-700 dark:text-gray-300">{t(media.descriptionKey)}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MediaModal;
