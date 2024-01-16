import AuthWrapper from "../components/AuthWrapper";
import Everything from "../components/landing/Everything";

import HeroBanner from "../components/landing/HeroBanner";

import Services from "../components/landing/Services";
import { useStateProvider } from "../context/StateContext";
import React from "react";


function Index() {
  const [{ showLoginModal, showSignupModal }] = useStateProvider();

  return (
    <div>
      <HeroBanner />
     
      <Everything />
      <Services />

      {(showLoginModal || showSignupModal) && (
        <AuthWrapper type={showLoginModal ? "login" : "signup"} />
      )}
    </div>
  );
}

export default Index;
