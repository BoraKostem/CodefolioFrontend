import React, { useState, useContext } from "react";
import GenericModal from "./GenericModal";
import { fetchContext } from "../ProfileDataLoader";

const AddProjectModal = ({ isOpen, onRequestClose }) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [languagesInput, setLanguagesInput] = useState("");
  const [fetchCntrl, setFetchCntrl] = useContext(fetchContext);

  const handleAdd = async () => {

    //validation
    if (!projectName || !description || !languagesInput) {
        alert("Please fill out all required fields.");
        return;
      }
    
      const languages = languagesInput.split(",").map(lang => lang.trim());
    const newProject = {
      "project_name": projectName,
      "description": description,
      "languages": languages,
    
    };

    console.log(newProject);

    try{
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('http://ec2-3-76-221-49.eu-central-1.compute.amazonaws.com:8000/api/profile/cv/project/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(newProject)
        });

        if(response.ok) {
            console.log("Added successfully");
            setFetchCntrl(!fetchCntrl);
            onRequestClose();         
        }

    }catch(error){
        console.log("Failed to add new experience ", error);
    }

  };
  return (
    <div>
      <GenericModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        onSave={handleAdd}
        title="Add New Project"
      >
        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">Company : </label>
          <input
            type="text"
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter  a project name"
            className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></input>
        </div>
        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">Description : </label>
          <textarea
          name="description"
          placeholder="Enter a project description"
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-5/6 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 h-48"
        />
        </div> 
        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">Languages : </label>
          <input
            type="text"
            onChange={(e) => setLanguagesInput(e.target.value)}
            placeholder="Enter project languages"
            className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></input>
        </div>       
      </GenericModal>
    </div>
  );
};

export default AddProjectModal;
