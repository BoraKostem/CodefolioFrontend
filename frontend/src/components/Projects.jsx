import React from "react";

const Projects = ({ data }) => {
  const projectsList = data || [];

  return (
    <div className="deneme p-4 rounded-lg shadow-md mt-8 mx-auto max-w-6xl">
    <h2 className="text-xl font-bold text-gray-800 mb-2 codefolio-yellow">Projects</h2>
    <ul className="list-disc ml-4 text-white">
        {projectsList.map((item, index) => (
          <li key={index} className="mb-4">
            
            <div className="ml-6">
              <p className="text-base font-medium text-white">{item.project_name}</p>
              <p className="text-bas font-small text-white">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
