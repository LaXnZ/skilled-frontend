import Footer from "../components/Footer";
import "../globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { StateProvider } from "../context/StateContext";
import reducer, { initialState } from "../context/StateReducers";
import Navbar from "@/components/Navbar";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PayPalPayment from "@/pages/PayPalPayment";


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [cookies] = useCookies();
  useEffect(() => {
    if (
      router.pathname.includes("/seller") ||
      router.pathname.includes("/buyer")
    ) {
      if (!cookies.jwt) {
        router.push("/");
      }
    }
  }, [cookies, router]);

  const initialOptions = {
    clientId: "AR9LsIcMOTFanCizP_fhdTWrLXPfbt1i3lgqBq_5k84lPb61WUp9JXUvL7qO4LMmEu6IuwI0jN9Givw1",
    currency: "USD",
    intent: "capture",
};

  return (
    <PayPalScriptProvider options={initialOptions}>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Skilled</title>
      </Head>
      <div className="relative flex flex-col h-screen justify-between">
       <Navbar />
        <div
          className={`${
            router.pathname !== "/" ? "mt-28" : ""
          } mb-auto w-full mx-auto`}
        >
          <Component {...pageProps} />
        </div>
        {/* <PayPalButtons/> */}

        {/* <PayPalPayment/> */}
        <Footer />
      </div>
    </StateProvider>
    </PayPalScriptProvider>
  );
}