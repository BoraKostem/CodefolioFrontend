import React, { useState } from 'react';

const EditPhotoPopup = ({ userPhoto, onClose }) => {
    const [photo, setPhoto] = useState(userPhoto);

    const handleSave = () => {
        // Update user photo logic here
        // Example: axios.post('/api/user/update', { photo })
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
                        onChange={handlePhotoChange}
                        className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'/>
                </div>
                <button onClick={handleSave} className='w-full py-2 codefoliobg-yellow rounded-md text-center text-black mb-2'>Save</button>
                <button onClick={onClose} className='w-full py-2 codefolio-white-border rounded-md text-center'>Cancel</button>
            </div>
        </div>
    );
}

export default EditPhotoPopup;
