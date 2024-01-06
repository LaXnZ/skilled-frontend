import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GET_USER_INFO, HOST } from "@/utils/constants";
import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";


const AdminDashboard = () => {
  const router = useRouter();
  const [cookies] = useCookies();
  const [{ userInfo }, dispatch] = useStateProvider();
  const [isLoaded, setIsLoaded] = useState(false);


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

  if (userInfo && userInfo.userRole === "ADMIN") {
    router.push("/admin");
  }

  
  // useEffect(() => {
  //   if (!userInfo) {
  //     router.push("/");
  //   }
  // }, [cookies, userInfo, router]);
  
  return (
    <div className="flex ">
   
      <div className="w-1/5 h-screen bg-gray-700 p-6 text-black dark:text-gray-200  mt-0 -mt-1 ">
      <h2 className="text-4xl font-bold mb-8">Quick Actions</h2>
      <ul>
        <li className="mb-4">
          <a href="/admin" className="flex items-center text-lg  hover:bg-blue-400 dark:text-gray-200 px-4 py-2 rounded transition-all duration-300 ">
            <span className="mr-2">🏠</span> Dashboard
          </a>
        </li>
        <li className="mb-4">
          <a href="/admin/users" className="flex items-center text-lg  hover:bg-blue-400 dark:text-gray-200 px-4 py-2 rounded transition-all duration-300 ">
            <span className="mr-2">👥</span> Manage Users
          </a>
        </li>
        <li className="mb-4">
          <a href="/admin/gigs" className="flex items-center text-lg  hover:bg-blue-400 dark:text-gray-200 px-4 py-2 rounded transition-all duration-300">
            <span className="mr-2">📦</span> Manage Gigs
          
            
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center text-lg  hover:bg-blue-400 dark:text-gray-200 px-4 py-2 rounded transition-all duration-300">
            <span className="mr-2">📂</span> Statistics
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center text-lg  hover:bg-blue-400 dark:text-gray-200 px-4 py-2 rounded transition-all duration-300">
            <span className="mr-2">📊</span> Analytics
          </a>
        </li>
      </ul>
      
      <div className="mt-8 flex justify-center">
      <button
  className="border text-md font-semibold px-3 py-2 bg-sky-500 hover:bg-sky-400 dark:text-gray-200 text-white rounded-md mt-4 dark:bg-sky-800 hover:dark:bg-sky-600"
  type="button">
  New Features
  </button>
      </div>
    </div>

      {/* Main Content */}
<div className="flex-1 p-10 dark:bg-gray-800 dark:text-gray-200">
  <div className="mb-8 text-center mt-1">
    <h1 className="text-5xl font-bold mb-4">Admin Dashboard</h1>
    <p className="text-gray-700 dark:text-gray-200">Manage users, gigs, and view analytics</p>
  </div>

  
  <div className="grid grid-cols-2 grid-rows-2 gap-4  ">
    {/* Manage Users */}
    <div className="flex items-center justify-center bg-sky-100 dark:bg-gray-700 dark:border-gray-300 p-10 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2">
  <div className="text-center">
    <h3 className="text-xl font-semibold mb-4">Manage Users</h3>
    <p className="text-sm text-gray-600 dark:text-gray-200">All Users</p>
    <button
  className="border text-md font-semibold px-3 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-md mt-4 dark:bg-sky-800 hover:dark:bg-sky-600"
  type="button"
  onClick={() => router.push("/admin/users")}>
  View Details
  </button>
  </div>
</div>


    {/* Manage Gigs */}
    <div className="bg-sky-100 dark:bg-gray-700 dark:border-gray-300 p-10 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 text-center">
  <h3 className="text-xl font-semibold mb-4">Manage Gigs</h3>
  <p className="text-sm text-gray-600 dark:text-gray-200">All Gigs</p>
  <button
  className="border text-md font-semibold px-3 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-md mt-4 dark:bg-sky-800 hover:dark:bg-sky-600"
  type="button"
  onClick={() => router.push("/admin/gigs")}
  >
    
  View Details
  </button>
</div>


    {/* Manage Stats */}
    <div className="bg-sky-100 dark:bg-gray-700 dark:border-gray-300  p-10 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 text-center">
  <h3 className="text-xl font-semibold mb-4">Statistics</h3>
  <p className="text-sm text-gray-600 dark:text-gray-200">All Categories</p>
  <button
  className="border text-md font-semibold px-3 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-md mt-4 dark:bg-sky-800 hover:dark:bg-sky-600"
  type="button">
  View Details
  </button>

</div>


    {/* Analytics */}
    <div className="bg-sky-100 dark:bg-gray-700 dark:border-gray-300  p-10 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 text-center">
  <h3 className="text-xl font-semibold mb-4">Analytics</h3>
  <p className="text-sm text-gray-600 dark:text-gray-200 ">All Categories</p>
  <button
  className="border text-md font-semibold px-3 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-md mt-4 dark:bg-sky-800 hover:dark:bg-sky-600"
  type="button">
  View Details
  </button>
</div>

  </div>
</div>

    </div>
  );
};

export default AdminDashboard;
