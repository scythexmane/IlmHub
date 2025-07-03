import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Страницы
import Home from "./pages/Home";
import Courses from "./pages/CoursesPage";
import About from "./pages/About.jsx";
import Contacts from "./pages/ContactsPage.jsx";
import Blog from "./pages/Blog.jsx";

const AppLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-500 ease-in-out">
      <div className="p-6 bg-white text-black dark:bg-black dark:text-white">
        <h1 className="text-2xl font-bold">Тест тёмной темы</h1>
        <p>Если фон чёрный — значит `dark:` работает</p>
      </div>
      );
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
