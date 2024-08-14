import React, { useContext, useState, useEffect } from "react";
import EditProjectModal from "./dialogModals/EditProjectModal";
import AddProjectModal from "./dialogModals/AddProjectModal";
import { context } from "../pages/Profile/ProfilePage";
import { fetchContext } from "./ProfileDataLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import github  from '../assets/github.png'
import { API_BASE_URL } from "../utils/config";
import { Link } from "react-router-dom";

const ProjectCard = ({
  index,
  id,
  project_name,
  description,
  github_project_languages = [],
  onDelete,
  url,
}) => {
  const [edit, setEdit] = useContext(context);
  const languageNames = github_project_languages
    .map((lang) => lang.language)
    .join(", ");

    return (
        <div className="codefoliobg-gray p-4 rounded-lg shadow-md w-full sm:w-[30%] h-50 mt-8">
          {edit && (
            <div className="flex flex-row justify-end">
              <button
                onClick={() => onDelete(id)}
                className="text-white hover:text-red-300"
              >
                <FontAwesomeIcon className="codefolio-yellow" icon={faTrashAlt} />
              </button>
            </div>
          )}
          <div className="flex flex-col items-center mt-5">
            <div className="flex items-center mx-4">
              <h3 className="font-bold text-xs codefolio-white mr-2">
                {project_name}
              </h3>
              <a href={`${url}/${project_name}`} target="_blank" rel="noopener noreferrer">
  <img src={github} alt="GitHub" style={{ width: '24px', height: '24px'}} />
</a>

            </div>
            <p className="mt-2 text-[14px] codefolio-yellow">{languageNames || " "}</p>
          </div>
        </div>
      );
      
};

const GithubProjects = ({ githubUrl }) => {
  const [projectsList, setProjectsList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [edit, setEdit] = useContext(context);
  const [fetchCntrl, setFetchCntrl] = useState(false);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        // Fetch profile data using the access token
        const response = await fetch(`${API_BASE_URL}/profile/github`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        console.log("Profile data:", data.content);
        setProjectsList(data.content);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchGithubData();
  }, [fetchCntrl]);


  const handleDelete = async (project_id) => {
    console.log(project_id);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `${API_BASE_URL}/profile/github`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },

          body: JSON.stringify({ project_id: project_id }),
        }
      );
      if (response.ok) {
        console.log("project deleted successfully");
        setFetchCntrl(!fetchCntrl);
      }
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  return (
    <div>
      <h2 className="cv-title">Github Projects</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {projectsList.map((item, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...item}
            onDelete={handleDelete}
            url={githubUrl}
          />
        ))}
      </div>
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

export default GithubProjects;
