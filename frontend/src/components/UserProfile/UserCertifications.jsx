import React, { useContext, useEffect, useState } from "react";


const UserCertifications = ({ data }) => {
  const [certificateList, setCertificateList] = useState(data || []);

  useEffect(() => {
    setCertificateList(data);
  },[data]);



  return (
    <>
    
    {certificateList.length > 0 && (
    <div>
    <h2 className="cv-title">Certificates</h2>
      <div className="cv-container">
        <ul className="list-disc ml-4 text-white">
          {certificateList.map((item, index) => (
            <li key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold text-white flex justify-start">
                  {item.certification_name}
                  <span className="text-white font-normal"> &nbsp; {item.date}</span>
                </h3>
              </div>
              <div>
                <p className="text-white flex text-left">{item.description}</p>
                <p className="text-white flex text-left">{item.url}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    )}
    </>
  )
}

export default UserCertifications;
