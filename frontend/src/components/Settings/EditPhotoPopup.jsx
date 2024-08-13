import React, { useState } from 'react';
import { API_BASE_URL } from '../../utils/config';
import ClipLoader from "react-spinners/ClipLoader";

const EditPhotoPopup = ({ userPhoto, onClose }) => {
    const [photo, setPhoto] = useState(userPhoto);
    const [loading, setLoading] = useState(false);

    const handleSave = async() => {


        if (!photo) {
            alert('Please upload your CV');
            return;
        }

        const formData = new FormData();
        formData.append('profile_photo', photo);
        const accessToken = localStorage.getItem('accessToken');

        try{
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/profile/photo`,{
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
        }catch(error){
            console.error('Error:', error);
        }
        console.log('Updated photo:', photo);
        onClose();
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

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
                <h2 className='text-2xl codefolio-yellow mb-4'>Edit Photo</h2>
                <div className='flex flex-col items-center'>
                    {photo ? (
                        <img src={photo} alt="New Profile" className='w-24 h-24 rounded-full mb-4 object-cover'/>
                    ) : (
                        <span className='codefolio-white mb-4'>No Photo</span>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'/>
                </div>
                <button onClick={handleSave} className='w-full py-2 codefoliobg-yellow rounded-md text-center text-black mb-2'>Save</button>
                <button onClick={onClose} className='w-full py-2 codefolio-white-border rounded-md text-center'>Cancel</button>
            </div>
      )}
        </div>
    );
}

export default EditPhotoPopup;
