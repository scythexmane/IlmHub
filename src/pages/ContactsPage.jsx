"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence for smooth exit animations
import { ThemeContext } from "../ThemeContext"; // Убедись, что путь правильный
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa"; // For the dropdown arrow icon

export default function BackgroundEffect() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const { t, i18n } = useTranslation();

  // State для текущего выбранного филиала (индекс в массиве branches)
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);
  // State для управления видимостью кастомного дропдауна
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Ref для контейнера карты
  const mapRef = useRef(null);
  // Ref для кастомного дропдауна, чтобы отслеживать клики вне его
  const dropdownRef = useRef(null);
  // State для хранения экземпляра карты Яндекс
  const [myMap, setMyMap] = useState(null);
  // State для хранения меток, чтобы мы могли обращаться к ним по индексу
  const [placemarks, setPlacemarks] = useState([]);

  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
    "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
    "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
    "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
    "M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
    "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
    "M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787",
    "M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779",
    "M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771",
    "M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763",
    "M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755",
    "M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747",
    "M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739",
    "M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731",
    "M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723",
    "M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715",
    "M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707",
    "M-226 -365C-226 -365 -158 40 306 167C770 294 838 699 838 699",
    "M-219 -373C-219 -373 -151 32 313 159C777 286 845 691 845 691",
    "M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683",
    "M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675",
    "M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667",
    "M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659",
    "M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651",
    "M-177 -421C-177 -421 -109 -16 355 111C819 238 887 643 887 643",
    "M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635",
    "M-163 -437C-163 -437 -95 -32 369 95C833 222 901 627 901 627",
    "M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619",
    "M-149 -453C-149 -453 -81 -48 383 79C847 206 915 611 915 611",
    "M-142 -461C-142 -461 -74 -56 390 71C854 198 922 603 922 603",
    "M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595",
    "M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587",
    "M-121 -485C-121 -485 -53 -80 411 47C875 174 943 579 943 579",
    "M-114 -493C-114 -493 -46 -88 418 39C882 166 950 571 950 571",
    "M-107 -501C-107 -501 -39 -96 425 31C889 158 957 563 957 563",
    "M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555",
    "M-93 -517C-93 -517 -25 -112 439 15C903 142 971 -547 971 547",
    "M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539",
    "M-79 -533C-79 -533 -11 -128 453 -1C917 126 985 531 985 531",
    "M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523",
    "M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515",
    "M-58 -557C-58 -557 10 -152 474 -25C938 102 1006 507 1006 507",
    "M-51 -565C-51 -565 17 -160 481 -33C945 94 1013 499 1013 499",
    "M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491",
    "M-37 -581C-37 -581 31 -176 495 -49C959 78 1027 483 1027 483",
    "M-30 -589C-30 -589 38 -184 502 -57C966 70 1034 475 1034 475",
    "M-23 -597C-23 -597 45 -192 509 -65C973 62 1041 467 1041 467",
    "M-16 -605C-16 -605 52 -200 516 -73C980 54 1048 459 1048 459",
    "M-9 -613C-9 -613 59 -208 523 -81C987 46 1055 451 1055 451",
    "M-2 -621C-2 -621 66 -216 530 -89C994 38 1062 443 1062 443",
    "M5 -629C5 -629 73 -224 537 -97C1001 30 1069 435 1069 435",
    "M12 -637C12 -637 80 -232 544 -105C1008 22 1076 427 1076 427",
    "M19 -645C19 -645 87 -240 551 -113C1015 14 1083 419 1083 419",
  ];

  const branches = [
    {
      name: "IlmHub Чиланзар",
      address: "г. Ташкент, Чиланзарский р-н, ул. Лутфи, 16Б",
      coords: [41.285535, 69.203745], // [latitude, longitude]
      phone: "+998 71 277-77-77",
      workingHours: "Пн-Сб: 9:00-18:00",
      description: "Основной филиал в Чиланзарском районе.",
    },
    {
      name: "IlmHub Юнусабад",
      address: "г. Ташкент, Юнусабадский р-н, пр-т Амира Темура, 107",
      coords: [41.351455, 69.312214],
      phone: "+998 71 233-33-33",
      workingHours: "Пн-Пт: 10:00-19:00",
      description: "Филиал для жителей Юнусабадского района.",
    },
    {
      name: "IlmHub Сергели",
      address: "г. Ташкент, Сергелийский р-н, ул. Янги Сергели, 5",
      coords: [41.248024, 69.207567],
      phone: "+998 71 211-11-11",
      workingHours: "Вт-Вс: 9:00-17:00",
      description: "Новый филиал в Сергелийском районе.",
    },
    {
      name: "IlmHub Мирзо-Улугбек",
      address: "г. Ташкент, Мирзо-Улугбекский р-н, ул. Буюк Ипак Йули, 12",
      coords: [41.338078, 69.334083],
      phone: "+998 71 299-99-99",
      workingHours: "Пн-Сб: 9:30-18:30",
      description: "Филиал недалеко от центра, удобное расположение.",
    },
  ];

  const tr = {
    title: t("contact.title", "Связаться с нами"),
    name: t("contact.name", "Имя"),
    phone: t("contact.phone", "Телефон"),
    message: t("contact.message", "Сообщение"),
    send: t("contact.send", "Отправить"),
    openInYandexMaps: t("contact.openInYandexMaps", "Открыть в Яндекс.Картах"),
    address: t("contact.address", "Адрес"),
    workingHours: t("contact.workingHours", "Время работы"),
    description: t("contact.description", "Описание"),
    selectBranch: t("contact.selectBranch", "Выберите филиал"),
  };

  // --- Yandex Maps API Integration ---
  useEffect(() => {
    const loadYandexMapsScript = () => {
      if (window.ymaps) {
        initMap();
        return;
      }

      const script = document.createElement("script");
      // ВАЖНО: Замените YOUR_API_KEY на ваш реальный ключ API Яндекса!
      script.src = "https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU";
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => {
        window.ymaps.ready(initMap);
      };
      script.onerror = (error) => {
        console.error("Failed to load Yandex Maps script:", error);
      };
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (mapRef.current && window.ymaps && !myMap) {
        const initialCoords = branches[selectedBranchIndex].coords;
        const newMap = new window.ymaps.Map(mapRef.current, {
          center: [initialCoords[0], initialCoords[1]], // [latitude, longitude]
          zoom: 12,
          controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
        }, {
          searchControlProvider: 'yandex#search'
        });

        const newPlacemarks = [];
        branches.forEach((branch, index) => {
          const balloonContent = `
            <div style="padding: 10px; font-family: Arial, sans-serif; max-width: 300px; line-height: 1.4;">
              <h3 style="margin-top: 0; margin-bottom: 5px; font-size: 1.2em; color: ${isDark ? '#e0e0e0' : '#333'};">${branch.name}</h3>
              <p style="margin-bottom: 3px; color: ${isDark ? '#c0c0c0' : '#555'};"><strong>${tr.address}:</strong> ${branch.address}</p>
              <p style="margin-bottom: 3px; color: ${isDark ? '#c0c0c0' : '#555'};"><strong>${tr.phone}:</strong> ${branch.phone}</p>
              <p style="margin-bottom: 3px; color: ${isDark ? '#c0c0c0' : '#555'};"><strong>${tr.workingHours}:</strong> ${branch.workingHours}</p>
              <p style="margin-bottom: 10px; font-style: italic; color: ${isDark ? '#a0a0a0' : '#777'};">${branch.description}</p>
              <a href="https://yandex.uz/maps/?ll=${branch.coords[1]},${branch.coords[0]}&z=15&pt=${branch.coords[1]},${branch.coords[0]},pm2rdm"
                 target="_blank" rel="noopener noreferrer"
                 style="display: inline-block; padding: 8px 12px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-size: 0.9em;">
                ${tr.openInYandexMaps}
              </a>
            </div>
          `;

          const placemark = new window.ymaps.Placemark(
            [branch.coords[0], branch.coords[1]],
            {
              balloonContent: balloonContent,
              hintContent: branch.name, // Подсказка при наведении
            },
            {
              // Опции для метки
            }
          );
          newMap.geoObjects.add(placemark);
          newPlacemarks.push(placemark);

          placemark.events.add('click', () => {
            setSelectedBranchIndex(index);
            // Баллун откроется автоматически при клике на метку
          });
        });

        setMyMap(newMap);
        setPlacemarks(newPlacemarks);
      }
    };

    loadYandexMapsScript();

    return () => {
      if (myMap) {
        myMap.destroy();
        setMyMap(null);
        setPlacemarks([]);
      }
    };
  }, []);

  // Эффект для обновления центра карты и открытия баллуна при изменении выбранного филиала
  useEffect(() => {
    if (myMap && placemarks.length > selectedBranchIndex) {
      const selectedBranch = branches[selectedBranchIndex];
      const selectedPlacemark = placemarks[selectedBranchIndex];

      myMap.setCenter([selectedBranch.coords[0], selectedBranch.coords[1]], 15, {
        duration: 800,
      }).then(() => {
        selectedPlacemark.balloon.open();
      });
    }
  }, [selectedBranchIndex, myMap, placemarks, branches]);

  // Обработчик выбора филиала из кастомного дропдауна
  const handleSelectBranch = (index) => {
    setSelectedBranchIndex(index);
    setIsDropdownOpen(false); // Закрыть дропдаун после выбора
  };

  // Обработчик клика вне дропдауна для его закрытия
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative w-full min-h-screen flex items-center justify-center ${
        isDark ? "bg-gray-950" : "bg-white"
      } overflow-hidden`}
    >
      {/* Background Beams */}
      <div className="absolute inset-0 z-0 [mask-image:radial-gradient(1800px_circle_at_center,white,transparent)]">
        <svg
          className="absolute h-full w-full"
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875"
            stroke="url(#grayGradient)"
            strokeOpacity="0.1"
            strokeWidth="0.8"
          />
          <defs>
            <radialGradient
              id="grayGradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
            >
              <stop offset="0.1" stopColor="#d4d4d4" />
              <stop offset="0.4" stopColor="#ffffff00" />
            </radialGradient>
          </defs>

          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke={`url(#beamGradient-${i})`}
              strokeOpacity="0.4"
              strokeWidth="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          ))}

          <defs>
            {paths.map((_, i) => (
              <linearGradient
                id={`beamGradient-${i}`}
                key={i}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop stopColor="#18CCFC" stopOpacity="0" />
                <stop offset="0.5" stopColor="#6344F5" />
                <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
        </svg>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 justify-center items-start px-4 py-10">
        {/* Форма */}
        <div
          className={`z-10 w-full lg:w-[550px] max-w-lg mx-auto px-6 py-10 rounded-3xl shadow-2xl border transition-all duration-500 ease-in-out
          ${
            isDark
              ? "bg-neutral-900/80 border-white/10 text-white"
              : "bg-white/90 border-neutral-300 text-gray-900"
          }`}
        >
          <h2 className="text-4xl font-extrabold text-center mb-8 drop-shadow-md">
            {t("contact.title")}
          </h2>

          <form className="space-y-6">
            {["name", "phone"].map((field) => (
              <div className="relative group" key={field}>
                <input
                  type={field === "phone" ? "tel" : "text"}
                  id={field}
                  placeholder=" "
                  className={`peer w-full px-5 py-3 rounded-xl border
                  ${
                    isDark
                      ? "bg-white/10 text-white border-white/20 placeholder:text-neutral-400"
                      : "bg-white text-black border-gray-300 placeholder:text-gray-400"
                  }
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 ease-in-out`}
                />
                <label
                  htmlFor={field}
                  className={`absolute left-5 top-3 text-sm transition-all duration-300 ease-in-out bg-transparent px-1
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                  peer-focus:top-0 peer-focus:text-sm peer-focus:text-teal-500
                  ${isDark ? "text-neutral-300" : "text-gray-500"}`}
                >
                  {t(`contact.${field}`)}
                </label>
              </div>
            ))}

            <div className="relative group">
              <textarea
                id="message"
                rows="4"
                placeholder=" "
                className={`peer w-full px-5 py-3 rounded-xl border resize-none
                ${
                  isDark
                    ? "bg-white/10 text-white border-white/20 placeholder:text-neutral-400"
                    : "bg-white text-black border-gray-300 placeholder:text-gray-400"
                }
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 ease-in-out`}
              />
              <label
                htmlFor="message"
                className={`absolute left-5 top-3 text-sm transition-all duration-300 ease-in-out bg-transparent px-1
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                peer-focus:top-0 peer-focus:text-sm peer-focus:text-teal-500
                ${isDark ? "text-neutral-300" : "text-gray-500"}`}
              >
                {t("contact.message")}
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-semibold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-98 shadow-lg hover:shadow-xl"
            >
              {t("contact.send")}
            </button>
          </form>
        </div>

        {/* Карта и кастомный селектор */}
        <div className="w-full lg:w-[550px] space-y-6">
          {/* Custom Dropdown */}
          <div ref={dropdownRef} className="relative z-20">
            <button
              type="button"
              className={`flex items-center justify-between w-full px-5 py-3 rounded-xl border cursor-pointer
              ${
                isDark
                  ? "bg-neutral-800 border-white/20 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }
              shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              <span className="truncate">{branches[selectedBranchIndex].name}</span>
              <FaChevronDown
                className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute mt-2 w-full max-h-60 overflow-auto rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                  ${isDark ? "bg-neutral-800 border border-white/20" : "bg-white border border-gray-300"}
                  `}
                  role="listbox"
                  aria-labelledby="branch-select-button"
                >
                  {branches.map((branch, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer select-none relative py-3 pl-5 pr-9
                      ${
                        index === selectedBranchIndex
                          ? isDark
                            ? "bg-teal-700 text-white"
                            : "bg-teal-50 text-teal-900"
                          : isDark
                          ? "text-white hover:bg-neutral-700"
                          : "text-gray-900 hover:bg-gray-100"
                      }
                      transition-colors duration-150`}
                      onClick={() => handleSelectBranch(index)}
                      role="option"
                      aria-selected={index === selectedBranchIndex}
                    >
                      <span className="block truncate">{branch.name}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Это DIV, куда Яндекс.Карта будет встроена */}
          <div
            ref={mapRef}
            style={{ width: "100%", height: "400px" }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            {/* Карта будет загружена здесь */}
          </div>
        </div>
      </div>
    </div>
  );
}