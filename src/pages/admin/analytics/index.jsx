
import React from 'react';

const Analytics = (props) => {
  return (
    <div className="analytics-container p-6 dark:bg-gray-800 dark:text-gray-200">
      <h1 className="text-4xl text-center font-bold mb-4 ">Analytics</h1>

      <div className="grid grid-cols-2 grid-rows-2 gap-10  ">
        {/* Top Row */}
        <div className="flex-1 bg-sky-100 dark:bg-gray-700 dark:border-gray-300  p-20 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 text-center">
          <h2 className="text-xl text-center font-semibold mb-8">Total Sales</h2>
          {/* Display total sales data */}
        </div>

        <div className="flex-1 bg-sky-100 dark:bg-gray-700 dark:border-gray-300  p-20 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 text-center">
          <h2 className="text-xl text-center font-semibold mb-8">Total Gigs</h2>
          {/* Display total gigs data */}
        </div>

        {/* Bottom Row */}
        <div className="flex-1 bg-sky-100 dark:bg-gray-700 dark:border-gray-300  p-20 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 text-center">
          <h2 className="text-xl text-center font-semibold mb-8">Total Orders</h2>
          {/* Display total orders data */}
        </div>

        <div className="flex-1 bg-sky-100 dark:bg-gray-700 dark:border-gray-300  p-20 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 text-center">
          <h2 className="text-xl text-center font-semibold mb-8">Total Users</h2>
          {/* Display total users data */}
        </div>
      </div>
    </div>
  );
}

export default Analytics;