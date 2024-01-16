import React from "react";
import { useRouter } from 'next/router';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import PayPalPayment from "@/pages/PayPalPayment";
import checkout from "@/pages/checkout";


const paymentOptions = ({  }) => {
  debugger
  const router = useRouter()
  const gigId = router.query.gigId;
  console.log("paymentOptions")

  // const history = useHistory();

  const handleClick= () => {
    // Redirect to the PayPal payment page
    console.log("PayPal")
    router.push(`/PayPalPayment?gigId=${gigId}`);
  };

  const handleClick1 = () => {
    // Redirect to the Stripe checkout page
    router.push(`/checkout?gigId=${gigId}`);
  };

  return (
    // <div className="App">
    //   {/* <h1>Payment Options</h1> */}
    //    <h1>Payment Page</h1>
    //    <nav>
    //     <ul>
    //        <li>
    //          <button onClick={handleClick}>PayPal</button>
    //        </li>
    //        <li>
    //          <button onClick={handleClick1}>Stripe</button>
    //       </li>
    //    </ul>
    //   </nav>
    //  </div>
    <div className="min-h-[75vh] py-10 mt-0 px-32  dark:bg-gray-800 dark:text-gray-200">
    <h1 className="text-4xl text-center mb-8">Choose Your Convenient Payment Option </h1>

    <nav>
    <ul className="flex flex-col items-center py-8">
        <li>
          <button
            onClick={handleClick}
            className="text-white bg-sky-500 hover:bg-sky-400 font-medium text-lg px-10 py-3 rounded-md mb-4 dark:bg-sky-800 hover:dark:bg-sky-600"
                     
          >
            Pay with PayPal
          </button>
        
        </li>
        <li>
          <button
            onClick={handleClick1}
            className=" text-white bg-sky-500 hover:bg-sky-400 font-medium text-lg px-10 py-3 rounded-md dark:bg-sky-800 hover:dark:bg-sky-600"
          >
            Pay with Stripe
          </button>
        </li>
      </ul>
    </nav>
  </div>
  );
};


export default paymentOptions;
