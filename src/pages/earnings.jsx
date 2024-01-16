import React, { useState } from "react";
import { useRouter } from 'next/router';

const earnings = ({}) => {
  const router = useRouter()
  const withdrawOptions = [2000, 5000, 10000, 50000,100000];
  const [isDisabled, setIsDisabled] = useState(false);    // to disable the withdraw button after clicking it
  const handleWithdraw = (amount) => {
    // Add your withdrawal logic here
    alert(`You have Withdrawal LKR ${amount} !`);
    setIsDisabled(true);
    const successMessage = document.getElementById("successMessage");
    successMessage.textContent = `Withdrawal of LKR ${amount} successful!`;
    
    setTimeout(() => {
      router.push(`/seller`);
    }, 2000);   // delaying the page by 2 seconds to show the success message
  };
  return (
    <div class="min-h-[80vh]  justify-center pt-2 mt-0 px-32 dark:bg-gray-800 dark:text-gray-200">
      <h1 class=" flex flex-col text-4xl items-center py-8">Withdraw Page</h1>
      <label
        class=" flex flex-col items-center  text-gray-400 text-sm font-bold mb-2"
        htmlFor="amount"
      >
        Select Amount:
      </label>
      <div class="flex flex-col items-center py-2">
        <select
          id="amount"
          name="amount"
          class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:bg-slate-800 dark:border-gray-300 w-48 p-2 mb-4"
        >
          {withdrawOptions.map((amount) => (
            <option key={amount} value={amount}>
              {amount}
            </option>
          ))}
        </select>
      </div>
      <div class="flex flex-col items-center py-10">
        <button
          disabled={isDisabled}
          class={`text-white bg-sky-500 hover:bg-sky-400 font-medium text-lg px-10 py-3 rounded-md mb-4 dark:bg-sky-800 hover:dark:bg-sky-600 ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() =>
            handleWithdraw(document.getElementById("amount").value)
          }
        >
          Withdraw
        </button>
        <div id="successMessage" class="text-green-500 font-bold"></div>
      </div>
    </div>
  );
};

export default earnings;
