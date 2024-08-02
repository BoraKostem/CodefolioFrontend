import React, { useState, useContext } from "react";
import GenericModal from "./GenericModal";
import { fetchContext } from "../ProfileDataLoader";

const AddExperienceModal = ({ isOpen, onRequestClose }) => {
  const [fetchCntrl, setFetchCntrl] = useContext(fetchContext);
  
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stillWorking, setStillWorking] = useState(false);

  const handleStillWorkingChange = () => {
    setStillWorking((prevState) => !prevState);
    if (!stillWorking) {
      setEndDate(""); 
    }
  };

  const formatDate = (date) => {
    if(!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  }

  const handleAdd = async () => {
    //validation
    if (!companyName || !description || !position || !location || !startDate) {
        alert("Please fill out all required fields.");
        return;
      }
    
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const newExperience = {
        "company_name": companyName,
        "description": description,
        "position": position,
        "location": location,
        "start_date": formattedStartDate,
        "end_date": formattedEndDate,
    };
    console.log(newExperience);

    try{
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('http://ec2-18-159-106-239.eu-central-1.compute.amazonaws.com:8000/api/profile/cv/experience', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(newExperience)
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
        title="Add New Experience"
      >
        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">Company : </label>
          <input
            type="text"
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter a new skill"
            className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></input>
        </div>
        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">Description : </label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a new skill"
            className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></input>
        </div>
        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">Position : </label>
          <input
            type="text"
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Enter a new skill"
            className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></input>
        </div>

        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">Location:</label>
          <select
            onChange={(e) => setLocation(e.target.value)}
            className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Location</option>
            <option value="Turkey">Türkiye</option>
            <option value="USA">USA</option>
            <option value="Ireland">Ireland</option>
            <option value="Germany">Germany</option>
            {/* Add more locations as needed */}
          </select>
        </div>

        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">Start Date:</label>
          <input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">End Date:</label>
          <input
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            disabled={stillWorking}
            className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={stillWorking}
            onChange={handleStillWorkingChange}
            className="mr-2"
          />
          <label>Still working here</label>
        </div>
      </GenericModal>
    </div>
  );
};

export default AddExperienceModal;
