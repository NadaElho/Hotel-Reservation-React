import { Formik } from "formik";
import axiosInstance from "../../interceptor";
import { LanguageContext } from "../providers/LanguageContext";
import { useContext, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineEdit, MdOutlinePhone } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get(
        `/users/${localStorage.getItem("userId")}`
      );
      setUserData(data.data);
    })();
  }, []);

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
      errors.phone = t("form.invalid-phone");
    }
    if (!values.phone) {
      errors.phone = t("form.phone-req");
    } else if (!/^\d{11}$/i.test(values.phone)) {
      errors.phone = t("form.invalid-phone");
    }

    return errors;
  };

  const onSubmit = async (
    { fname, lname, phone, email, emergencyContact, gender },
    { setSubmitting }
  ) => {
    try {
      await axiosInstance.patch(
        `/users/${localStorage.getItem("userId")}`,
        {
          firstName: fname,
          lastName: lname,
          phoneNumber: phone,
          emergencyContact,
          gender: gender,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    setSubmitting(false);
  };

  const isDark = localStorage.getItem("dark") == "dark";

  const [disabled, setDisabled] = useState({
    fName: true,
    lName: true,
    emergencyContact: true,
    phone: true,
    gender: true,
  });

  const toggleDisable = (property) => {
    setDisabled((prev) => ({ ...prev, [property]: !prev[property] }));
  };

  return (
    <div>
      <h2 className="text-2xl text-main-800 dark:text-main-50 py-5 font-medium">
        {t("booking.details")}
      </h2>
      {userData && (
        <Formik
          initialValues={{
            email: userData.email,
            fname: userData.firstName,
            lname: userData.lastName,
            phone: userData.phoneNumber,
            emergencyContact: userData.emergencyContact,
            gender: userData.gender,
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
              <div className="flex md:justify-between flex-wrap md:flex-nowrap gap-0 md:gap-2 text-white me-2">
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
                      disabled={disabled.fName}
                    />
                    <MdOutlineEdit
                      size={25}
                      onClick={() => toggleDisable("fName")}
                      className="cursor-pointer"
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
                      disabled={disabled.lName}
                    />
                    <MdOutlineEdit
                      size={25}
                      onClick={() => toggleDisable("lName")}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="text-red-500 text-sm ms-2">
                    {touched.lname && errors.lname}
                  </div>
                </div>
              </div>
              <div className="flex md:justify-between flex-wrap md:flex-nowrap gap-0 md:gap-2 text-white me-2">
                <div className="w-full md:w-1/2 my-2">
                  <div className="flex items-center gap-2 rounded-full bg-main-300 dark:bg-main-250 my-1 p-2">
                    <MdOutlinePhone color={`${isDark ? "#1D1D1D" : "white"}`} />
                    <input
                      type="text"
                      name="emergencyContact"
                      placeholder={t("form.emergencyContact")}
                      className="border-0 outline-none placeholder:text-slate-200 dark:placeholder:text-main-1000 w-full"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.emergencyContact}
                      disabled={disabled.emergencyContact}
                    />
                    <MdOutlineEdit
                      size={25}
                      onClick={() => toggleDisable("emergencyContact")}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="text-red-500 text-sm ms-2">
                    {touched.emergencyContact && errors.emergencyContact}
                  </div>
                </div>
                <div className="w-full md:w-1/2 my-2">
                  <div className="flex items-center gap-2 rounded-full bg-main-300 dark:bg-main-250 my-1 p-2">
                    <MdOutlinePhone color={`${isDark ? "#1D1D1D" : "white"}`} />
                    <input
                      type="text"
                      name="phone"
                      placeholder={t("form.phone")}
                      className="border-0 outline-none placeholder:text-slate-200 dark:placeholder:text-main-1000 w-full"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                      disabled={disabled.phone}
                    />
                    <MdOutlineEdit
                      size={25}
                      onClick={() => toggleDisable("phone")}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="text-red-500 text-sm ms-2">
                    {touched.phone && errors.phone}
                  </div>
                </div>
              </div>
              <div className="flex md:justify-between flex-wrap md:flex-nowrap gap-0 md:gap-2 text-white me-2">
                <div className="w-full md:w-1/2 my-2">
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
                      disabled
                    />
                    <MdOutlineEdit
                      size={25}
                      onClick={() => toggleDisable("phone")}
                      className="opacity-0"
                    />
                  </div>
                  <div className="text-red-500 text-sm ms-2">
                    {touched.email && errors.email}
                  </div>
                </div>
                <div className="w-full md:w-1/2 my-2">
                  <div className="flex items-center gap-2 rounded-full bg-main-300 dark:bg-main-250  p-2">
                    <FaRegUser color={`${isDark ? "#1D1D1D" : "white"}`} />
                    <select
                      name="gender"
                      className="focus:border-0 outline-none bg-main-300 w-full"
                      value={values.gender}
                      onChange={handleChange}
                      disabled={disabled.gender}
                    >
                      <option value="male" className="py-2">
                        male
                      </option>
                      <option value="female">female</option>
                    </select>
                    <MdOutlineEdit
                      size={25}
                      onClick={() => toggleDisable("gender")}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-main-800 dark:bg-main-25 dark:text-main-1000 dark:font-bold rounded-full p-2 text-white disabled:opacity-50 my-2"
                disabled={isSubmitting}
              >
                {t("Change")}
              </button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Account;
