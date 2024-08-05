import React, { useEffect, useState } from 'react'

const UserSkills = ({data}) => {
    const [skillsList, setSkillsList] = useState([]);

    useEffect(() => {
        setSkillsList(data);
    }, [data]);
  return (
    <div>
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
    </div>
  )
}

export default UserSkills
