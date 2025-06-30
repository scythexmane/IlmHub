import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.svg"

import {
  FaTelegram,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative w-full px-6 py-16 transition-colors duration-500 overflow-hidden
        ${
          theme === "dark"
            ? "bg-[#030317] text-[var(--color-text)]"
            : "bg-[var(--color-bg)] text-[var(--color-text)]"
        }`}
    >
      {/* Decorative Top Line */}
      <div
        className="absolute top-0 left-0 w-full h-[4px] z-10 pointer-events-none animate-glow-line"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(to right, rgba(59,130,246,0.6), rgba(99,102,241,0.6), rgba(16,185,129,0.6))"
              : "linear-gradient(to right, rgba(37,99,235,0.4), rgba(16,185,129,0.4), rgba(250,204,21,0.4))",
          filter: "blur(2px)",
          opacity: 0.85,
        }}
      />

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Logo & About */}
        <div>
          <Link
            to="/"
            className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight drop-shadow-md"
            aria-label={t("Перейти на домашнюю страницу Ilm Hub")}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2"
            >
              <img src={logo} width={150} alt="" />
            </motion.span>
          </Link>
          <p className="text-base text-[var(--color-muted)] mb-4">
            {t("footer.missionStatement")}
          </p>
          <Link
            to="/about"
            className="inline-flex items-center text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)] transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {t("footer.learnMore")}
            <svg
              className="ml-2 w-4 h-4"
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
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">{t("footer.links")}</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/", "Bosh sahifa"],
              ["/courses", "Kurslar"],
              ["/about", "Biz haqimizda"],
              ["/contacts", "Aloqa"],
              ["/blog", "footer.blog"],
            ].map(([path, label], i) => (
              <li key={i}>
                <Link
                  to={path}
                  className="hover:text-[var(--color-primary)] hover:translate-x-1 transition-transform duration-200 ease-in-out block"
                >
                  {t(label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info & Socials */}
        <div>
          <h4 className="text-xl font-semibold mb-4">{t("footer.reachUs")}</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-[var(--color-primary)]" />
              <a
                href="tel:+998901234567"
                className="hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                +998 90 123 45 67
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-[var(--color-primary)]" />
              <a
                href="mailto:info@ilmhub.uz"
                className="hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                info@ilmhub.uz
              </a>
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-[var(--color-primary)] mt-1" />
              <a
                href="https://www.google.com/maps/search/Tashkent"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                {t("footer.address")}
              </a>
            </li>
          </ul>

          {/* Social Links */}
          <div className="flex gap-4 mt-4 text-lg">
            {[
              ["https://t.me/ilmhub", FaTelegram],
              ["https://instagram.com/ilmhub", FaInstagram],
              ["https://facebook.com/ilmhub", FaFacebookF],
              ["https://youtube.com/ilmhub", FaYoutube],
              ["https://linkedin.com/company/ilmhub", FaLinkedinIn],
              ["https://twitter.com/ilmhub", FaTwitter],
            ].map(([link, Icon], i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--color-primary)] transform hover:scale-125 transition-transform duration-200 ease-in-out"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Google Map */}
        <div className="w-full h-60 rounded-xl overflow-hidden border border-[var(--color-border)] shadow-md">
          <iframe
            title="Ilm Hub Yandex Map"
            src="https://yandex.uz/map-widget/v1/org/196532200053/?ll=71.658187%2C41.003684&z=16.94"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            className="border-0"
            style={{
              filter: theme === "dark" ? "grayscale(20%) invert(90%)" : "none",
            }}
          />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-xs text-[var(--color-muted)] border-t pt-6 border-[var(--color-border)]">
        © {currentYear} Ilm Hub. {t("footer.rights")}
      </div>
    </footer>
  );
};

export default Footer;
