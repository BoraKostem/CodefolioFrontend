import React, { useState } from "react";
import Modal from "react-modal";
import GenericModal from "./GenericModal";
import { API_BASE_URL } from "../../utils/config";


Modal.setAppElement('#root');

const EditSkillsModal = ({ isOpen, onRequestClose, skills, onDelete, onAdd }) => {
  const [skillsList, setSkillsList] = useState(skills || []);
  const [deletionArr, setDeletionArr] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [addArr, setAddArr] = useState([]);



  const handleAdd = async () => {
      
      setAddArr(prev => [...prev, newSkill]);
      setSkillsList(prev => [...prev, {"skill": newSkill}]);
      setNewSkill(''); // Clear the input field after adding
   
  }

  const handleDeleteSkill = async (skillToDelete) => {
    setDeletionArr(prev => [...prev, skillToDelete]);
    setSkillsList(skillsList => skillsList.filter(skill => skill.skill !== skillToDelete.skill));
  }

  const handleUpdates = async() => {

    try {
        const accessToken = localStorage.getItem('accessToken');
        for(let skill of addArr){
          console.log(skill);
          const response = await fetch(`${API_BASE_URL}/profile/cv/skill`,{
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${accessToken}`
              },
              body: JSON.stringify({skill})
          });
          if (response.ok){
              console.log("new skill added successfully");
              onAdd(skill);
          }else{
              const errorData = await response.json();
              console.error("failed to add:", errorData.message);
          }
      }

        for(let skill of deletionArr ){
            const response = await fetch(`${API_BASE_URL}/profile/cv/skill`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ skill: skill.skill })  // Adjust this as needed based on API requirements
            });
    
            if (response.ok) {
            console.log("Delete successful");
            onDelete(skill); // Call the function to update the skills in the parent component
            } else {
            const errorData = await response.json();
            console.error("Failed to delete after fetch:", errorData.message);
            alert(`Delete failed: ${errorData.message}`);
            }
        }

        
        setAddArr([]);
        setDeletionArr([]);
        console.log("array deleted");
      } catch (error) {
        console.error("Failed to delete skill:", error);
      }

    }

  

  return (
    <GenericModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onSave={handleUpdates}
      title="Edit Skills"
    >
      <div className="flex flex-wrap gap-2">
        {skillsList.map((skill, index) => (
          <div key={index} className="flex items-center">
            <button
              className="bg-gray-200 text-black rounded px-3 py-1 mr-2 cursor-pointer flex items-center"
              onClick={() => handleDeleteSkill(skill)}
            >
              {skill.skill} <span className="ml-2">x</span>
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-5">
      <label className="font-bold codefolio-yellow">Add a New Skill</label>
      <div className="flex flex-row my-5 w-full"> 
            <input
                type="text"
                placeholder="Enter a new skill"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></input> 
            <button 
            onClick={handleAdd}
            className="codefoliobg-yellow rounded-lg text-white w-10 mx-5"
            >+</button>
        </div>
        </div>
    </GenericModal>
  );
};

export default EditSkillsModal;
