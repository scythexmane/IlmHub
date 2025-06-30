// FAQSection.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

// Данные для FAQ
const faqsData = [
  { key: "faq1" },
  { key: "faq2" },
  { key: "faq3" },
  { key: "faq4" },
];

// --- Дочерний Компонент Аккордеона ---
const AccordionItem = ({ faq, isOpen, onClick }) => {
  const { t } = useTranslation();

  const answerVariants = {
    open: { opacity: 1, height: "auto", y: 0 },
    collapsed: { opacity: 0, height: 0, y: -10 },
  };

  return (
    <div className="border-b border-border">
      <motion.button
        onClick={onClick}
        className="w-full flex justify-between items-center py-5 px-6 text-left focus:outline-none"
        whileHover={{ backgroundColor: "var(--color-hover-bg)" }}
        transition={{ duration: 0.2 }}
      >
        <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-text'}`}>
          {t(`faq.${faq.key}.q`)}
        </span>
        <motion.div
          className="text-2xl text-muted"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <FiPlus />
        </motion.div>
      </motion.button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={answerVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-muted leading-relaxed">
              {t(`faq.${faq.key}.a`)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// --- Основной Компонент Секции FAQ ---
const FAQSection = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 100,
    });
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-bg py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-4xl sm:text-5xl font-bold text-text tracking-tight">
            {t("faq.title")}
          </h2>
          <p className="mt-4 text-lg text-muted max-w-3xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        <motion.div
          data-aos="fade-up"
          className="bg-bg-alt rounded-2xl shadow-card transition-shadow duration-300 hover:shadow-card-hover"
        >
          {faqsData.map((faq, index) => (
            <AccordionItem
              key={faq.key}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default FAQSection;