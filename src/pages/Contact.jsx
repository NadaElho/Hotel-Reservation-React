import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { LuMessageSquare } from "react-icons/lu";
import axiosInstance from "../../interceptor";
import img from "/contact.png";
import { toast } from "react-toastify";
import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";
import { FaRegUser } from "react-icons/fa";

const Contact = () => {
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
    if (!values.name) {
      errors.name = t("form.name-req");
    }
    if (!values.message) {
      errors.message = t("form.message-req");
    }
    return errors;
  };

  const onSubmit = async ({ name, email, message }, { setSubmitting }) => {
    try {
      await axiosInstance.post(
        "/contact",
        {
          firstName: name,
          email,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
      toast.success("message sent successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center lg:overflow-hidden my-4">
      <div className="hidden lg:block w-1/3 lg:w-1/2">
        <img src={img} alt="contact" />
      </div>
      <div className="w-full px-4 md:px-16 lg:px-16 md:w-3/4 lg:w-1/2 flex flex-col justify-center">
        <Formik
          initialValues={{
            email: "",
            name: "",
            message: ""
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
                <div className="flex gap-2 items-center mb-2">
                <FaRegUser color={`${isDark ? "white" : "#1D1D1D"}`} />
                <label htmlFor="name" className="text-main-800">
                  {t("form.name")}
                </label>
                </div>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder={t("form.name")}
                    className="border border-main-800 rounded-3xl outline-none text-main-800 placeholder:text-main-400 p-2 dark:placeholder:text-main-1000 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </div>
                <div className="text-red-500 text-sm ms-2">
                  {touched.name && errors.name}
                </div>
              </div>
              <div className="my-2">
                <div className="flex gap-2 items-center mb-2">
                <AiOutlineMail color={`${isDark ? "white" : "#1D1D1D"}`} />
                <label htmlFor="email" className="text-main-800">
                  {t("form.email")}
                </label>
                </div>
                <div>
                  <input
                    type="text"
                    name="email"
                    placeholder={t("form.email")}
                    className="border border-main-800 rounded-3xl outline-none text-main-800 placeholder:text-main-400 p-2 dark:placeholder:text-main-1000 w-full"
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
                <div className="flex gap-2 items-center">
                <LuMessageSquare color={`${isDark ? "white" : "#1D1D1D"}`} />
                <label htmlFor="message" className="text-main-800 mb-2">
                  {t("form.message")}
                </label>
                </div>
                <div>
                  <textarea
                    type="text"
                    name="message"
                    placeholder={t("form.message")}
                    className="border border-main-800 rounded-3xl outline-none bg-transparent text-main-800 placeholder:text-main-400 p-2 dark:placeholder:text-main-1000 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    rows={4}
                    cols={6}
                  >
                    {values.message}
                  </textarea>
                </div>
                <div className="text-red-500 text-sm ms-2">
                  {touched.message && errors.message}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-main-500 dark:bg-main-25 dark:text-main-1000 dark:font-bold rounded-full p-2 text-white disabled:opacity-50 my-2"
                disabled={isSubmitting}
              >
                {t("form.send")}
              </button>            
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;
