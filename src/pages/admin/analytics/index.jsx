import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_ADMIN_ANALYTICS } from '../../../utils/constants';

const Analytics = (props) => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const getAdminAnalytics = async () => {
      try {
        const response = await axios.get(GET_ADMIN_ANALYTICS);
        if (response.status === 200) {
          setDashboardData(response.data);
          console.log(response.data);
          // console.log(dashboardData); // This might log the old state, not the updated one
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    getAdminAnalytics();
  }, []);
  
  // Log the updated state after the component re-renders
  useEffect(() => {
    console.log("Updated Dashboard Data:", dashboardData?.adminDashboardData?.totalRevenue);
  }, [dashboardData]); // This will run whenever dashboardData changes
  

  return (
    <div className="analytics-container pt-16 p-6 pb-12 dark:bg-gray-800 dark:text-gray-200">
      <h1 className="text-5xl text-center font-bold mb-16 ">Analytics</h1>

      <div className="grid grid-cols-2 grid-rows-2 gap-10  ">
        {/* Top Row */}
        <div className="flex-1 bg-sky-100 dark:bg-gray-700 dark:border-gray-300  p-20 first-letter: rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 text-center">
          <h2 className="text-4xl text-center font-semibold mb-8">Total Sales</h2>
          <p className='text-3xl'>LKR {dashboardData?.adminDashboardData?.totalRevenue}</p>
        </div>

        <div className="flex-1 bg-sky-100 dark:bg-gray-700 dark:border-gray-300  p-20 first-letter: rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 text-center">
          <h2 className="text-4xl text-center font-semibold mb-8">Total Gigs</h2>
          <p className='text-3xl'>{dashboardData?.adminDashboardData?.totalGigs}</p>
        </div>

        {/* Bottom Row */}
        <div className="flex-1 bg-sky-100 dark:bg-gray-700 dark:border-gray-300  p-20 first-letter: rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 text-center">
          <h2 className="text-4xl text-center font-semibold mb-8">Total Orders</h2>
          <p className='text-3xl'>{dashboardData?.adminDashboardData?.totalOrders}</p>
        </div>

        <div className="flex-1 bg-sky-100 dark:bg-gray-700 dark:border-gray-300  p-20 first-letter: rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 text-center">
          <h2 className="text-4xl text-center font-semibold mb-8">Total Users</h2>
          <p className='text-3xl'>{dashboardData?.adminDashboardData?.totalUsers}</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;