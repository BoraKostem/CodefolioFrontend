import React, { useState } from 'react';

const EditCvPopup = ({ userCv, onClose }) => {
    const [cv, setCv] = useState(userCv);

    /*
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
            setLoading(false);

            navigate('/profile');
        } catch (error) {
            console.error('Error:', error);
        }
    };
    */
    const handleSave = () => {
        // Update user CV logic here
        // Example: axios.post('/api/user/update', { cv })
        console.log('Updated CV:', cv);
        onClose();
    }

    const handleCvChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCv(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='codefoliobg-gray p-6 rounded-md'>
                <h2 className='text-2xl codefolio-yellow mb-4'>Edit CV</h2>
                <div className='flex flex-col items-center'>
                    {/*{cv ? (
                        <embed src={cv} type="application/pdf" className='w-full h-64 mb-4'/>
                    ) : (
                        <span className='codefolio-white mb-4'>No CV uploaded</span>
                    )}*/}
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleCvChange}
                        className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'/>
                </div>
                <button onClick={handleSave} className='w-full py-2 codefoliobg-yellow rounded-md text-center text-black mb-2'>Save</button>
                <button onClick={onClose} className='w-full py-2 codefolio-white-border rounded-md text-center'>Cancel</button>
            </div>
        </div>
    );
}

export default EditCvPopup;
