import React from "react";

const Education = ({ data }) => {
  const educationList = data || [];

  return (
    <div className="deneme p-4 rounded-lg shadow-md mt-8 mx-auto max-w-6xl">
    <h2 className="text-xl font-bold text-gray-800 mb-2 codefolio-yellow">Education</h2>
    <ul className="list-disc ml-4 text-white">
        {educationList.map((item, index) => (
          <li key={index} className="mb-4">
            <h3 className="text-lg font-bold text-white">{item.school}</h3>
            <div className="ml-6">
              <p className="text-base font-medium text-white">{item.degree}</p>
              <p className="text-bas text-white">{item.start_date}</p>
            </div>
          </li>
        ))}
      </ul> 
    </div>
  );
};

export default Education;
