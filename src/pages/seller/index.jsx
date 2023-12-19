import { useStateProvider } from "../../context/StateContext";
import { GET_SELLER_DASHBOARD_DATA, HOST } from "../../utils/constants";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [{ userInfo }] = useStateProvider();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(undefined);
  useEffect(() => {
    const getBuyerDashboardData = async () => {
      const response = await axios.get(GET_SELLER_DASHBOARD_DATA, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setDashboardData(response.data.dashboardData);
      }
      console.log({ response });
    };
    if (userInfo) {
      getBuyerDashboardData();
      console.log(dashboardData?.dailyRevenue);
    }
  }, [userInfo]);

  const DashboardCard = ({ title, value, onClick }) => (
    <div
      className="shadow-lg mb-4 p-10 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl rounded-lg transition-all duration-300"
      onClick={onClick}
    >
      <h2 className="text-2xl pb-4">{title}</h2>
      <h3 className="text-sky-500 text-6xl font-extrabold">
        {value !== null && value !== undefined ? value : 0}
      </h3>
    </div>
  );

  return (
    <>
      {userInfo && (
        <div className="flex min-h-[80vh] my-10 mt-0 px-6 lg:px-32 gap-5">
          <div className="shadow-md h-max p-12 flex flex-col gap-5 min-w-[240px] w-96 bg-white rounded-lg">
            <div className="flex gap-5 justify-center items-center">
              <div>
                {userInfo?.image ? (
                  <Image
                    src={userInfo.image}
                    alt="Profile"
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative">
                    <span className="text-5xl text-white">
                      {userInfo.email[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#62646a] text-lg font-medium">
                  {userInfo.username}
                </span>
                <span className="font-bold text-md">{userInfo.fullName}</span>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-6">
              <p className="text-gray-700">{userInfo.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 w-full">
            <DashboardCard
              title="Total Gigs"
              value={dashboardData?.gigs}
              onClick={() => router.push("/seller/gigs")}
            />
            <DashboardCard
              title="Total Orders"
              value={dashboardData?.orders}
              onClick={() => router.push("/seller/order")}
            />
            <DashboardCard
              title="Unread Messages"
              value={dashboardData?.unreadMessages}
              onClick={() => router.push("/seller/unread-messages")}
            />
            <DashboardCard
              title="Earnings Today"
              value={`LKR ${
                dashboardData?.dailyRevenue !== null &&
                dashboardData?.dailyRevenue !== undefined
                  ? dashboardData?.dailyRevenue
                  : 0
              }`}
            />
            <DashboardCard
              title="Earnings Monthly"
              value={`LKR ${
                dashboardData?.monthlyRevenue !== null &&
                dashboardData?.monthlyRevenue !== undefined
                  ? dashboardData?.monthlyRevenue
                  : 0
              }`}
            />
            <DashboardCard
              title="Earnings Yearly"
              value={`LKR ${
                dashboardData?.revenue !== null &&
                dashboardData?.revenue !== undefined
                  ? dashboardData?.revenue
                  : 0
              }`}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
