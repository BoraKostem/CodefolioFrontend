import React, { useContext, useEffect, useState } from "react";
import { context } from "../pages/Profile/ProfilePage";
import AddExperienceModal from "./dialogModals/AddExperienceModal";
import { fetchContext } from "./ProfileDataLoader";

const Experience = ({ data }) => {
  const [experienceList, setExperienceList] = useState(data || []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [edit, setEdit] = useContext(context);
  const [fetchCntrl, setFetchCntrl] = useContext(fetchContext);
  
  useEffect(() => {
    setExperienceList(data);
  },[data]);

  const handleEdit = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };


  const deleteExperience = async(experienceId) => {
    console.log(experienceId);
    try{
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('http://ec2-3-76-221-49.eu-central-1.compute.amazonaws.com:8000/api/profile/cv/experience',{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({"experience_id": experienceId})
      })
      if(response.ok){
        console.log("deleted successfully");
        setFetchCntrl(!fetchCntrl);
        //setExperienceList((prevList) => prevList.filter(item => item.id !== experienceId));
      }
    }catch(error){
      console.log("failed to delete",error);
    }
  };

  return (
    <>
      <h2 className="cv-title">Experience</h2>
      {edit && (
        <button
          onClick={handleEdit}
          className="flex text-white font-bold codefoliobg-yellow rounded p-3 justify-end"
        >
          + Add New Experience
        </button>
      )}
      <div className="cv-container">
        <ul className="list-disc ml-4 text-white">
          {experienceList.map((item, index) => (
            <li key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold text-white flex justify-start">
                  {item.position}
                </h3>
                {edit && (
                  <button onClick={() => deleteExperience(item.id)}className="text-white hover:text-red-300 px-5">
                    🗑️
                  </button>
                )}
              </div>
              <div className="ml-6">
                <p className="text-base font-medium text-white flex justify-start">
                  {item.company_name}
                </p>
                <p className="text-base text-white flex justify-start">
                  {item.location}
                </p>
                <p className="text-base text-white flex justify-start">
                  {item.start_date} - {item.end_date}
                </p>
                <p className="text-white flex text-left">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <AddExperienceModal
          isOpen={isAddModalOpen}
          onRequestClose={handleEdit}
        />
      </div>
    </>
  );
};

export default Experience;
