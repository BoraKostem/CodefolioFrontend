import React from 'react'

const Languages = ({data}) => {
    const languagesList = data || [];
  return (
    <>
    <h2 className="cv-title">Languages</h2>
    <div className="cv-container"> 
    <div>
        {languagesList.map((item, index) => (
          <span key={index} className="text-white">
            {item.language}
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

export default Languages;
