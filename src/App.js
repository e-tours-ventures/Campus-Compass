import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./AboutPage/About";
import Contact from "./ContactUs/Contact";
import FAQ from "./FAQPage/js/FAQ";
import Footer from "./Home/js/Footer";
import Header from "./Home/js/Header";
import Home from "./Home/js/Home";
import TermsAndConditions from "./TermsAndConditions/TermsAndConditions";
import FloatingButtons from "./components/FloatingButtons";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import Universitypage from "./UniversitiesAndDegrees/Universitypage";
import Admin from "./Admin panel/AdminView";

const App = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  return (
    <Router>
      {/* ✅ Show Header by default, Hide only for admin */}
      {role !== "admin" && <Header />}

      <div className="app-container">
        <ScrollToTopOnRouteChange />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/UniversitiesAndDegrees/Universitypage" element={<Universitypage />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
          <FloatingButtons />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
