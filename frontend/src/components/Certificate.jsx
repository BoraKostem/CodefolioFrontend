import React, { useContext, useEffect, useState } from "react";
import { context } from "../pages/Profile/ProfilePage";
import AddCertificateModal from "./dialogModals/AddCertificateModal";
import { fetchContext } from "./ProfileDataLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';

const Certificate = ({ data }) => {
  const [certificateList, setCertificateList] = useState(data || []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [edit, setEdit] = useContext(context);
  const [fetchCntrl, setFetchCntrl] = useContext(fetchContext);
  
  useEffect(() => {
    setCertificateList(data);
  },[data]);

  const handleEdit = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const deleteCertificate = async(certificateId) => {
    console.log(certificateId);
    try{
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('http://ec2-18-159-106-239.eu-central-1.compute.amazonaws.com:8000/api/profile/cv/certification',{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({"certification_id": certificateId})
      })
      if(response.ok){
        console.log("deleted successfully");
        setFetchCntrl(!fetchCntrl);
        
      }
    }catch(error){
      console.log("failed to delete",error);
    }
  };


  return (
    <>
      <h2 className="cv-title">Certifications</h2>
      {edit && (
        <button
          onClick={handleEdit}
          className="flex text-white font-bold codefoliobg-yellow rounded p-3 justify-end"
        >
          + Add New Certification
        </button>
      )}
      <div className="cv-container">
        <ul className="list-disc ml-4 text-white">
          {certificateList.map((item, index) => (
            <li key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold text-white flex justify-start">
                  {item.certification_name} <span className="text-white font-normal"> &nbsp; {item.date}</span>
                </h3>
                {edit && (
                  <button onClick={() => deleteCertificate(item.id)}className="text-white hover:text-red-300 px-5">
                    <FontAwesomeIcon className="codefolio-yellow" icon={faTrashAlt} />
                  </button>
                )}
              </div>
              <div>      
                <p className="text-white flex text-left">{item.description}</p>
                <p className="text-white flex text-left">{item.url}</p>
              </div>
            </li>
          ))}
        </ul>
        <AddCertificateModal
          isOpen={isAddModalOpen}
          onRequestClose={handleEdit}
        />
      </div>
    </>
  )
}

export default Certificate;
