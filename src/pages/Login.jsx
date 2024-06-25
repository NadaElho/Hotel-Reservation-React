import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { IoLockClosedOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import axiosInstance from "../../interceptor";
import img from "/login.png";
import { toast } from "react-toastify";
import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";

const Login = ({ handleLog }) => {
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);
  const isDark = localStorage.getItem("dark") == "dark";

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = t("form.email-req");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = t("form.invalid-email");
    }
    if (!values.password) {
      errors.password = t("form.password-req");
    }
    return errors;
  };

  const onSubmit = async ({ password, email }, { setSubmitting }) => {
    try {
      const { data } = await axiosInstance.post(
        "/users/login",
        {
          password,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userId", data.data.id);
      navigate("/");
      toast.success("You are logged in successfully");
      handleLog();
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center lg:h-screen lg:overflow-hidden min-h-screen">
      <div className="w-full p-4 md:p-16 lg:p-16 md:w-3/4 lg:w-1/2 flex flex-col justify-center">
        <h1 className="text-primary dark:text-main-25 text-4xl font-secondary uppercase fixed top-8 rtl:right-4 md:rtl:right-16 ltr:left-4 md:ltr:left-12">
          <Link to="/">APEX</Link>
        </h1>
        <h3 className="ms-2 font-bold text-grey-600 dark:text-grey-400 text-2xl mt-[50px] lg:mt-0">
          {t("form.welcome")}
        </h3>
        <h5 className="ms-2 text-xs text-main-400 dark:text-main-150 mb-4 font-semibold">
          {t("form.details")}
        </h5>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="text-white">
              <div className="my-2">
                <div className="flex items-center gap-2 rounded-full bg-main-300 my-1 p-2">
                  <AiOutlineMail color={`${isDark ? "#1D1D1D" : "white"}`} />
                  <input
                    type="email"
                    name="email"
                    placeholder={t("form.email")}
                    className="border-0 outline-none placeholder:text-slate-200 dark:placeholder:text-main-1000 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
                <div className="text-red-500 text-sm ms-2">
                  {touched.email && errors.email}
                </div>
              </div>
              <div className="my-2">
                <div className="flex items-center gap-2 rounded-full bg-main-300 my-1 p-2">
                  <IoLockClosedOutline
                    color={`${isDark ? "#1D1D1D" : "white"}`}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder={t("form.password")}
                    className="border-0 outline-none placeholder:text-slate-200 dark:placeholder:text-main-1000 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
                <div className="text-red-500 text-sm ms-2">
                  {touched.password && errors.password}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-main-800 dark:bg-main-25 dark:text-main-1000 dark:font-bold rounded-full p-2 text-white disabled:opacity-50 my-2"
                disabled={isSubmitting}
              >
                {t("form.login")}
              </button>
              <div className="text-sm font-bold flex justify-between text-main-400 dark:text-main-25 mt-2 ms-2">
                <div>
                  {t("form.don't-have")} &nbsp;
                  <span
                    className="cursor-pointer text-[#464646] dark:text-main-200"
                    onClick={() => navigate("/register", { replace: true })}
                  >
                    {t("form.signup")}
                  </span>
                </div>
                <Link
                  to="/resetpassword"
                  className="text-[#52381D] underline cursor-pointer dark:text-main-200 "
                >
                  {t("forgotpassword")}
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className="hidden lg:block w-1/3 lg:w-1/2">
        <img src={img} alt="Login" />
      </div>
    </div>
  );
};

export default Login;
