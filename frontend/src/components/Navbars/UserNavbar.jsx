import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import profilepic from "../../assets/profilepic.png";


const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const buttonClasses =
    "text-gray-100 font-bold text-sm px-2 py-1 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition duration-300  cursor-pointer";

  const buttons = (
    <>
      <Link to="/about">
        <button className={buttonClasses}>About</button>
      </Link>
      <Link to="/contact">
        <button className={buttonClasses}>Contact</button>
      </Link>
      <img
            src={profilepic}
            alt="profilepic"
            onClick={() => {
              navigate("/Profile");
            }}
            className="w-8 h-8 rounded-full ml-2"
       />
       
    </>
  );

  return (
    <nav className="bg-[#45474B] text-[#F5F7F8] fixed w-full z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex w-full justify-between h-12">
          <div className="flex flex-row w-full justify-between">
            <Link
              to="/"
              className="text-xl font-bold cursor-pointer"
              style={{ color: "#F4CE14" }}
            >
              Codefolio
            </Link>
            <div className="hidden md:block">
              <div className="flex ml-10 space-x-2 justify-center">
                {buttons}
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="fill-gray-100"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 12H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-y-2 md:hidden px-4 sm:px-6 pb-2 items-center">
          {buttons}
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
