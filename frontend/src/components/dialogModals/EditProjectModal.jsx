import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import GenericModal from "./GenericModal";
import { fetchContext } from "../ProfileDataLoader";

Modal.setAppElement('#root'); // This is to avoid accessibility issues

const EditProjectModal = ({ isOpen, onRequestClose, project }) => {
  const [fetchCntrl, setFetchCntrl] = useContext(fetchContext);
  const [formData, setFormData] = useState({
    description: "",
    cv_project_language: ""
  });

  useEffect(() => {
    if (project) {
      const languages = project.cv_project_languages
        ? project.cv_project_languages.map(lang => lang.language).join(", ")
        : "";
      setFormData({
        description: project.description || "",
        cv_project_language: languages
      });
    }
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    if (formData.description.trim() === "" && formData.cv_project_language.trim() === "") {
      alert("Please provide a description or languages.");
      return;
    }

    const languagesArray = formData.cv_project_language.split(",").map(lang => lang.trim()).filter(lang => lang !== "");

    const payload = {
      project_id: project.id,
      description: formData.description,
      languages: languagesArray.length === 1 ? languagesArray[0] : languagesArray
    };

    console.log("Payload to send:", payload); // Log payload to verify the data

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`http://ec2-18-159-106-239.eu-central-1.compute.amazonaws.com:8000/api/profile/cv/project/edit`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Update successful:", responseData);
        setFetchCntrl(!fetchCntrl); // Ensure onSave is defined and used properly
        onRequestClose(); // Close modal if save is successful
      } else {
        const errorData = await response.json();
        console.error("Failed to update project:", errorData.message);
        alert(`Update failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to update project:", error);
      alert("An error occurred while updating the project. Please try again.");
    }
  };

  return (
    <GenericModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title="Edit Project"
      onSave={handleSave}
    >
      <label className="block mb-4">
        <span className="text-gray-700">Description:</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 h-48"
        />
      </label>
     
    </GenericModal>
  );
};

export default EditProjectModal;