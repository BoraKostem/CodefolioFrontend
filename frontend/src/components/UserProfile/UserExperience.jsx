import React, { useEffect, useState } from 'react'


const UserExperience = ({ data }) => {
    const [experienceList, setExperienceList] = useState(data || []);
    useEffect(() => {
        setExperienceList(data);
      },[data]);
  return (
    <>
    <h2 className='cv-title'>Experiences</h2>
    <div className='cv-container'>
       <ul className="list-disc ml-4 text-white">
          {experienceList.map((item, index) => (
            <li key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold text-white flex justify-start">
                  {item.position}
                </h3>
              </div>
              <div className="ml-6">
                <p className="text-base font-medium text-white flex justify-start">
                  {item.company_name || " "}
                </p>
                <p className="text-base text-white flex justify-start">
                  {item.location || " "}
                </p>
                <p className="text-base text-white flex justify-start">
                  {item.start_date || " "} - {item.end_date || " "}
                </p>
                <p className="text-white flex text-left">{item.description || " "}</p>
              </div>
            </li>
          ))}
        </ul>
    </div>
    </>
  )
}

export default UserExperience
