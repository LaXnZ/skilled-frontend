import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = () => {
   const serverURL = "http://localhost:3001";
  const createOrder = (data) => {

    // Order is created on the server and the order id is returned

    return fetch(`${serverURL}/my-server/create-paypal-order `, {

      method: "POST",

       headers: {

        "Content-Type": "application/json",

      },

      // use the "body" param to optionally pass additional order information

      // like product skus and quantities

      body: JSON.stringify({

        product:{
          description: "Skilled product",
          cost:"USD 1000"
        }

      }),

    })

    .then((response) => response.json())

    .then((order) => order.id);

  };

  const onApprove = (data) => {

     // Order is captured on the server and the response is returned to the browser

     return fetch(`${serverURL}/my-server/capture-paypal-order`, {

      method: "POST",

       headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        orderID: data.orderID

      })

    }).then((response) => {
      console.log("payment successful ", response.json())
      response.json()});

  };
  
  return ( 
    <div className="justify-center min-h-[80vh] px-96 py-20 mt-0 dark:bg-gray-800 dark:text-gray-200">
      <div className="text-center mb-8">
      <h1 className="text-3xl text-center mb-8">Please complete the payment to place the order.  </h1></div>
      <div className="text-center pl-14">
    <PayPalButtons 

    createOrder={(data , actions) => createOrder(data, actions)}

    onApprove={(data , actions) => onApprove(data, actions)}
   

  />
</div>
</div>
   );
}
 
export default PayPalPayment;