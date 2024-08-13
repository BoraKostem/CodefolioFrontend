import React, { useState, useContext } from "react";
import GenericModal from "./GenericModal";
import { fetchContext } from "../ProfileDataLoader";
import { API_BASE_URL } from "../../utils/config";

const AddEducationModal = ({ isOpen, onRequestClose }) => {
  const [fetchCntrl, setFetchCntrl] = useContext(fetchContext);
  
  const [degree, setDegree] = useState("");
  const [school, setSchool] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stillStudying, setStillStudying] = useState(false);

  const handleStillStudyingChange = () => {
    setStillStudying((prevState) => !prevState);
    if (!stillStudying) {
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
    if (!degree || !school  || !location || !startDate) {
        alert("Please fill out all required fields.");
        return;
      }
    
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const newEducation = {
        "degree": degree,
        "school": school,
        "location": location,
        "start_date": formattedStartDate,
        "end_date": formattedEndDate,
    };
    console.log(newEducation);

    try{
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API_BASE_URL}/profile/cv/education`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(newEducation)
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
        title="Add New Education"
      >
        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">Degree : </label>
          <input
            type="text"
            onChange={(e) => setDegree(e.target.value)}
            placeholder="Enter a new skill"
            className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></input>
        </div>
        <div className="flex flex-row my-5 w-full">
          <label className="w-1/6">School : </label>
          <input
            type="text"
            onChange={(e) => setSchool(e.target.value)}
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
            disabled={stillStudying}
            className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={stillStudying}
            onChange={handleStillStudyingChange}
            className="mr-2"
          />
          <label>Still studying here</label>
        </div>
      </GenericModal>
    </div>
  );
};

export default AddEducationModal;
