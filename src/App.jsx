import LanguageSwitch from "./components/LanguageSwitch";
import ModeSwitch from "./components/ModeSwitch";
import LanguageProvider from "./providers/LanguageContext";
import { I18nextProvider } from "react-i18next";
import { useState } from "react";
import i18n from "./utils/i18n.js";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rooms from "./pages/Rooms.jsx";
import RoomId from "./pages/RoomId.jsx";
import BookingForm from "./pages/BookingForm.jsx";


function App() {
  const [dark, setDark] = useState(localStorage.getItem("dark") || "light");
  const handleMode = () => {
    setDark((mode) => (mode === "light" ? "dark" : "light"));
  };
  return (
    <>
      <div className={`${dark} dark:bg-black bg-grey-100 dark:text-white p-4 min-h-screen`}>
        <I18nextProvider i18n={i18n}>
          <LanguageProvider>
            <ModeSwitch mode={handleMode} />
            <LanguageSwitch />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<RoomId />} />
              <Route path="reservation-room/:id" element={<BookingForm />} />
            </Routes>
          </LanguageProvider>
        </I18nextProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
