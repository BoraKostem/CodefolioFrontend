import React, { useContext, useEffect, useState } from 'react'


const UserLanguages = ({data}) => {
    const [languagesList, setLanguageList ] = useState( data || []);

    useEffect(() => {
        setLanguageList(data);
    });

  return (
    <>
    <h2 className="cv-title">Languages</h2>
    <div className="cv-container">
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
  </div>
  </>
  )
}

export default UserLanguages;
