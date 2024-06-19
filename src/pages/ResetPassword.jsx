import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
// import { IoLockClosedOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import img from "/resetpassword.png";
import { toast } from "react-toastify";
import axiosInstance from "../../interceptor";
import { LanguageContext } from "../providers/LanguageContext";
import { useContext } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);
  {
    t(
      "resetpassword",
      "enteremail",
      "btnresetpassword",
      "rememberpassword",
      "login",
      "email"
    );
  }

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const onSubmit = async ({ email }, { setSubmitting }) => {
    console.log(email);
    try {
      let { data } = await axiosInstance.post("users/forgotPassword", {
        email,
      });

      if (data) {
        navigate("/checkemail");
        toast.success("check your email ");
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
        <h3 className="ml-2 font-bold text-grey-600 text-2xl mt-[100px] lg:mt-0">
          {t("resetpassword.resetpassword")}
        </h3>
        <h5 className="ml-2 text-xs text-main-400 mb-4 font-semibold">
          {t("resetpassword.enteremail")}
        </h5>
        <Formik
          initialValues={{
            email: "",
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
                <div className="flex items-center gap-2 border rounded-full bg-main-300 my-1 px-3 py-1">
                  <AiOutlineMail color="white" />
                  <input
                    type="email"
                    name="email"
                    placeholder={t("resetpassword.email")}
                    className="border-0 h-8 outline-none placeholder:text-slate-200 dark:placeholder:text-main-1000 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
                <div className="text-red-500 text-sm ml-2">
                  {touched.email && errors.email}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-main-800 border rounded-full p-2 text-white disabled:opacity-50 my-2"
                disabled={isSubmitting}
              >
                {t("resetpassword.resetpassword")}
              </button>
              <div className="text-sm font-bold  text-main-400 dark:text-main-25 mt-2 ms-2">
                {t("resetpassword.rememberpassword")}
                <Link to="/login" className="text-[#464646] underline ">
                  {t("resetpassword.login")}
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className="hidden lg:block w-1/3 lg:w-1/2 h-full">
        <img src={img} alt="Reset password" className="h-full object-cover" />
      </div>
    </div>
  );
};

export default ResetPassword;
