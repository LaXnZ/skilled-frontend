import { useCookies } from "react-cookie";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../utils/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { useRouter } from "next/router";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";

function AuthWrapper({ type }) {
  const [cookies, setCookies] = useCookies();
  const [{ showLoginModal, showSignupModal }, dispatch] = useStateProvider();
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({ email: "", password: "" });
  const [refresh, setRefresh] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: value ? "" : "This field is required" });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8; // Adjust the length as needed
  };

  const handleClick = async () => {
    try {
      const { email, password } = values;
      const formErrors = Object.keys(values).reduce((acc, key) => {
        if (!values[key]) {
          acc[key] = "This field is required";
        }
        return acc;
      }, {});

      // Validate email
      if (!email || !validateEmail(email)) {
        formErrors.email = "Please enter a valid email address";
      }

      // Validate password
      if (!password || !validatePassword(password)) {
        formErrors.password = "Password must be at least 8 characters long";
      }

      setErrors(formErrors);

      if (Object.keys(formErrors).length === 0) {
        const {
          data: { user, jwt },
        } = await axios.post(
          type === "login" ? LOGIN_ROUTE : SIGNUP_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        setCookies("jwt", { jwt: jwt });
        dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });
        if (user) {
          dispatch({ type: reducerCases.SET_USER, userInfo: user });
          setRefresh(!refresh);
          //window.location.reload();
        }
      }
    } catch (err) {
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data === "Email Already Registered"
      ) {
        // Email is already registered, update the error state
        setErrors({ ...errors, email: "This email is already registered" });
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const html = document.querySelector("html");
    const authModal = document.querySelector("#auth-modal");
    const blurDiv = document.querySelector("#blur-div");
    html.style.overflowY = "hidden";
    const handleBlurDivClick = () => {
      // dispatch(closeAuthModal());
    };
    const handleAuthModalClick = (e) => {
      // e.stopPropagation();
    };
    authModal?.addEventListener("click", handleAuthModalClick);
    blurDiv?.addEventListener("click", handleBlurDivClick);

    return () => {
      const html = document.querySelector("html");
      html.style.overflowY = "initial";
      blurDiv?.removeEventListener("click", handleBlurDivClick);
      authModal?.removeEventListener("click", handleAuthModalClick);
    };
  }, [dispatch, showLoginModal, showSignupModal, refresh]);

  return (
    <div className="fixed top-0 z-[100]">
      <div
        className="h-[100vh] w-[100vw] backdrop-blur-md fixed top-0"
        id="blur-div"
      ></div>
      <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center ">
        <div
          className="fixed z-[101] h-max w-max bg-white flex flex-col justify-center items-center dark:bg-gray-800 dark:text-gray-200"
          id="auth-modal"
        >
          <div className="flex flex-col justify-center items-center p-8 gap-7 dark:bg-gray-700 ">
            <h3 className="text-2xl font-semibold text-slate-900  dark:text-slate-200">
              {type === "login" ? "Sign In " : "Sign Up "}
              to Skilled
            </h3>
            {/* <div className="flex flex-col gap-5">
              <button className="text-white bg-blue-500 p-3 font-semibold w-80 flex items-center justify-center relative">
                <MdFacebook className="absolute left-4 text-2xl" />
                Continue with Facebook
              </button>
              <button className="border border-slate-300 p-3 font-medium w-80 flex items-center justify-center relative">
                <FcGoogle className="absolute left-4 text-2xl" />
                Continue with Google
              </button>
            </div>
            <div className="relative  w-full text-center">
              <span className="before:content-[''] before:h-[0.5px] before:w-80 before:absolute before:top-[50%] before:left-0 before:bg-slate-400">
                <span className="bg-white relative z-10 px-2">OR</span>
              </span>
            </div> */}
            <div className="flex flex-col gap-5 ">
              <input
                type="text"
                name="email"
                placeholder="Email / Username"
                onChange={handleChange}
                className={`border ${
                  errors.email ? "border-red-500" : "border-slate-300 dark:bg-gray-700 "
                } p-3 w-80`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
              <input
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className={`border ${
                  errors.password ? "border-red-500" : "border-slate-300 dark:bg-gray-700 "
                } p-3 w-80`}
                name="password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
              <button
                className="bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md p-3 w-80 dark:bg-gray-800"
                onClick={handleClick}
                type="button"
              >
                Continue
              </button>
            </div>
          </div>
          <div className="py-5 w-full flex items-center justify-center border-t border-slate-400">
            <span className="text-sm  text-slate-700 dark:text-slate-200">
              {" "}
              {type === "login" ? (
                <>
                  Not a member yet?&nbsp;
                  <span
                    className="text-[#1DBF73] cursor-pointer "
                    onClick={() => {
                      dispatch({
                        type: reducerCases.TOGGLE_SIGNUP_MODAL,
                        showSignupModal: true,
                      });
                      dispatch({
                        type: reducerCases.TOGGLE_LOGIN_MODAL,
                        showLoginModal: false,
                      });
                    }}
                  >
                    Join Now
                  </span>
                </>
              ) : (
                <>
                  Already a member?&nbsp;
                  <span
                    className="text-[#1DBF73] cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: reducerCases.TOGGLE_SIGNUP_MODAL,
                        showSignupModal: false,
                      });
                      dispatch({
                        type: reducerCases.TOGGLE_LOGIN_MODAL,
                        showLoginModal: true,
                      });
                    }}
                  >
                    Login Now
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthWrapper;
