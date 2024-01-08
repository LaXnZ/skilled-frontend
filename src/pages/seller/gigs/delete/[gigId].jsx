import { DELETE_GIG_ROUTE } from '@/utils/constants';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const DeleteGigPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (message) {
      setShowPopup(true);
      const timeout = setTimeout(() => {
        setShowPopup(false);
        router.back(); // Redirect to the previous page after a delay
      }, 2000); // Adjust the delay as needed

      return () => clearTimeout(timeout);
    }
  }, [message, router]);

  const handleDelete = async () => {
    const { gigId } = router.query;

    try {
      const response = await fetch(`${DELETE_GIG_ROUTE}/${gigId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Gig deleted successfully.');
      } else {
        setMessage('Failed to delete gig.');
      }
    } catch (error) {
      setMessage('An error occurred while deleting the gig.');
    }
  };

  return (
         
        <div className=" dark:bg-gray-800 dark:text-gray-200">
        <div className="bg-white p-6 shadow-lg rounded-lg mx-auto pt-32 pb-96 max-w-md text-center dark:bg-gray-800 dark:text-gray-200">
        <h1 className="text-2xl font-semibold mb-4 ">Delete Gig</h1>
        <p className="mb-4">Are you sure you want to delete this gig?</p>
        <div className="flex justify-center space-x-4 dark:bg-gray-800 dark:text-gray-200">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition-colors"
          >
            Delete Gig
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 transition-colors">
            <a href="/seller/gigs">Cancel</a>
          </button>
        </div>
        {showPopup && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center ">
            <div className="bg-white p-4 rounded shadow-md">
              <p className="text-green-500 font-semibold text-sm">{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteGigPage;
