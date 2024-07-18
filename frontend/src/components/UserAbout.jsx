import React from "react";

const UserAbout = ({data}) => {
  const aboutData = data || [];

  return (
    <div className="deneme p-4 rounded-lg shadow-md mt-8 mx-auto max-w-6xl">
    <h2 className="text-xl font-bold text-gray-800 mb-2 codefolio-yellow">About</h2>
      <p className="text-white">{aboutData}</p>
    </div>
  );
};

export default UserAbout;
