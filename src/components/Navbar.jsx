import React, { useEffect, useState } from "react";
import SkilledLogo from "./landing/SkilledLogo";
import { useStateProvider } from "@/context/StateContext";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { GET_USER_INFO, HOST } from "@/utils/constants";
import { reducerCases } from "@/context/constants";
import ContextMenu from "./search/ContextMenu";

function Navbar() {


  const handleLogin = () => {
    if (showSignupModal) {
      dispatch({
        type: reducerCases.TOGGLE_SIGNUP_MODAL,
        showSignupModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
  };

  const handleSignup = () => {
    if (showLoginModal) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
  };

  const [cookies] = useCookies();
  const router = useRouter();
  const [isFixed, setIsFixed] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [{ showLoginModal, showSignupModal, isSeller, userInfo }, dispatch] =
    useStateProvider();

  useEffect(() => {
    if (router.pathname === "/") {
      const positionNavbar = () => {
        window.pageYOffset > 0 ? setIsFixed(true) : setIsFixed(false);
      };
      window.addEventListener("scroll", positionNavbar);
      return () => window.removeEventListener("scroll", positionNavbar);
    } else {
      setIsFixed(true);
    }
  }, [router.pathname]);

  const links = [
    // { linkName: "Skilled Business", handler: "#", type: "link" },
    // { linkName: "Explore", handler: "#", type: "link" },
    // { linkName: "English", handler: "#", type: "link" },
    // { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Sign in", handler: handleLogin, type: "button" },
    { linkName: "Sign up", handler: handleSignup, type: "button2" },
  ];

  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      const getUserInfo = async () => {
        try {
          const {
            data: { user },
          } = await axios.post(
            GET_USER_INFO,
            {},
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${cookies.jwt}`,
              },
            }
          );
          console.log({ user });

          let projectedUserInfo = { ...user };
          // if (user.image) {
          //   projectedUserInfo = {
          //     ...projectedUserInfo,
          //     imageName: HOST + "/" + user.image,
          //   };
          // }
          delete projectedUserInfo.image;
          dispatch({
            type: reducerCases.SET_USER,
            userInfo: projectedUserInfo,
          });
          setIsLoaded(true);
          console.log({ user });
          
          if (user.isProfileSet === false) {
            router.push("/profile");
          } else {
            setIsLoaded(true);
          }
        } catch (err) {
          console.log(err);
        }
      };

      getUserInfo();
    } else {
      setIsLoaded(true);
    }
  }, [cookies, userInfo, dispatch]);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const handleOrdersNavigate = () => {
    if (isSeller) router.push("/seller/order");
    else router.push("/buyer/order");
  };

  const handleModeSwitch = () => {
    if (isSeller) {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/buyer/order");
    } else {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/seller");
    }
  };

  const ContextMenuData = [
    {
      name: "Profile",
      callback: (e) => {
        e.stopPropagation();

        setIsContextMenuVisible(false);
        router.push("/profile");
      },
    },
    {
      name: "Logout",
      callback: (e) => {
        e.stopPropagation();

        setIsContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ];

  //give me the code, if the userRole is ADMIN then user should be redirected to admin dashboard
  if (userInfo && userInfo.userRole === "ADMIN") {
     router.push("/admin");
   }






  return (
    <>
      {isLoaded && (
        <nav
          className={`w-full px-24 flex justify-between items-center py-6  top-0 z-30 transition-all duration-300 ${
            isFixed || userInfo
              ? "fixed bg-white border-b border-gray-200  dark:bg-gray-800 dark:text-gray-200"
              : "absolute bg-transparent border-transparent"
          }`}
        >
          <div>
            <Link href="/">
              <img className="w-64" src="/skilled-logo.png"></img>
            </Link>
          </div>
          <div
            className={`flex ${
              isFixed || userInfo ? "opacity-100" : "opacity-0"
            }`}
          >
            <input
              type="text"
              placeholder="What service are you looking for today?"
              className="w-[30rem] py-2.5 px-4 border rounded-l-lg dark:bg-gray-800"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button
              className="bg-gray-500 py-1.5 text-white w-16 flex justify-center items-center rounded-r-lg  dark:bg-gray-600 dark:text-gray-200"
              onClick={() => {
                setSearchData("");
                router.push(`/search?q=${searchData}`);
              }}
            >
              <IoSearchOutline className="fill-white text-white h-6 w-6 " />
            </button>
          </div>
          {!userInfo ? (
            <ul className="flex gap-10 items-center">
              {links.map(({ linkName, handler, type }) => {
                return (
                  <li
                    key={linkName}
                    className={`${
                      isFixed ? "text-black" : "text-white"
                    } font-medium`}
                  >
                    {type === "link" && <Link href={handler}>{linkName}</Link>}
                    {type === "button" && (
                      <button onClick={handler}>{linkName}</button>
                    )}
                    {type === "button2" && (
                      <button
                        onClick={handler}
                        className={`border   text-md font-semibold py-1 px-3 rounded-sm ${
                          isFixed
                            ? "border-[#1DBF73] text-[#1DBF73]"
                            : "border-white text-white"
                        } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-500
                        dark:bg-sky-800 hover:dark:bg-sky-600`}
                      >
                        {linkName}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="flex gap-10 items-center">
              {isSeller && (
                <li
                  className="cursor-pointer text-[#ffffff] font-medium bg-sky-500 hover:bg-sky-400 px-4 py-2 rounded-md  dark:bg-blue-500 dark:text-gray-200 dark:bg-sky-800 hover:dark:bg-sky-600"
                  onClick={() => router.push("/seller/gigs/create")}
                >
                  Create Gig
                </li>
              )}
              {isSeller && (
                <li
                  className="cursor-pointer text-[#ffffff] font-medium bg-sky-500 hover:bg-sky-400 px-4 py-2 rounded-md  dark:text-gray-200 dark:bg-sky-800 hover:dark:bg-sky-600"
                  onClick={() => router.push("/seller")}
                >
                  Dashboard
                </li>
              )}
              <li
                className="cursor-pointer text-[#ffffff] bg-sky-500 hover:bg-sky-400 px-4 py-2 rounded-md font-medium dark:text-gray-200 dark:bg-sky-800 hover:dark:bg-sky-600"
                onClick={handleOrdersNavigate}
              >
                Orders 
              </li>

              {isSeller ? (
                <li
                  className="cursor-pointer font-medium"
                  onClick={handleModeSwitch}
                >
                  Switch To Buyer
                </li>
              ) : (
                <li
                  className="cursor-pointer font-medium"
                  onClick={handleModeSwitch}
                >
                  Switch To Freelancer
                </li>
              )}
              <li
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsContextMenuVisible(true);
                }}
                title="Profile"
              >
                {userInfo?.image ? (
                  <Image
                    src={userInfo.image}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative dark:bg-blue-400">
                    <span className="text-xl text-white">
                      {userInfo &&
                        userInfo?.email &&
                        userInfo?.email.split("")[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </li>
            </ul>
          )}
          {isContextMenuVisible && <ContextMenu data={ContextMenuData} />}
        </nav>
      )}
    </>
  );
}

export default Navbar;
