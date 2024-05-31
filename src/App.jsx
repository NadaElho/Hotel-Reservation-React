import LanguageSwitch from "./components/LanguageSwitch";
import ModeSwitch from "./components/ModeSwitch";
import LanguageProvider from "./providers/LanguageContext";
import { I18nextProvider } from "react-i18next";
import { useState } from "react";
import i18n from "./utils/i18n.js";
import BookingForm from "./pages/BookingForm.jsx";
import { Route, Routes } from "react-router-dom";
import PaymentResult from "./pages/PaymentResult.jsx";
import Hero from "./components/Hero.jsx";
function App() {
  const [dark, setDark] = useState(localStorage.getItem("dark") || "light");
  const handleMode = () => {
    setDark((mode) => (mode === "light" ? "dark" : "light"));
  };
  return (
    <>
      <div className={`${dark} dark:bg-black bg-grey-100 dark:text-white min-h-screen`}>
        <I18nextProvider i18n={i18n}>
          <LanguageProvider>
            <Hero/>
            <div className="p-4">
            <ModeSwitch mode={handleMode} />
            <LanguageSwitch />
            <Routes>
              <Route path="reservation-room/:id" element={<BookingForm />} />
              <Route path="payment-result" element={<PaymentResult />} />
            </Routes>
            </div>
          </LanguageProvider>
        </I18nextProvider>
      </div>
    </>
  );
}

export default App;
