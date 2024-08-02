import React, { useContext, useEffect, useState } from "react";
import { context } from "../pages/Profile/ProfilePage";
import { fetchContext } from "./ProfileDataLoader";
import AddEducationModal from "./dialogModals/AddEducationModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';

const Education = ({ data }) => {
  const [educationList, setEducationLists] = useState(data || []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [edit, setEdit] = useContext(context);
  const [fetchCntrl, setFetchCntrl] = useContext(fetchContext);

  useEffect(() => {
    setEducationLists(data);
  }, [data]);

  const handleEdit = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const deleteEducation = async(educationId) => {
    try{
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('http://ec2-18-159-106-239.eu-central-1.compute.amazonaws.com:8000/api/profile/cv/education',{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({"education_id": educationId})
      })
      if(response.ok){
        console.log("delted successfully");
        setFetchCntrl(!fetchCntrl);
      }
    }catch(error){
      console.log("failed to delete education", error);
    }
  }

  return (
    <>
    <h2 className="cv-title">Education</h2>
    {edit && (
        <button
          onClick={handleEdit}
          className="flex text-white font-bold codefoliobg-yellow rounded p-3 justify-end"
        >
          + Add New Education
        </button>
      )}
    <div className="cv-container"> 
    <ul className="list-disc ml-4 text-white">
        {educationList.map((item, index) => (
          <li key={index} className="mb-4">
            <div className="flex justify-between">
            <h3 className="text-lg font-bold text-white text-left">{item.school || " "}</h3>
            {edit && (
                  <button onClick={() => deleteEducation(item.id)}className="text-white hover:text-red-300 px-5">
                    <FontAwesomeIcon className="codefolio-yellow" icon={faTrashAlt} />
                  </button>
                )}
              </div>
            <div className="ml-6">
              <p className="text-left font-medium text-white">{item.degree || "Unknown degree"}</p>
              <p className="text-left text-white">{item.start_date || " "} - {item.end_date || " "}</p>
            </div>
          </li>
        ))}
      </ul> 
      <AddEducationModal
        isOpen={isAddModalOpen}
        onRequestClose={handleEdit}
      />
    </div>
    </>
  );
};

export default Education;
