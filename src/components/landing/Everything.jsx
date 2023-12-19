import Image from "next/image";

import React from "react";
import { MdArrowRight } from "react-icons/md";
function Everything() {
  const everythingData = [
    {
      title: "Stick to your budget",
      subtitle:
        "Find the right service for every price point. No hourly rates, just project-based pricing.",
    },
    {
      title: "Get quality work done quickly",
      subtitle:
        "Hand your project over to a talented freelancer in minutes, get long-lasting results.",
    },
  {
    title: "Browse portfolios",
    subtitle:
      "Find professionals you can trust by browsing their samples of previous work and reading their profile reviews.",
  },
    {
      title: "Communicate efficiently",
      subtitle:
        "Use our messaging system to discuss with the freelancer about the work.",
    },
  ];
  return (
    <div className="bg-sky-100 flex py-20 justify-between">
      <div className="relative h-112 w-2/4">
        <Image
          className="object-contain pl-28"
          src="/everything.png"
          fill
          alt="everything"
        />
      </div>
      <div className="pr-44">
        <h2 className="text-4xl mb-10 text-[#404145] font-bold">
          Why you should choose Skilled
        </h2>
       
        <ul className="flex flex-col gap-10">
          {everythingData.map(({ title, subtitle }) => {
            return (
              <li key={title}>
                <div className="flex gap-2 items-center text-xl">
                  <MdArrowRight className="text-[#62646a]" />
                  <h4>{title}</h4>
                </div>
                <p className="text-[#62646a]">{subtitle}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Everything;
