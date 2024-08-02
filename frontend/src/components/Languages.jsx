import React, { useContext, useState } from 'react'
import { context } from '../pages/Profile/ProfilePage';
import { useAsyncError } from 'react-router-dom';
import EditLanguagesModal from './dialogModals/EditLanguagesModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';

const Languages = ({data}) => {
    const [languagesList, setLanguageList ] = useState( data || []);
    const [edit, setEdit] = useContext(context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleEdit = () => {
      setIsModalOpen(!isModalOpen);
    }
    const handleDelete = (languageToDelete) => {
      setLanguageList(languagesList => languagesList.filter(language => language.language !== languageToDelete.language));
  
    }
  
    const handleAdd = (newLanguage) => {
      setLanguageList(prev => [...prev,{"language" : newLanguage}]);
    }
  return (
    <>
    <h2 className="cv-title">Languages</h2>
    <div className="cv-container">
    {edit && (
          <div className="flex flex-row justify-end">
            <button onClick={handleEdit} className="text-white mr-2 hover:text-blue-300"><FontAwesomeIcon className="codefolio-yellow" icon={faPen} /></button>
          </div>
        )}
    <div>
        {languagesList.map((item, index) => (
          <span key={index} className="text-white">
            {item.language }
            {index < languagesList.length - 1 && (
              <span className="codefolio-yellow"> | </span>
            )}
          </span>
        ))}
      </div>
      <EditLanguagesModal
          isOpen={isModalOpen}
          onRequestClose={handleEdit}
          languages={languagesList}
          onDelete={handleDelete}
          onAdd={handleAdd}  // This function should update the skills in parent state
        />
  </div>
  </>
  )
}

export default Languages;
