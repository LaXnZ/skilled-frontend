import axios from 'axios';
import { useState } from 'react';

function FeedbackForm() {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/feedback', { user_id: 1, feedback, rating });
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-6 py-8 mb-4 dark:bg-gray-800 dark:text-gray-200">
            <h2 className="text-1xl font-bold mb-4 text-gray-50 ">We'd love to hear from you!</h2>

            <h2 className="text-4xl font-bold mb-4 text-gray-50 ">Feedback Form</h2>

            <div className="mb-8">
                <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="feedback">
                    Feedback:
                </label>
                <textarea
                    className="resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="feedback"
                    rows="5"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
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
