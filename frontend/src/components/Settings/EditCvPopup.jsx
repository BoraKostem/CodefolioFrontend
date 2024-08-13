import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const EditCvPopup = ({  onClose }) => {
    const [cv, setCv] = useState(null);
    let [loading, setLoading] = useState(false);
     // Function to handle form submission
     const handleSave = async (e) => {
        e.preventDefault();

        if (!cv) {
            alert('Please upload your CV');
            return;
        }

        const formData = new FormData();
        formData.append('cv', cv);

        const accessToken = localStorage.getItem('accessToken');

        try {
          setLoading(true);
            const response = await fetch('https://qp6k69ftsi.execute-api.eu-central-1.amazonaws.com/prod/api/profile/cv/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: formData
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.error('Unauthorized: Access token expired or invalid');
                } else {
                    throw new Error('Failed to upload CV');
                }
                return;
            }

            const data = await response.json();
            console.log(data);
            onClose();
            setLoading(false);

        } catch (error) {
            console.error('Error:', error);
        }

    };



    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                   {loading ? (
        <div className="flex justify-center items-center">
        <ClipLoader
          color={"#F4CE14"}
          loading={loading}
          size={120}
          aria-label="Loading Spinner"
          data-testid="loader"
          
        />
        </div>
      ) :(
            <div className='codefoliobg-gray p-6 rounded-md'>
     
                <h2 className='text-2xl codefolio-yellow mb-4'>Edit CV</h2>
                <div className='flex flex-col items-center'>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setCv(e.target.files[0])}
                        className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'/>
                </div>
                <button onClick={handleSave} className='w-full py-2 codefoliobg-yellow rounded-md text-center text-black mb-2'>Save</button>
                <button onClick={onClose} className='w-full py-2 codefolio-white-border rounded-md text-center'>Cancel</button>
          
            </div> 
      )}      
        </div>
    );
}

export default EditCvPopup;
