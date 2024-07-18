import React, { useState, useEffect } from 'react';
import EditPopup from './EditPopup';
import ChangePasswordPopup from './ChangePasswordPopup';

const Settings = () => {
    const [userData, setUserData] = useState({});
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = useState(false);
    const [editField, setEditField] = useState('');

    useEffect(() => {
        // Fetch user data when component mounts
        fetchUserData();
    }, []);

    const fetchUserData = () => {
        setTimeout(() => {
            setUserData({
                email: 'example@example.com', // Static email
                password: '********', // Hidden password
                profilePhoto: 'https://picsum.photos/200',
                fullName: 'Mehmet Akif Yavuz',
                country: 'Turkey',
                region: 'Istanbul',
                cv: { name: 'CV.pdf' },
                github: 'https://github.com/example',
                medium: 'https://medium.com/@example'
            });
        }, 1000);
    };

    const openEditPopup = (field) => {
        setEditField(field);
        setIsEditPopupOpen(true);
    };

    const openChangePasswordPopup = () => {
        setIsChangePasswordPopupOpen(true);
    };

    return (
        <div className='w-screen h-screen codefoliobg-white'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h1 className='border-b border-gray-900/10 pb-2 text-4xl text-center font-bold codefolio-yellow tracking-widest mb-6'>Settings</h1>
                    <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-6">
                        {/* Photo Section */}
                        <div className="flex flex-col items-center gap-y-3 sm:col-span-3 border p-3 mx-2">
                            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Photo
                            </label>
                            <div className="mt-2 flex items-center justify-center gap-x-3">
                            <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                                {userData.profilePhoto ? (
                                    <img src={userData.profilePhoto} alt="Profile" className='w-full h-full object-cover' />
                                ) : (
                                    <span className='codefolio-white'>No Photo</span>
                                )}
                            </div>
                            <button
                                onClick={() => openEditPopup('profilePhoto')}
                                type="button"
                                className="mt-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Change Photo
                            </button>
                            </div>
                        </div>
                        
                        {/* Email and Password Section */}
                        <div className="flex border p-3 mx-2 flex-col items-center gap-y-3 sm:col-span-3">
                            <div className="flex flex-col sm:flex-row items-center py-5 gap-y-3 sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 sm:mr-2">
                                    Email: 
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className='codefolio-black bg-gray-100 px-2 py-1.5 rounded-md text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300'
                                    value={userData.email}
                                    disabled
                                />
                            </div>
                            <button
                                onClick={openChangePasswordPopup}
                                type="button"
                                className="mt-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Change Password
                            </button>
                        </div>
                        {/* Name Section */}
                        <div className="border p-3 mx-2 flex flex-col items-center gap-y-3 sm:col-span-3">
                            <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2 flex items-center justify-center">
                                <input
                                    id="full-name"
                                    name="full-name"
                                    className='codefolio-black bg-gray-100 px-2 py-1.5 rounded-md text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300'
                                    value={userData.fullName}
                                    disabled
                                />
                                <button
                                    onClick={() => openEditPopup('fullName')}
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-2"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        {/* CV Section */}
                        <div className="border p-3 mx-2 flex flex-col items-center gap-y-3 sm:col-span-3">
                            <label htmlFor="cv" className="block text-sm font-medium leading-6 text-gray-900">
                                CV
                            </label>
                            <div className="mt-2 flex items-center justify-center">
                                <input
                                    id="full-name"
                                    name="full-name"
                                    className='codefolio-black bg-gray-100 px-2 py-1.5 rounded-md text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300'
                                    value={userData.cv ? userData.cv.name : 'No CV Uploaded'}
                                    disabled
                                />
                                {userData.cv && (
                                    <a
                                        href={userData.cv.name}
                                        download={userData.cv.name}
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-2"
                                    >
                                        Download
                                    </a>
                                )}
                                <button
                                    onClick={() => openEditPopup('cv')}
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-2"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-y-3 sm:col-span-3 border p-3 mx-2">
                            <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                                GtiHub Profile
                            </label>
                            <div className="mt-2 flex items-center justify-center">
                                <input
                                    id="full-name"
                                    name="full-name"
                                    className='codefolio-black bg-gray-100 px-2 py-1.5 rounded-md text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300'
                                    value= {userData.github}
                                    disabled
                                />
                                <a
                                    href={userData.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-2"
                                >
                                    Visit
                                </a>
                                <button
                                    onClick={() => openEditPopup('github')}
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-2"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-y-3 sm:col-span-3 border p-3 mx-2">
                            <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Medium Profile
                            </label>
                            <div className="mt-2 flex items-center justify-center">
                                <input
                                    id="full-name"
                                    name="full-name"
                                    className='codefolio-black bg-gray-100 px-2 py-1.5 rounded-md text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300'
                                    value= {userData.medium}
                                    disabled
                                />
                                <a
                                    href={userData.medium}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-2"
                                >
                                    Visit
                                </a>
                                <button
                                    onClick={() => openEditPopup('medium')}
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-2"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isEditPopupOpen && <EditPopup field={editField} userData={userData} onClose={() => setIsEditPopupOpen(false)} />}
            {isChangePasswordPopupOpen && <ChangePasswordPopup onClose={() => setIsChangePasswordPopupOpen(false)} />}
        </div>
    );
    
}

export default Settings;