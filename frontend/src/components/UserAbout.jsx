import React from "react";

const UserAbout = ({data}) => {
  const aboutData = data || [];

  return (
    <div className="cv-container">
      <p className="p-5 text-white">{data}</p>
    </div>
  );
};

export default UserAbout;
