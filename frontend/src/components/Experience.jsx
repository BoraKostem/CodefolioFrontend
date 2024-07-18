import React from "react";

const Experience = ({ data }) => {
  const experienceList = data || [];

  return (
    <div className="deneme sm:p-4 rounded-lg shadow-md mt-8 mx-auto max-w-6xl">
      <h2 className="text-xl font-bold text-gray-800 mb-2 codefolio-yellow">Experience</h2>
       <ul className="list-disc ml-4 text-white">
        {experienceList.map((item, index) => (
          <li key={index} className="mb-4">
            <h3 className="text-lg font-bold text-white">{item.company_name}</h3>
            <div className="ml-6">
              <p className="text-base font-medium text-white">{item.position}</p>
              <p className="text-base text-white">{item.location}</p>
              <p className="text-base text-white">{item.start_date} - {item.end_date}</p>
              <p className="text-base text-white">{item.description}</p>
            </div>
          </li>
        ))}
      </ul> 
    </div>
  );
};

export default Experience;
