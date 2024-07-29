import React, { useState } from 'react';

const EditPopup = ({ field, userData, onClose }) => {
    const [value, setValue] = useState(userData[field]);

    const handleSave = async() => {
        
        try {
           
            const response = await fetch('http://ec2-3-76-221-49.eu-central-1.compute.amazonaws.com:8000/api/profile/cv/upload', {
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
     

            navigate('/profile');
        } catch (error) {
            console.error('Error:', error);
        }
        onClose();
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='codefoliobg-gray p-6 rounded-md'>
                <h2 className='text-2xl codefolio-yellow mb-4'>Edit {field}</h2>
                {field === 'profilePhoto' ? (
                    <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(e) => setValue(URL.createObjectURL(e.target.files[0]))}
                        className='mb-4'
                    />
                ) : field === 'cv' ? (
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setValue(e.target.files[0])}
                        className='mb-4 codefolio-white'
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                    />
                )}

                <button onClick={handleSave} className='w-full py-2 codefoliobg-yellow rounded-md text-center text-black mb-2'>Save</button>
                <button onClick={onClose} className='w-full py-2 codefolio-white-border rounded-md text-center'>Cancel</button>
            </div>
        </div>
    );
}

export default EditPopup;