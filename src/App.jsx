import LanguageProvider from "./providers/LanguageContext";
import { I18nextProvider } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import i18n from "./utils/i18n.js";

import Home from "./pages/Home.jsx";
import Rooms from "./pages/Rooms.jsx";
import RoomId from "./pages/RoomId.jsx";
import Footer from "./components/Footer.jsx";
import BookingForm from "./pages/BookingForm.jsx";
import Hero from "./components/Hero.jsx";
import PaymentResult from "./pages/PaymentResult.jsx";
import Navbar from "./components/Navbar.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute.jsx";
import Guard from "./ProtectedRoutes/Guard.jsx";
import Branch from "./pages/Branch.jsx";

function App() {
  const [dark, setDark] = useState(localStorage.getItem("dark") || "light");
  const [logged, setLogged] = useState(
    localStorage.getItem("token") ? false : true
  );
  const location = useLocation();
  
  const handleLog = () => {
    logged ? "" : localStorage.setItem("token", "");
    setLogged((logged) => (logged = !logged));
  };
  
  const handleMode = () => {
    localStorage.setItem("dark", dark === "light" ? "dark" : "light")
    setDark((mode) => (mode === "light" ? "dark" : "light"));
  };
  
  return (
    <div className={`${dark} bg-grey-100 dark:text-white dark:bg-main-800`}>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <ToastContainer />
<<<<<<< HEAD
          {location.pathname != "/login" &&
            location.pathname != "/register" &&
            !location.pathname.startsWith("/payment-result") && (
              <>
                <Navbar handleLog={handleLog} logged={logged} />
                <Hero />
              </>
            )}
=======
          {location.pathname != "/login" && location.pathname != "/register" && !location.pathname.startsWith("/payment-result") && (
            <>
              <Navbar handleLog={handleLog} mode={dark} handleMode={handleMode} logged={logged} />
              <Hero />
            </>
          )}
>>>>>>> f00937459b56762908ae6ecc92d6277a807f241f
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/branch/:id" element={<Branch />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<RoomId />} />
              <Route element={<Guard />}>
                <Route path="reservation-room/:id" element={<BookingForm />} />
                <Route path="payment-result" element={<PaymentResult />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login handleLog={handleLog} />} />
              </Route>
            </Routes>
          </div>
        </LanguageProvider>
      </I18nextProvider>
      {location.pathname != "/login" &&
        location.pathname != "/register" &&
        !location.pathname.startsWith("/payment-result") && <Footer />}
    </div>
  );
}

export default App;
