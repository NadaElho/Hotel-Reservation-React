import LanguageProvider from "./providers/LanguageContext";
import { I18nextProvider } from "react-i18next";
import { useState } from "react";
import i18n from "./utils/i18n.js";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import { Route, Routes } from "react-router-dom";
import Rooms from "./pages/Rooms.jsx";
import RoomId from "./pages/RoomId.jsx";
import BookingForm from "./pages/BookingForm.jsx";
import Hero from "./components/Hero.jsx";
import PaymentResult from "./pages/PaymentResult.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [dark, setDark] = useState(localStorage.getItem("dark") || "light");
  const handleMode = () => {
    setDark((mode) => (mode === "light" ? "dark" : "light"));
  };
  return (
    <div className={`${dark} bg-grey-100 dark:text-white min-h-screen`}>
      <Navbar handleMode={handleMode} />
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <Hero />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<RoomId />} /> 
              <Route path="reservation-room/:id" element={<BookingForm />} />
              <Route path="payment-result" element={<PaymentResult />} />
            </Routes>
          </div>
        </LanguageProvider>
      </I18nextProvider>
      <Footer />
    </div>
  );
}

export default App;
