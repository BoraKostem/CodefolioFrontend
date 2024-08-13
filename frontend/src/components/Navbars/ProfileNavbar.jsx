import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import profilepic from "../../assets/profilepic.png";
import { context } from "../../pages/Profile/ProfilePage";


const ProfileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [togglePicture, setTogglePicture] = useState(false);
  const [edit, setEdit] = useContext(context) || [false, () => {}];

  const buttonClasses =
    "text-gray-100 font-bold text-sm px-2 py-1 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition duration-300";

  const buttons = (
    <>
      <Link to="/about">
        <button className={buttonClasses}>About</button>
      </Link>
      <Link to="/contact">
        <button className={buttonClasses}>Contact</button>
      </Link>
    </>
  );

  return (
<nav className="bg-[#45474B] text-[#F5F7F8] fixed w-full z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex w-full justify-between h-12">
          <div className="flex flex-row w-full justify-between">
            <Link
              to="/"
              className="text-xl font-bold"
              style={{ color: "#F4CE14" }}
            >
              Codefolio
            </Link>
            <div className="hidden md:block">
              <div className="flex ml-10 items-baseline space-x-2">
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
          <img
            src={profilepic}
            alt="profilepic"
            onClick={() => {
              setTogglePicture(!togglePicture);
            }}
            className="w-8 h-8 rounded-full ml-2"
          />
          <div
            className={`${
              !togglePicture ? "hidden" : "flex"
            } p-10 codefoliobg-yellow absolute top-16 font-bold right-0 mx-8 my-2 min-w[140px] z-10 rounded-xl fixed-width`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4 ">
              <li>
                <Link
                  to={"/profile"}
                  className="hover:text-codefolio-gray"
                  onClick={() => {
                    setEdit(!edit);
                    setTogglePicture(!togglePicture);
                  }}
                >
                  {!edit ? "Edit My Profile" : "Quit Editting"}
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-codefolio-gray">
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={() => localStorage.removeItem("accessToken")}
                  className="hover:text-codefolio-gray"
                >
                  <button>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />                
                  </button>
                  &nbsp;
                   Log out

                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-y-2 md:hidden px-4 sm:px-6 pb-2">
          {buttons}
        </div>
      )}
    </nav>
  );
};

export default ProfileNavbar;
