import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { IoLockClosedOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import axiosInstance from "../../interceptor";
import img from "/login.png";
import { toast } from "react-toastify";

const Login = ({ handleLog }) => {
  const navigate = useNavigate();
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
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
        <h1 className="text-primary text-4xl font-secondary uppercase fixed top-8 left-4 lg:left-16">
          APEX
        </h1>
        <h3 className="ml-2 font-bold text-grey-600 text-2xl mt-[100px] lg:mt-0">
          Welcome Back
        </h3>
        <h5 className="ml-2 text-xs text-main-400 mb-4 font-semibold">
          Please enter your details
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
              <div className="my-2">
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
              <button
                type="submit"
                className="w-full bg-main-800 border rounded-full p-2 text-white disabled:opacity-50 my-2"
                disabled={isSubmitting}
              >
                Login
              </button>
              <div className="text-sm font-bold text-main-400 mt-2 ml-2">
                Don&apos;t have an account? &nbsp;
                <span
                  className="cursor-pointer text-grey-600"
                  onClick={() => navigate("/register", { replace: true })}
                >
                  Sign up
                </span>
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
