import React from 'react';
import backgroundImage from "../assets/profileBackground.jpeg";
import profilePic from "../assets/profilepic.png";

const UserInfo = () => {
 
  return (
    <div className="h-full w-96 sm:w-full relative flex flex-col items-center">
      {/* Background Image */}
      <div className="h-40 w-full bg-cover bg-center">
        <img src={backgroundImage} className="w-full h-full object-cover" alt="profileBg" />
      </div>
      
      {/* Profile image */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
        <img src={profilePic} alt="Profile" className="w-36 h-36 rounded-full codefolio-yellow-border relative z-10" />
      </div>
      
      {/* Yellow half circles and user info */}
      <div className="w-96 flex flex-col items-center">
        {/* First yellow half circle */}
        <div className="w-96 h-48 rounded-b-full codefolio-yellow-border codefoliobg-yellow flex justify-center">
        <div className="text-center mt-20">
          <h1 className="text-2xl font-bold codefolio-gray">John Doe</h1>
          
        </div>
        </div>
        
        {/* Second yellow half circle */}
        <div className="w-96 h-48 rounded-t-full border-8 codefolio-yellow-border codefoliobg-yellow flex items-center flex-col mt-10">
          <div className="text-center codefolio-gray mt-20">
            <h2 className="text-xl font-bold codefolio-gray">Data Scientist</h2>
            <p className="text-gray-300 codefolio-gray">Email: example@example.com</p>
            <p className="text-gray-300 codefolio-gray">Phone: +1234567890</p>
          </div>
        </div>
        
        {/* User info */}
        
      </div>
    </div>
  );
};

export default UserInfo;
