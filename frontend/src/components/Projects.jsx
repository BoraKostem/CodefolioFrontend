import React, { useState } from "react";
import EditProjectModal from "./EditProjectModal";

const ProjectCard = ({ index, project_id, project_name, description, cv_project_languages = [], onEdit, onDelete }) => {
  const languageNames = cv_project_languages.map(lang => lang.language).join(", ");
  return (
    <div className="codefoliobg-gray p-4 rounded-lg shadow-md w-full sm:w-[30%] mt-8 c">
      <div className="flex flex-row justify-end">
        <button onClick={() => onEdit(index)} className="text-white mr-2 hover:text-blue-300">✏️</button>
        <button onClick={() => onDelete(project_id)} className="text-white hover:text-red-300">🗑️</button>
      </div>
      <div className='mt-5'>
        <div className="flex justify-center">
          <h3 className='font-bold text-[24px] text-white justify-center'>{project_name}</h3>
        </div>
        <p className='mt-2 text-[14px] text-white'>{description}</p>
        <p className='mt-2 text-[14px] text-white'>Languages: {languageNames}</p>
      </div>
    </div>
  );
};

const Projects = ({ data }) => {
  const [projectsList, setProjectsList] = useState(data || []);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (index) => {
    setSelectedProject(projectsList[index]);
    setIsModalOpen(true);
  };

  const handleSave = async (id, updatedData) => {

    try {
        const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`http://ec2-3-76-221-49.eu-central-1.compute.amazonaws.com:8000/api/profile/cv/project/edit`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`
         },
        body: JSON.stringify({ id, ...updatedData })
      });
      if (response.ok) {
        const updatedProjectsList = projectsList.map(project => 
          project.id === id ? { ...project, ...updatedData } : project
        );
        setProjectsList(updatedProjectsList);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to update project", error);
    }
  };

  const handleDelete = async (project_id) => {
    try {
      const response = await fetch(`<ip>/api/profile/cv/project/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id })
      });
      if (response.ok) {
        setProjectsList(projectsList.filter(project => project.project_id !== project_id));
      }
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  return (
    <div>
      <h2 className="cv-title">Projects</h2>
      <div className="flex flex-wrap justify-between gap-6">
        {projectsList.map((item, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {selectedProject && (
        <EditProjectModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          project={selectedProject}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Projects;
