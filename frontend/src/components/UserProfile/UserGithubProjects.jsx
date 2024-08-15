import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import github  from '../../assets/github.png';

const ProjectCard = ({
  githubUrl,
  project_name,
  github_project_languages = [],
}) => {
  const languageNames = github_project_languages
    .map((lang) => lang.language)
    .join(", ");

    return (
        <div className="codefoliobg-gray p-4 rounded-lg shadow-md w-full sm:w-[30%] h-50 mt-8">
          <div className="flex flex-col items-center mt-5">
            <div className="flex items-center mx-4">
              <h3 className="font-bold text-xs codefolio-white mr-2">
                {project_name}
              </h3>
              <a href={`${githubUrl}/${project_name}`} target="_blank" rel="noopener noreferrer">
  <img src={github} alt="GitHub" style={{ width: '24px', height: '24px'}} />
</a>

            </div>
            <p className="mt-2 text-[14px] codefolio-yellow">{languageNames || " "}</p>
          </div>
        </div>
      );
      
};

const UserGithubProjects = ({ data, url }) => {
  const [projectsList, setProjectsList] = useState(data);

  return (
    <div>
      <h2 className="cv-title">Github Projects</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {projectsList.map((item, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...item}
            githubUrl={url}
          />
        ))}
      </div>
    </div>
  );
};

export default UserGithubProjects;
