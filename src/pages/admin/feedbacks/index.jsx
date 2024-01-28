import { GET_ALL_FEEDBACKS } from "../../../utils/constants";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

function FeedbackManagement() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const getAllFeedbacks = async () => {
            try {
                const response = await axios.get(GET_ALL_FEEDBACKS); 
                console.log(response.data);
                setFeedbacks(response.data);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
            }
        };

        getAllFeedbacks();
    }, []);

    return (
        <div className=" mt-0 px-32 pt-20 p-6 pb-24 dark:bg-gray-800 dark:text-gray-200" >
            <h3 className="m-5 text-2xl font-semibold">All Feedbacks</h3>
            
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Feedback ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Full Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr
                                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={feedback.id}
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {feedback.id}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {feedback.fullName}
                                </td>
                                <td className="px-6 py-4">{feedback.description}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default FeedbackManagement;
