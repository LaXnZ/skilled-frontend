import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const sellerPortfolio = () => {
  const router = useRouter();

  return (
    <div className="flex-1 p-10">
      <div className="mb-8 text-center mt-1">
        <h1 className="text-4xl font-bold mb-4">Seller Portfolio</h1>
        <p className="text-gray-700"></p>
      </div>

       {/* Cover Image Section */}
       <div className="flex cover bg-gray-100 p-5 mb-8">
  <Image src="/.jpg" alt="Cover Image" layout="responsive" width={1000} height={10} />
</div>


        
      <div className="mb-8 text-center mt-8">
        <h1 className="text-3xl font-bold mb-4">About Me</h1>
        <p className="text-gray-700"></p>
      </div>
      

      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        {/* Box 1 */}
        <div className="flex items-center justify-center bg-sky-100 p-10 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Skill 1</h3>
            <p className="text-sm text-gray-600">Description 1</p>
            <button
              className="border text-md font-semibold px-3 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-md mt-4"
              type="button"
              onClick={() => router.push("/seller/skill1")}
            >
              View Details
            </button>
          </div>
        </div>

        {/* Box 2 */}
        <div className="flex items-center justify-center bg-sky-100 p-10 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Skill 2</h3>
            <p className="text-sm text-gray-600">Description 2</p>
            <button
              className="border text-md font-semibold px-3 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-md mt-4"
              type="button"
              onClick={() => router.push("/seller/skill2")}
            >
              View Details
            </button>
          </div>
        </div>

        {/* Box 2 */}
        <div className="flex items-center justify-center bg-sky-100 p-10 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Skill 2</h3>
            <p className="text-sm text-gray-600">Description 2</p>
            <button
              className="border text-md font-semibold px-3 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-md mt-4"
              type="button"
              onClick={() => router.push("/seller/skill2")}
            >
              View Details
            </button>
          </div>
        </div>

        {/* Box 2 */}
        <div className="flex items-center justify-center bg-sky-100 p-10 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Skill 2</h3>
            <p className="text-sm text-gray-600">Description 2</p>
            <button
              className="border text-md font-semibold px-3 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-md mt-4"
              type="button"
              onClick={() => router.push("/seller/skill2")}
            >
              View Details
            </button>
          </div>
        </div>

        {/* Box 2 */}
        <div className="flex items-center justify-center bg-sky-100 p-10 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Skill 2</h3>
            <p className="text-sm text-gray-600">Description 2</p>
            <button
              className="border text-md font-semibold px-3 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-md mt-4"
              type="button"
              onClick={() => router.push("/seller/skill2")}
            >
              View Details
            </button>
          </div>
        </div>

        {/* Box 2 */}
        <div className="flex items-center justify-center bg-sky-100 p-10 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Skill 2</h3>
            <p className="text-sm text-gray-600">Description 2</p>
            <button
              className="border text-md font-semibold px-3 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-md mt-4"
              type="button"
              onClick={() => router.push("/seller/skill2")}
            >
              View Details
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default sellerPortfolio;
