import React, { useState } from 'react';

const EditNamePopup = ({ userName, onClose }) => {
    const [name, setName] = useState(userName);

    const handleSave = () => {
        // Update user data logic here
        // Example: axios.post('/api/user/update', { name })
        console.log('Updated name:', name);
        onClose();
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
             <div className='codefoliobg-gray p-6 rounded-md'>
             <h2 className='text-2xl codefolio-yellow mb-4'>Edit Name</h2>
             <input
                 type="text"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'/>
                <button onClick={handleSave} className='w-full py-2 codefoliobg-yellow rounded-md text-center text-black mb-2'>Save</button>
                <button onClick={onClose} className='w-full py-2 codefolio-white-border rounded-md text-center'>Cancel</button>
            </div>
        </div>
    );
}

export default EditNamePopup;