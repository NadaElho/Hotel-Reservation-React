import { useContext, useState } from "react";
import { LanguageContext } from "../providers/LanguageContext";
import { Formik } from "formik";
import { toast } from "react-toastify";
import axiosInstance from "../../interceptor";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa6";
import { TbEyeClosed } from "react-icons/tb";

const ChangePassword = () => {
  const [showPass, setShowPass] = useState({ curPass: false, newPass: false });
  const { t } = useContext(LanguageContext);

  const isDark = localStorage.getItem("dark") === "dark";

  const validateChangePass = (values) => {
    const errors = {};
    if (!values.currentPassword) {
      errors.currentPassword = t("form.password-req");
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.currentPassword)
    ) {
      errors.currentPassword = t("form.invalid-password");
    }
    if (!values.newPassword) {
      errors.newPassword = t("form.password-req");
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.newPassword)
    ) {
      errors.newPassword = t("form.invalid-password");
    }
    return errors;
  };

  const onSubmitChangePass = async (
    { currentPassword, newPassword },
    { setSubmitting, resetForm }
  ) => {
    try {
      await axiosInstance.patch(
        `/users/${localStorage.getItem("userId")}/password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      resetForm();
      toast.success(t("form.password-changed"));
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setSubmitting(false);
  };

  const handleToggleShowPass = (field) => {
    setShowPass((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div>
      <h2 className="text-2xl text-main-800 dark:text-main-50 my-5 w-fit py-2 font-medium border-b-2 border-main-800 dark:border-main-25">
        {t("form.change-pass")}
      </h2>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
        }}
        validate={validateChangePass}
        onSubmit={onSubmitChangePass}
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
            <div className="flex md:justify-between flex-wrap md:flex-nowrap gap-0 md:gap-2 text-main-800 dark:text-white me-2">
              <div className="w-full md:w-1/2 my-2">
                <label htmlFor="current-pass" className="text-main-800 dark:text-main-25 mb-2 text-base">
                  {t("form.current-pass")}
                </label>
                <div className="flex items-center gap-2 rounded-full border border-main-800 dark:bg-main-250 p-2">
                  <RiLockPasswordLine
                    color={`${isDark ? "white" : "#1D1D1D"}`}
                  />
                  <input
                    type={showPass.curPass ? "text" : "password"}
                    name="currentPassword"
                    placeholder={t("form.current-pass")}
                    className="border-0 outline-none placeholder:text-main-500 dark:placeholder:text-main-1000 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.currentPassword}
                  />
                  <span onClick={() => handleToggleShowPass("curPass")}>
                    {showPass.curPass ? <FaRegEye /> : <TbEyeClosed />}
                  </span>
                </div>
                <div className="text-red-500 text-sm ms-2">
                  {touched.currentPassword && errors.currentPassword}
                </div>
              </div>
              <div className="w-full md:w-1/2 my-2">
                <label htmlFor="new-pass" className="text-main-800 dark:text-main-25 text-base mb-2">
                  {t("form.new-pass")}
                </label>
                <div className="flex items-center gap-2 rounded-full border border-main-800 dark:bg-main-250 p-2">
                  <RiLockPasswordLine
                    color={`${isDark ? "white" : "#1D1D1D"}`}
                  />
                  <input
                    type={showPass.newPass ? "text" : "password"}
                    name="newPassword"
                    placeholder={t("form.new-pass")}
                    className="border-0 outline-none placeholder:text-main-500 dark:placeholder:text-main-1000 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newPassword}
                  />
                  <span onClick={() => handleToggleShowPass("newPass")}>
                    {showPass.newPass ? <FaRegEye /> : <TbEyeClosed />}
                  </span>
                </div>
                <div className="text-red-500 text-sm ms-2">
                  {touched.newPassword && errors.newPassword}
                </div>
              </div>
            </div>
            <div className="flex md:justify-between flex-wrap md:flex-nowrap gap-0 md:gap-2 text-white me-2">
              <div className="w-full md:w-1/2 my-2">
                <button
                  type="submit"
                  className="w-full bg-main-800 dark:bg-main-25 dark:text-main-1000 dark:font-bold rounded-full p-2 text-white disabled:opacity-50 my-2"
                  disabled={isSubmitting}
                >
                  {t("form.change-pass")}
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
