import React from "react";

const Education = ({ data }) => {
  const educationList = data || [];

  return (
    <>
    <h2 className="cv-title">Education</h2>
    <div className="cv-container">
    
    <ul className="list-disc ml-4 text-white">
        {educationList.map((item, index) => (
          <li key={index} className="mb-4">
            <h3 className="text-lg font-bold text-white text-left">{item.school}</h3>
            <div className="ml-6">
              <p className="text-left font-medium text-white">{item.degree}</p>
              <p className="text-left text-white">{item.start_date}</p>
            </div>
          </li>
        ))}
      </ul> 
    </div>
    </>
  );
};

export default Education;
