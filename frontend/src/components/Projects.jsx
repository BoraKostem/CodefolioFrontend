import React from "react";

const ProjectCard = ({ index, project_name, description }) => {
  return (
    <div className="codefoliobg-gray p-4 rounded-lg shadow-md w-full sm:w-[30%] mt-8 c">
      <div className='mt-5 '>
        <h3 className='font-bold text-[24px] text-white'>{project_name}</h3>
        <p className='mt-2 text-[14px] text-white'>{description}</p>
      </div>
    </div>
  );
};

const Projects = ({ data }) => {
  const projectsList = data || [];

  return (
    <div>
      <h2 className="cv-title">Projects</h2>
      <div className="flex flex-wrap justify-between gap-6">
        {projectsList.map((item, index) => (
          <ProjectCard key={`project-${index}`}  index={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
