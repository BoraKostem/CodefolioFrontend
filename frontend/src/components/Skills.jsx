import React, { useContext, useState } from "react";
import { context } from "../pages/Profile/ProfilePage";
import EditSkillsModal from "./dialogModals/EditSkillsModal";

const Skills = ({ data }) => {
  const [skillsList, setSkillsList] = useState(data || []);
  const [edit, setEdit] = useContext(context);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleDelete = (skillToDelete) => {
    setSkillsList(skillsList => skillsList.filter(skill => skill.skill !== skillToDelete.skill));

  }

  const handleAdd = (newSkill) => {
    setSkillsList(prev => [...prev,{"skill" : newSkill}]);
  }

  return (
    <>
      <h1 className="cv-title">Skills</h1>
      <div className="cv-container">
        {edit && (
          <div className="flex flex-row justify-end">
            <button onClick={handleEdit} className="text-white mr-2 hover:text-blue-300">✏️</button>
          </div>
        )}
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
        <EditSkillsModal
          isOpen={isModalOpen}
          onRequestClose={handleEdit}
          skills={skillsList}
          onDelete={handleDelete}
          onAdd={handleAdd}  // This function should update the skills in parent state
        />
      </div>
    </>
  );
};

export default Skills;
