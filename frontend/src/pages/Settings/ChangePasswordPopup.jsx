import React, { useState } from 'react';

const ChangePasswordPopup = ({ onClose }) => {
    const [previousPassword, setPreviousPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match');
            return;
        }

        // Update password logic here
        // Example: axios.post('/api/user/change-password', { previousPassword, newPassword })
        console.log('Password changed:', { previousPassword, newPassword });
        onClose();
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='codefoliobg-gray p-6 rounded-md'>
                <h2 className='text-2xl codefolio-yellow mb-4'>Change Password</h2>
                <input
                    type="password"
                    placeholder='Previous Password'
                    value={previousPassword}
                    onChange={(e) => setPreviousPassword(e.target.value)}
                    className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                />
                <input
                    type="password"
                    placeholder='New Password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                />
                <input
                    type="password"
                    placeholder='Confirm New Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                />
                <button onClick={handleChangePassword} className='w-full py-2 codefoliobg-yellow rounded-md text-center text-black mb-2'>Change Password</button>
                <button onClick={onClose} className='w-full py-2 codefolio-white-border rounded-md text-center'>Cancel</button>
            </div>
        </div>
    );
}

export default ChangePasswordPopup;