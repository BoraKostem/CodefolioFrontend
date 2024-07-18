import React from "react";

const Experience = ({ data }) => {
  const experienceList = data || [];

  return (
    <>
    <h2 className="cv-title">Experience</h2>
    <div className="cv-container">
      
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
    </>
  );
};

export default Experience;
