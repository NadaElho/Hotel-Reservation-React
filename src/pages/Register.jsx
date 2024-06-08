import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import axiosInstance from "../../interceptor";
import img from "/register.png";
import { toast } from "react-toastify";
import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);

  const validate = (values) => {
    const errors = {};
    if (!values.fname) {
      errors.fname = t("form.fname-req");
    }
    if (!values.lname) {
      errors.lname = t("form.lname-req");
    }
    if (!values.email) {
      errors.email = t("form.email-req");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = t("form.invalid-email");
    }
    if (!values.password) {
      errors.password = t("form.password-req");
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)
    ) {
      errors.password = t("form.invalid-password");
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = t("form.confirm-req");
    }
    if (values.confirmPassword && values.password !== values.confirmPassword) {
      errors.confirmPassword = t("form.match");
    }
    return errors;
  };

  const onSubmit = async (
    { fname, lname, password, email },
    { setSubmitting }
  ) => {
    try {
      await axiosInstance.post(
        "/users/signUp",
        {
          firstName: fname,
          lastName: lname,
          password,
          email,
          role: "664288806d86e8d38415e8ab",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/login");
      toast.success("You are registered successfully");
    } catch (err) {
      toast.error("Email already exists");
    }
    setSubmitting(false);
  };

  const isDark = localStorage.getItem("dark") == "dark";

  return (
    <div className="flex items-center justify-center md:h-screen md:overflow-hidden min-h-screen">
      <div className="w-full p-4 md:p-12 md:w-2/3 lg:w-1/2">
        <h1 className="text-primary dark:text-main-25 text-4xl font-secondary uppercase fixed top-8 rtl:right-4 md:rtl:right-16 ltr:left-4 md:ltr:left-12">
          <Link to="/">APEX</Link>
        </h1>
        <h5 className="ms-2 text-xs text-main-400 dark:text-main-150 font-semibold mt-[100px] md:mt-0">
          {t("form.start")}
        </h5>
        <h3 className="ms-2 font-bold text-grey-600 dark:text-grey-400 text-2xl mb-4">
          {t("form.create-new")}
        </h3>
        <Formik
          initialValues={{
            email: "",
            password: "",
            fname: "",
            lname: "",
            confirmPassword: "",
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
              <div className="flex md:justify-between flex-wrap md:flex-nowrap gap-0 md:gap-2 text-white">
                <div className="w-full md:w-1/2 my-2">
                  <div className="flex items-center gap-2 rounded-full bg-main-300 dark:bg-main-250 p-2">
                    <FaRegUser color={`${isDark ? "#1D1D1D" : "white"}`} />
                    <input
                      type="text"
                      name="fname"
                      placeholder={t("form.fname")}
                      className="border-0 outline-none placeholder:text-slate-200 dark:placeholder:text-main-1000 w-full"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fname}
                    />
                  </div>
                  <div className="text-red-500 text-sm ms-2">
                    {touched.fname && errors.fname}
                  </div>
                </div>
                <div className="w-full md:w-1/2 my-2">
                  <div className="flex items-center gap-2 rounded-full bg-main-300 dark:bg-main-250  p-2">
                    <FaRegUser color={`${isDark ? "#1D1D1D" : "white"}`} />
                    <input
                      type="text"
                      name="lname"
                      placeholder={t("form.lname")}
                      className="border-0 outline-none placeholder:text-slate-200 dark:placeholder:text-main-1000 w-full"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lname}
                    />
                  </div>
                  <div className="text-red-500 text-sm ms-2">
                    {touched.lname && errors.lname}
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="flex items-center gap-2 rounded-full bg-main-300 dark:bg-main-250 my-1 p-2">
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
              <div className="my-4 md:my-2">
                <div className="flex items-center gap-2 rounded-full bg-main-300 dark:bg-main-250 my-1 p-2">
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
              <div className="my-2">
                <div className="flex items-center gap-2 rounded-full bg-main-300 dark:bg-main-250 my-1 p-2">
                  <IoLockClosedOutline
                    color={`${isDark ? "#1D1D1D" : "white"}`}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder={t("form.confirm")}
                    className="border-0 outline-none placeholder:text-slate-200 dark:placeholder:text-main-1000 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                </div>
                <div className="text-red-500 text-sm ms-2">
                  {touched.confirmPassword && errors.confirmPassword}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-main-800 dark:bg-main-25 dark:text-main-1000 dark:font-bold rounded-full p-2 text-white disabled:opacity-50 my-2"
                disabled={isSubmitting}
              >
                {t("form.create")}
              </button>
              <div className="text-sm font-bold text-main-400 dark:text-main-25 mt-2 ms-2">
                {t("form.have")}
                &nbsp;
                <span
                  className="cursor-pointer text-[#464646] dark:text-main-200"
                  onClick={() => navigate("/login", { replace: true })}
                >
                  {t("form.login")}
                </span>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className="hidden lg:block w-1/3 lg:w-1/2">
        <img src={img} alt="Register" />
      </div>
    </div>
  );
};

export default Register;
