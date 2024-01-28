
import { GET_ALL_USERS } from "../../../utils/constants";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(GET_ALL_USERS); // Replace with your API endpoint
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getAllUsers();
  }, []);

  return (
    <div className=" mt-0 px-32 pt-20 p-6 pb-64 dark:bg-gray-800 dark:text-gray-200" >
      <h3 className="m-5 text-2xl font-semibold">All Users</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
           
            {users.map(({ id, username, email, userRole }) => (
              <tr
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {username}
                </th>
                <td className="px-6 py-4">{email}</td>
                <td className="px-6 py-4">{userRole}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/users/edit/${id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/users/delete/${id}`}
                    className="font-medium text-red-600 dark:red-blue-500 hover:underline"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
