import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import axiosInstance from "../../interceptor";
import img from "/register.png";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center md:h-screen md:overflow-hidden min-h-screen">
      <div className="w-full p-4 md:p-8 md:w-2/3 lg:w-1/2">
        <h1 className="text-primary text-4xl font-secondary uppercase fixed top-8 left-4 md:left-10">
          APEX
        </h1>
        <h5 className="ml-2 text-xs text-main-400 font-semibold mt-[100px] md:mt-0">
          Start for free
        </h5>
        <h3 className="ml-2 font-bold text-grey-600 text-2xl mb-4">
          Create new account
        </h3>
        <Formik
          initialValues={{
            email: "",
            password: "",
            fname: "",
            lname: "",
            confirmPassword: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.fname) {
              errors.fname = "First name is required";
            }
            if (!values.lname) {
              errors.lname = "Last name is required";
            }
            if (!values.email) {
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password is required";
            } else if (
              !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)
            ) {
              errors.password =
                "Invalid password, minimum 8 characters, at least one letter and one number";
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = "Confirm password is required";
            }
            if (
              values.confirmPassword &&
              values.password !== values.confirmPassword
            ) {
              errors.confirmPassword = "Passwords must match";
            }
            return errors;
          }}
          onSubmit={async (
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
          }}
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
                  <div className="flex items-center gap-2 border rounded-full bg-main-300 p-2">
                    <FaRegUser color="white" />
                    <input
                      type="text"
                      name="fname"
                      placeholder="First Name"
                      className="border-0 outline-none placeholder:text-slate-200 w-full"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fname}
                    />
                  </div>
                  <div className="text-red-500 text-sm ml-2">
                    {touched.fname && errors.fname}
                  </div>
                </div>
                <div className="w-full md:w-1/2 my-2">
                  <div className="flex items-center gap-2 border rounded-full bg-main-300 p-2">
                    <FaRegUser color="white" />
                    <input
                      type="text"
                      name="lname"
                      placeholder="Last Name"
                      className="border-0 outline-none placeholder:text-slate-200 w-full"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lname}
                    />
                  </div>
                  <div className="text-red-500 text-sm ml-2">
                    {touched.lname && errors.lname}
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="flex items-center gap-2 border rounded-full bg-main-300 my-1 p-2">
                  <AiOutlineMail color="white" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border-0 outline-none placeholder:text-slate-200 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
                <div className="text-red-500 text-sm ml-2">
                  {touched.email && errors.email}
                </div>
              </div>
              <div className="my-4  md:my-2">
                <div className="flex items-center gap-2 border rounded-full bg-main-300 my-1 p-2">
                  <IoLockClosedOutline color="white" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border-0 outline-none placeholder:text-slate-200 w-full"
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
                <div className="flex items-center gap-2 border rounded-full bg-main-300 my-1 p-2">
                  <IoLockClosedOutline color="white" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="border-0 outline-none placeholder:text-slate-200 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                </div>
                <div className="text-red-500 text-sm ml-2">
                  {touched.confirmPassword && errors.confirmPassword}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-main-800 border rounded-full p-2 text-white disabled:opacity-50 my-2"
                disabled={isSubmitting}
              >
                Create account
              </button>
              <div className="text-sm font-bold text-main-400 mt-2 ml-2">
                Already have an account? &nbsp;
                <span
                  className="cursor-pointer text-[#464646]"
                  onClick={() => navigate("/login", { replace: true })}
                >
                  Login
                </span>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className="hidden md:block w-1/3 lg:w-1/2">
        <img src={img} alt="Register" />
      </div>
    </div>
  );
};

export default Register;
