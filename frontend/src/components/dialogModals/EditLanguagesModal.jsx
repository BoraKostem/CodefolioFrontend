import React, { useState} from 'react'
import GenericModal from './GenericModal';

const EditLanguagesModal = ({ isOpen, onRequestClose, languages, onDelete, onAdd }) => {
  const [languagesList, setLanguageList] = useState(languages || []);
  const [deletionArr, setDeletionArr] = useState([]);
  const [newLanguage, setNewLanguage] = useState('');
  const [addArr, setAddArr] = useState([]);



  const handleAdd = async () => {
    
      setAddArr(prev => [...prev, newLanguage]);
      setLanguageList(prev => [...prev, {"language": newLanguage}]);
      setNewLanguage(''); // Clear the input field after adding
   
  }

  const handleDeleteLanguage = async (languageToDelete) => {
    setDeletionArr(prev => [...prev, languageToDelete]);
    setLanguageList(languagesList => languagesList.filter(language => language.language !== languageToDelete.language));
  }

  const handleUpdates = async() => {
    
    try {
        const accessToken = localStorage.getItem('accessToken');

        for(let language of addArr){
          console.log(language);
          const response = await fetch('http://ec2-3-76-221-49.eu-central-1.compute.amazonaws.com:8000/api/profile/cv/language',{
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${accessToken}`
              },
              body: JSON.stringify({language})
          });
          if (response.ok){
              console.log("new skill added successfully");
              onAdd(language);
          }else{
              const errorData = await response.json();
              console.error("failed to add:", errorData.message);
          }
      }

        for(let language of deletionArr ){
            const response = await fetch('http://ec2-3-76-221-49.eu-central-1.compute.amazonaws.com:8000/api/profile/cv/language', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ language: language.language })  // Adjust this as needed based on API requirements
            });
    
            if (response.ok) {
            console.log("Delete successful");
            onDelete(language); // Call the function to update the skills in the parent component
            } else {
            const errorData = await response.json();
            console.error("Failed to delete:", errorData.message);
            alert(`Delete failed: ${errorData.message}`);
            }
        }

       
        setAddArr([]);
        setDeletionArr([]);
        console.log("array deleted");
      } catch (error) {
        console.error("Failed to delete skill:", error);
      }

      onRequestClose();
  
    }

  return (
    <GenericModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onSave={handleUpdates}
      title="Edit Languages"
    >
      <div className="flex flex-wrap gap-2">
        {languagesList.map((language, index) => (
          <div key={index} className="flex items-center">
            <button
              className="bg-gray-200 text-black rounded px-3 py-1 mr-2 cursor-pointer flex items-center"
              onClick={() => handleDeleteLanguage(language)}
            >
              {language.language} <span className="ml-2">x</span>
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-5">
      <label className="font-bold codefolio-yellow">Add a New Language</label>
      <div className="flex flex-row my-5 w-full"> 
            <input
                type="text"
                placeholder="Enter a new skill"
                value={newLanguage}
                onChange={e => setNewLanguage(e.target.value)}
                className="block p-2 border w-5/6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></input> 
            <button 
            onClick={handleAdd}
            className="codefoliobg-yellow rounded-lg text-white w-10 mx-5"
            >+</button>
        </div>
        </div>
    </GenericModal>
  );
}

export default EditLanguagesModal
