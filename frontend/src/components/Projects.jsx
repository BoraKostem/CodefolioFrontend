import React, { useContext, useState, useEffect} from "react";
import EditProjectModal from "./dialogModals/EditProjectModal";
import AddProjectModal from "./dialogModals/AddProjectModal";
import { context } from "../pages/Profile/ProfilePage";
import { fetchContext } from "./ProfileDataLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';

const ProjectCard = ({ index, id, project_name, description, cv_project_languages = [], onEdit, onDelete }) => {
  const [edit, setEdit] = useContext(context);
  const languageNames = cv_project_languages.map(lang => lang.language).join(", ");
  return (
    <div className="codefoliobg-gray p-4 rounded-lg shadow-md w-full sm:w-[30%] h-50 mt-8 c">
      {edit && (
        <div className="flex flex-row justify-end">
          <button onClick={() => onEdit(index)} className="text-white mr-2 hover:text-blue-300"><FontAwesomeIcon className="codefolio-yellow" icon={faPen} /></button>
          <button onClick={() => onDelete(id)} className="text-white hover:text-red-300"><FontAwesomeIcon className="codefolio-yellow" icon={faTrashAlt} /></button>
        </div>
      )}
      <div className='mt-5'>
        <div className="flex justify-center">
          <h3 className='font-bold text-[24px] text-white justify-center'>{project_name}</h3>
        </div>
        <p className='mt-2 text-[14px] text-white'>{description || " "}</p>
        <p className='mt-2 text-[14px] text-white'>{"Languages:" + languageNames || " "}</p>
      </div>
    </div>
  );
};

const Projects = ({ data }) => {
  const [projectsList, setProjectsList] = useState(data || []);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [edit, setEdit] = useContext(context);
  const [fetchCntrl, setFetchCntrl] = useContext(fetchContext);

  useEffect(() => {
    setProjectsList(data);
  }, [data]);

  const handleEdit = (index) => {
    setSelectedProject(projectsList[index]);
    setIsModalOpen(true);
  };


  const handleDelete = async (project_id) => {
    
    console.log(project_id);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`http://ec2-18-159-106-239.eu-central-1.compute.amazonaws.com:8000/api/profile/cv/project/delete`, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization" : `Bearer ${accessToken}`

        },

        body: JSON.stringify({ "project_id": project_id })
      });
      if (response.ok) {
        console.log("project deleted successfully")
        setFetchCntrl(!fetchCntrl);
      }
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  return (
    <div>
      <h2 className="cv-title">Projects</h2>
      {edit && (
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex text-white font-bold codefoliobg-yellow rounded p-3 justify-end"
        >
          + Add New Projects
        </button>
      )}
      <div className="flex flex-wrap justify-start gap-6">
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
      <AddProjectModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
        />
      {selectedProject && (
        <EditProjectModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      )}
    </div>
  );
};

export default Projects;
