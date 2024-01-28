import { useState } from 'react';
import axios from 'axios';
import { ADD_FEEDBACK } from '@/utils/constants';
import { useHistory } from 'react-router-dom';
import { BsBack } from 'react-icons/bs';

function FeedbackForm() {
    const [fullName, setFullName] = useState('');
    const [description, setDescription] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [isProfileInfoSet, setIsProfileInfoSet] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(ADD_FEEDBACK, {
                userId: 1,
                fullName,
                description,
                profileImage,
                isProfileInfoSet,
            });
           
            alert('Thank you for your feedback!');

            setFullName('');
            setDescription('');
            setProfileImage('');
            setIsProfileInfoSet(false);

            router.push("/buyer/order");



        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-6 py-8 mb-4 dark:bg-gray-800 dark:text-gray-200 ">
            <h2 className="text-1xl font-bold mb-4 text-gray-50 ">We'd love to hear from you!</h2>

            <h2 className="text-4xl font-bold mb-4 text-gray-50 ">Feedback Form</h2>

            <div className="mb-8">
                <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="fullName">
                    Full Name:
                </label>
                <input
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </div>

            <div className="mb-8">
                <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="description">
                    Description:
                </label>
                <textarea
                    className="resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div className="mb-8">
                <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="profileImage">
                    Profile Image:
                </label>
                <input
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="profileImage"
                    type="text"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    required
                />
            </div>

            <div className="mb-8">
                <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="isProfileInfoSet">
                    Is Profile Info Set:
                </label>
                <input
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="isProfileInfoSet"
                    type="checkbox"
                    checked={isProfileInfoSet}
                    onChange={(e) => setIsProfileInfoSet(e.target.checked)}
                />
            </div>

            <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
}

export default FeedbackForm;
