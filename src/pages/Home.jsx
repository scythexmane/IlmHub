// Home.jsx
import React from "react";
import HeroSection from "../components/HeroSection";
import CoursesPreview from "../components/Courses";
import { useTranslation } from "react-i18next";
import StatsSection from "../components/StatsSection";
import { Feedback } from "../components/Feedback"; // <-- Changed this line
import FAQSection from "../components/FAQ";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)]">
      <HeroSection t={t} />
      <StatsSection t={t} />
      <CoursesPreview t={t} />
      <Feedback /> {/* <-- And updated the component name here if you want consistency */}
      <FAQSection/>
    </div>
  );
};

export default Home;