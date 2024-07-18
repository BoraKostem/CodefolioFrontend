import React from "react";

const Skills = ({ data }) => {
  const skillsList = data || [];

  return (
    <>
    <h1 className="cv-title">Skills</h1>
    <div className="cv-container">
    
    <div>
        {skillsList.map((item, index) => (
          <span key={index} className="text-white">
            {item.skill}
            {index < skillsList.length - 1 && (
              <span className="codefolio-yellow"> | </span>
            )}
          </span>
        ))}
      </div>
    </div>
    </>
  );
};

export default Skills;
