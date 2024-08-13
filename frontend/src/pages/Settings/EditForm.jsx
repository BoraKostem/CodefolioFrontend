import React, { useState, useEffect } from 'react';
import { EditPopup, ChangePasswordPopup, EditNamePopup, EditPhotoPopup, EditCvPopup } from '../../components/Settings';
import EditGithubPopup from '../../components/Settings/EditGithubPopup';
import { API_BASE_URL } from '../../utils/config';

const Settings = () => {
    const [userData, setUserData] = useState({});
    const [isEditNamePopupOpen, setIsEditNamePopupOpen] = useState(false);
    const [isEditPhotoPopupOpen, setIsEditPhotoPopupOpen] = useState(false);
    const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = useState(false);
    const [isEditCVPopupOpen, setIsEditCVPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isEditGithubPopupOpen, setIsEditGithubPopupOpen] = useState(false);
    const [editField, setEditField] = useState('');

    

    useEffect(() => {
        // Fetch user data when component mounts
        fetchUserData();
    },[]);

    const fetchUserData = async() => {
        const accessToken = localStorage.getItem('accessToken');
        try{
        const response = await fetch(`${API_BASE_URL}/whoami`,{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        console.log(data);
        setUserData({
            email: data.email,
            profilePhoto: data.profile_photo, // Static profile photo
            fullName: data.name,
            country: 'Turkey',
            region: 'Istanbul',
            cv: { name: 'CC.pdf' },
            github: data.github_url
        });
        console.log(userData)
        console.log(userData.profilePhoto);
        }catch(error){
            console.log(error);
        }

            
    };

    const openEditPopup = (field) => {
        setEditField(field);
        setIsEditPopupOpen(true);
    };

    const openEditNamePopup = () => {
        setIsEditNamePopupOpen(true);
    };

    const openEditPhotoPopup = () => {
        setIsEditPhotoPopupOpen(true);
    };

    const openChangePasswordPopup = () => {
        setIsChangePasswordPopupOpen(true);
    };

    const openEditCVPopup = () => {
        setIsEditCVPopupOpen(true);
    };

    const openEditGithubPopup = () => {
        setIsEditGithubPopupOpen(true);
    };

    return (
        <div className='w-screen h-screen codefoliobg-white'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="border-b mt-10 border-gray-900/10 pb-12">
                    <h1 className='border-b border-gray-900/10 pb-2 text-4xl text-center font-bold codefolio-yellow tracking-widest mb-6'>Settings</h1>
                    <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-6">
                        <div className="flex flex-col items-center gap-y-3 sm:col-span-3 border p-3 mx-2">
                            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Photo
                            </label>
                            <div className="mt-2 flex items-center justify-center gap-x-3 relative">
                                <div className="h-24 w-24 border-2 border-black-100
                                 rounded-full overflow-hidden bg-gray-100 relative group">
                                    {userData.profilePhoto ? (
                                        <img src={userData.profilePhoto} alt="Profile" className='w-full h-full object-cover' />
                                    ) : (
                                        <span className='codefolio-black justify-center flex items-center h-full w-full text-center'>No Photo</span>
                                    )}
                                    <button
                                        onClick={() => openEditPhotoPopup()}
                                        type="button"
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                                    >
                                        Change Photo
                                    </button>
                                </div>
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
                                <button
                                    onClick={() => openEditCVPopup()}
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-2"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-y-3 sm:col-span-3 border p-3 mx-2">
                            <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                                GitHub Profile
                            </label>
                            <div className="mt-2 flex items-center justify-center">
                                <input
                                    id="full-name"
                                    name="full-name"
                                    className='codefolio-black bg-gray-100 px-2 py-1.5 rounded-md text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300'
                                    value={userData.github}
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
                                    onClick={() => openEditGithubPopup()}
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
            {isEditNamePopupOpen && <EditNamePopup userName={userData.fullName} onClose={() => setIsEditNamePopupOpen(false)} />}
            {isEditPhotoPopupOpen && <EditPhotoPopup userPhoto={userData.profilePhoto} onClose={() => setIsEditPhotoPopupOpen(false)} />}
            {isEditCVPopupOpen && <EditCvPopup onClose={() => setIsEditCVPopupOpen(false)} />}
            {isEditGithubPopupOpen && <EditGithubPopup field={editField} userData={userData.github} onClose={() => setIsEditGithubPopupOpen(false)}/>}
        </div>
    );

}

export default Settings;


/*
<div className="flex flex-col items-center gap-y-3 sm:col-span-3 border p-3 mx-2">
                            <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Medium Profile
                            </label>
                            <div className="mt-2 flex items-center justify-center">
                                <input
                                    id="full-name"
                                    name="full-name"
                                    className='codefolio-black bg-gray-100 px-2 py-1.5 rounded-md text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300'
                                    value={userData.medium}
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
                                    onClick={() => openEditNamePopup()}
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-2"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>

                      s
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

                        */
