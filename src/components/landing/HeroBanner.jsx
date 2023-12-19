import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function HeroBanner() {
  const router = useRouter();
  const [image, setImage] = useState(1);
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    const interval = setInterval(
      () => setImage(image >= 6 ? 1 : image + 1),
      10000
    );
    return () => clearInterval(interval);
  }, [image]);

  return (
    <div className="h-[680px] relative bg-cover">
      <div className="absolute top-0 right-0 w-[110vw] h-full transition-opacity z-0">
        <Image alt="hero" src="/bg-hero1.webp" fill />
      </div>
      <div className="z-10 relative w-[650px] flex justify-center flex-col h-full gap-5 ml-20">
        <h1 className="text-white text-5xl leading-snug">
          Find the perfect&nbsp;
          <i>freelance</i>
          <br />
          services for your needs
        </h1>
        
   
      </div>
    </div>
  );
}

export default HeroBanner;
