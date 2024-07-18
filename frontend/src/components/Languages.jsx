import React from 'react'

const Languages = ({data}) => {
    const languagesList = data || [];
  return (
    <div className="deneme p-4 rounded-lg shadow-md mt-8 mx-auto max-w-6xl">
    <h2 className="text-xl font-bold text-gray-800 mb-2 codefolio-yellow">Languages</h2>
     <ul>
        {languagesList.map((item, index) => (
          <li key={index} className='text-white'>{item.language}</li>
        ))}
      </ul> 
  </div>
  )
}

export default Languages;
