import React,{useEffect, useState} from 'react'

const ProjectCard = ({ index, id, project_name, description, cv_project_languages = []}) => {
 
    const languageNames = cv_project_languages.map(lang => lang.language).join(", ");
    return (
      <div className="codefoliobg-gray p-4 rounded-lg shadow-md w-full sm:w-[30%] h-50 mt-8 c">
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

const UserProjects = ({data}) => {
    const [projectsList, setProjectsList] = useState(data || []);

  useEffect(() => {
    setProjectsList(data);
  }, [data]);
  return (
    <div>
    <h2 className="cv-title">Projects</h2>
    <div className="flex flex-wrap justify-start gap-6">
      {projectsList.map((item, index) => (
        <ProjectCard
          key={`project-${index}`}
          index={index}
          {...item}
        />
      ))}
    </div>
  </div>
  )
}

export default UserProjects
