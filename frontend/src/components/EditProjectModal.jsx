import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement('#root'); // This is to avoid accessibility issues

const EditProjectModal = ({ isOpen, onRequestClose, project, onSave }) => {
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
      const response = await fetch(`http://ec2-3-76-221-49.eu-central-1.compute.amazonaws.com:8000/api/profile/cv/project/edit`, {
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
        onSave(payload.project_id, payload); // Ensure onSave is defined and used properly
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white rounded-lg p-8 shadow-lg relative w-11/12 max-w-2xl h-3/5 mx-auto my-8"
      overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
    >
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        onClick={onRequestClose}
      >
        ✖️
      </button>
      <h2 className="text-2xl font-bold mb-4 codefolio-yellow">Edit Project</h2>
      <label className="block mb-4">
        <span className="text-gray-700">Description:</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 h-48"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Languages (comma separated):</span>
        <input
          type="text"
          name="cv_project_language"
          value={formData.cv_project_language}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </label>
      <div className="flex justify-end">
        <button onClick={onRequestClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600">Cancel</button>
        <button onClick={handleSave} className="codefoliobg-yellow text-white px-4 py-2 rounded hover:bg-amber-300">Save</button>
      </div>
    </Modal>
  );
};

export default EditProjectModal;

