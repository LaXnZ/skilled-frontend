import Link from "next/link";
import React from "react";
import {
  FiGithub,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import { categories } from "../utils/categories";
import { MdTrendingFlat } from "react-icons/md";
import SkilledLogo from "./landing/SkilledLogo";

function Footer() {
  const socialLinks = [
    { name: "Github", icon: <FiGithub />, link: "#" },
    {
      name: "Youtube",
      icon: <FiYoutube />,
      link: "#",
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin />,
      link: "#",
    },
    {
      name: "Instagram",
      icon: <FiInstagram />,
      link: "#",
    },
    {
      name: "Twitter",
      icon: <FiTwitter />,
      link: "#",
    },
  ];

  const data = [
    {
      headerName: "Quick Links",
      links: [
        { name: "About Us", link: "#" },
        { name: "Help & Support", link: "#" },
        { name: "Selling on Skilled", link: "#" },
        { name: "Buying on Skilled", link: "#" },
      ],
    },

  ];

  return (
    <footer className="w-full  mx-auto px-32 py-8 h-max border-t border-gray-200 bg-gray-100  dark:bg-gray-800 dark:text-gray-100">
      <div className=" flex items-center justify-between">
      
        <Link href="/">
          <div className="flex items-center justify-between ">
            <img className="w-52" src="/skilled-logo.png"></img>
            {/* <h3 className="text-xl text-[#404145]"> © Skilled.com 2023</h3> */}
          </div>
        </Link>
        <ul className="flex justify-between">
        {data.map(({ headerName, links }) => {
          return (
            <li key={headerName} className="flex flex-col gap-2">
              <span className="font-bold text-center ">{headerName}</span>
              <ul className="flex flex-initial gap-2 ">
                
                {links.map(({ name, link }) => (
                  <li key={name} className="text-[#404145]  pl-10 dark:bg-gray-800 dark:text-gray-200">
                    <Link href={link}>{name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
        <ul className="flex gap-5">
          
          {socialLinks.map(({ icon, link, name }) => (
            <li 
              key={name}
              className="text-xl text-[#404145] hover:text-sky-400 transition-all dark:bg-gray-800 dark:text-gray-200"
            >
              <Link href={link}>{icon}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
