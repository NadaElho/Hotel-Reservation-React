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
import PrivateRoute from "./protectedRoutes/PrivateRoute.jsx";
import Guard from "./protectedRoutes/Guard.jsx";
import Branch from "./pages/Branch.jsx";
import Profile from "./pages/Profile.jsx";
import Account from "./pages/Account.jsx";
import Favourites from "./pages/Favourites.jsx";
import History from "./pages/History.jsx";
import Plans from "./pages/Plans.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import CheckEmail from "./pages/CheckEmail.jsx";
import NewPassword from "./pages/NewPassword.jsx";

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
    localStorage.setItem("dark", dark === "light" ? "dark" : "light");
    setDark((mode) => (mode === "light" ? "dark" : "light"));
  };

  return (
    <div className={`${dark} bg-grey-100 dark:text-white dark:bg-main-700`}>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <ToastContainer />

          {location.pathname != "/login" &&
            location.pathname != "/register" &&
            location.pathname != "/resetpassword" &&
            location.pathname != "/checkemail" &&
            location.pathname != "/subscription" &&
            !location.pathname.startsWith("/newpassword") &&
            !location.pathname.startsWith("/payment-result") && (
              <>
                <Navbar
                  handleLog={handleLog}
                  mode={dark}
                  handleMode={handleMode}
                  logged={logged}
                />
                <Hero />
              </>
            )}
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/branch/:id" element={<Branch />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<RoomId />} />
              <Route element={<Guard />}>
                <Route path="reservation-room/:id" element={<BookingForm />} />
                <Route path="payment-result" element={<PaymentResult />} />
                <Route
                  path="profile"
                  element={<Profile handleLog={handleLog} />}
                >
                  <Route path="" element={<Account />} />
                  <Route path="favourites" element={<Favourites />} />
                  <Route path="history" element={<History />} />
                  <Route path="plans" element={<Plans />} />
                </Route>
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login handleLog={handleLog} />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/checkemail" element={<CheckEmail />} />
                <Route path="/newpassword/:id" element={<NewPassword />} />
              </Route>
            </Routes>
          </div>
          {location.pathname != "/login" &&
            location.pathname != "/register" &&
            location.pathname != "/resetpassword" &&
            location.pathname != "/checkemail" &&
            location.pathname != "/subscription" &&
            !location.pathname.startsWith("/newpassword") &&
            !location.pathname.startsWith("/payment-result") && <Footer />}
        </LanguageProvider>
      </I18nextProvider>
    </div>
  );
}

export default App;
