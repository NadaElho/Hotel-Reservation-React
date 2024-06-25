import { Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoLockClosedOutline } from "react-icons/io5";
import img from "/createnewpassword.png";
import { toast } from "react-toastify";
import axiosInstance from "../../interceptor";
import { LanguageContext } from "../providers/LanguageContext";
import { useContext } from "react";

const NewPassword = () => {
  const isDark = localStorage.getItem("dark") == "dark";
  let userId = useParams();
  const token = userId.id;
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);
  {
    t(
      "newpassword",
      "differentpassword",
      "resetpassword",
      "password",
      "confirmpassword"
    );
  }
  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "confirmPassword is required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "confirmPassword must match the password ";
    }

    return errors;
  };

  const onSubmit = async ({ password }, { setSubmitting }) => {
    try {
      let { data } = await axiosInstance.patch(`users/resetPassword/${token}`, {
        password,
      });
      if (data) {
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response.data?.message);
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
          {t("newpassword.newpassword")}
        </h3>
        <h5 className="ms-2 text-xs text-main-400 dark:text-main-150 mb-4 font-semibold">
          {t("newpassword.differentpassword")}
        </h5>
        <Formik
          initialValues={{
            password: "",
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
              <div className="my-2">
                <div className=" flex items-center gap-2 rounded-full bg-main-300 my-1 px-3 py-1">
                  <IoLockClosedOutline
                    color={`${isDark ? "#1D1D1D" : "white"}`}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder={t("newpassword.password")}
                    className="border-0 h-8 outline-none placeholder:text-slate-200 dark:placeholder:text-main-1000 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
                <div className="text-red-500 text-sm ml-2">
                  {touched.password && errors.password}
                </div>
              </div>

              <div className="my-2">
                <div className="flex items-center gap-2 rounded-full bg-main-300 my-1 px-3 py-1">
                  <IoLockClosedOutline
                    color={`${isDark ? "#1D1D1D" : "white"}`}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder={t("newpassword.confirmpassword")}
                    className="border-none h-8 outline-none placeholder:text-slate-200 dark:placeholder:text-main-1000 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                </div>
                <div className="text-red-500 text-sm ml-2">
                  {touched.confirmPassword && errors.confirmPassword}
                </div>
              </div>

              <input type="hidden" name="hiddenInput" value="hiddenValue" />

              <button
                type="submit"
                className="w-full bg-main-800 dark:bg-main-25 dark:text-main-1000 dark:font-bold rounded-full p-2 text-white disabled:opacity-50 my-2"
                disabled={isSubmitting}
              >
                {t("newpassword.resetpassword")}
              </button>
            </form>
          )}
        </Formik>
      </div>

      <div className="hidden lg:block w-1/3 lg:w-1/2 h-full">
        <img src={img} alt="Login" className="h-full object-cover" />
      </div>
    </div>
  );
};

export default NewPassword;
