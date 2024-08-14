import React from "react";
import backgroundImage from "../assets/profileBackground.jpeg";
import profilePic from "../assets/profilepic.png";

const UserInfo = ({ name, email, phone, github, linkedin, location, profilePhoto }) => {
  return (
    <div className="h-full w-full relative flex flex-col items-center">
      {/* Background Image */}
      <div className="h-40 w-full bg-cover bg-center">
        <img
          src={backgroundImage}
          className="w-full h-full object-cover"
          alt="profileBg"
        />
      </div>

      {/* Profile image */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
        <img
          src={profilePic}
          alt="Profile"
          className="w-36 h-36 rounded-full codefolio-yellow-border relative z-10"
          onError={(e) => { e.target.onerror = null; e.target.src = profilePhoto; }}
        />
      </div>

      {/* Yellow half circles and user info */}
      <div className="w-96 flex flex-col items-center">
        {/* First yellow half circle */}
        <div className="w-96 h-48 rounded-b-full codefolio-yellow-border codefoliobg-yellow flex justify-center">
          <div className="text-center mt-20">
            <h1 className="text-2xl font-bold codefolio-gray">{name}</h1>
          </div>
        </div>

        {/* Second yellow half circle */}
        <div className="w-96 h-48 rounded-t-full border-8 codefolio-yellow-border codefoliobg-yellow flex items-center flex-col mt-10">
          <div className="text-center codefolio-gray mt-10">
            <h2 className="text-xl font-bold codefolio-gray">Get In Touch </h2>
            <p className="text-gray-300 codefolio-gray mt-5">
              {email ? (
                <a href={`mailto:${email}`} className="hover:underline">
                  Email: {email}
                </a>
              ) : null}
            </p>
            <p className="text-gray-300 codefolio-gray">
              {phone ? `Phone: ${phone}` : null}
            </p>
            <p className="text-gray-300 codefolio-gray">
              {github ? (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub: {github}
                </a>
              ) : null}
            </p>
            <p className="text-gray-300 codefolio-gray">
              {linkedin ? (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn: {linkedin}
                </a>
              ) : null}
            </p>
          </div>
        </div>

        {/* User info */}
      </div>
    </div>
  );
};

export default UserInfo;
