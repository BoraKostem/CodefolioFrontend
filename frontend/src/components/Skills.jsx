import React from "react";

const Skills = ({ data }) => {
  const skillsList = data || [];

  return (
    <div className="deneme p-4 rounded-lg shadow-md mt-8 mx-auto max-w-6xl">
    <h2 className="text-xl font-bold text-gray-800 mb-2 codefolio-yellow">Skills</h2>
      <ul>
        {skillsList.map((item, index) => (
          <li key={index} className="text-white">{item.skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
