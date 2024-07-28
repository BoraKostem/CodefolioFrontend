import React, { useState, useContext } from "react";
import GenericModal from "./GenericModal";
import { fetchContext } from "../ProfileDataLoader";


const AddCertificateModal = ({ isOpen, onRequestClose }) => {
  const [fetchCntrl, setFetchCntrl] = useContext(fetchContext);
  const [certificateName, setCertficateName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");


  const formatDate = (date) => {
    if(!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  }
  const handleAdd = async () => {
    //validation
    if (!certificateName || !description || !date || !url ) {
        alert("Please fill out all required fields.");
        return;
      }
    
      
      const formattedDate = formatDate(date);
    const newCertificate = {
        "certification_name": certificateName,
        "description": description,
        "url": url,
        "date": formattedDate,
    };

    try{
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('http://ec2-3-76-221-49.eu-central-1.compute.amazonaws.com:8000/api/profile/cv/certification', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(newCertificate)
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
        title="Add New Certification"
      >
        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">Certification Name : </label>
          <input
            type="text"
            onChange={(e) => setCertficateName(e.target.value)}
            placeholder="Enter a Certification name"
            className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></input>
        </div>
        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">Description : </label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description"
            className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></input>
        </div>
        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">url : </label>
          <input
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter an URL"
            className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></input>
        </div>
        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">Date:</label>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
  
      </GenericModal>
    </div>
  );
};

export default AddCertificateModal;
