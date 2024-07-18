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
                profilePhoto: 'https://example.com/profile.jpg',
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
        <div className='w-full h-screen flex items-center justify-center codefoliobg-gray'>
            <div className='lg:w-1/3 sm:w-1/2 h-auto flex flex-col p-10 justify-between codefoliobg-gray rounded-md'>
                <h1 className='text-4xl text-center font-bold codefolio-yellow tracking-widest mb-6'>Settings</h1>
                <div className='flex flex-col'>
                    <div className='relative mb-4 flex justify-center'>
                        <div className='w-32 h-32 rounded-full overflow-hidden bg-transparent border-2 border-dashed border-codefolio-white'>
                            {userData.profilePhoto ? (
                                <img src={userData.profilePhoto} alt="Profile" className='w-full h-full object-cover' />
                            ) : (
                                <span className='codefolio-white'>No Photo</span>
                            )}
                        </div>
                        <button onClick={() => openEditPopup('profilePhoto')} className='absolute top-0 right-0 codefolio-yellow'>Edit</button>
                    </div>
                    <div className='relative mb-4'>
                        <label className='text-lg codefolio-white mb-2'>Full Name</label>
                        <span className='codefolio-white'>{userData.fullName}</span>
                        <button onClick={() => openEditPopup('fullName')} className='absolute top-0 right-0 codefolio-yellow'>Edit</button>
                    </div>
                    <div className='relative mb-4'>
                        <label className='text-lg codefolio-white mb-2'>Location</label>
                        <span className='codefolio-white'>{userData.country}, {userData.region}</span>
                        <button onClick={() => openEditPopup('location')} className='absolute top-0 right-0 codefolio-yellow'>Edit</button>
                    </div>
                    <div className='relative mb-4'>
                        <label className='text-lg codefolio-white mb-2'>CV</label>
                        <span className='codefolio-white'>{userData.cv ? userData.cv.name : 'No CV Uploaded'}</span>
                        <button onClick={() => openEditPopup('cv')} className='absolute top-0 right-0 codefolio-yellow'>Edit</button>
                    </div>
                    <div className='relative mb-4'>
                        <label className='text-lg codefolio-white mb-2'>GitHub Profile</label>
                        <span className='codefolio-white'>{userData.github}</span>
                        <button onClick={() => openEditPopup('github')} className='absolute top-0 right-0 codefolio-yellow'>Edit</button>
                    </div>
                    <div className='relative mb-4'>
                        <label className='text-lg codefolio-white mb-2'>Medium Profile</label>
                        <span className='codefolio-white'>{userData.medium}</span>
                        <button onClick={() => openEditPopup('medium')} className='absolute top-0 right-0 codefolio-yellow'>Edit</button>
                    </div>
                    <button
                        onClick={openChangePasswordPopup}
                        className='w-full py-4 my-2 font-semibold codefoliobg-yellow rounded-md text-center flex items-center justify-center'
                    >
                        Change Password
                    </button>
                </div>
            </div>

            {isEditPopupOpen && <EditPopup field={editField} userData={userData} onClose={() => setIsEditPopupOpen(false)} />}
            {isChangePasswordPopupOpen && <ChangePasswordPopup onClose={() => setIsChangePasswordPopupOpen(false)} />}
        </div>
    );
}

export default Settings;






/*import React, { useState } from 'react';

const Settings = () => {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [cv, setCv] = useState(null);
    const [github, setGithub] = useState('');
    const [medium, setMedium] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            profilePhoto,
            fullName,
            password,
            country,
            region,
            cv,
            github,
            medium
        });
    };

    return (
        <div className='w-full mt-20 h-full flex items-center justify-center'>
            <div className='lg:w-1/3 sm:w-1/2 h-auto flex flex-col p-10 justify-between codefoliobg-gray rounded-md'>
                <h1 className='text-4xl text-center font-bold codefolio-yellow tracking-widest mb-6'>Settings</h1>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <label className='text-lg codefolio-white mb-2'>Profile Photo</label>
                    <div className='relative mb-4'>
                        <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={(e) => setProfilePhoto(e.target.files[0])}
                            className='hidden'
                            id='profile-photo-upload'
                        />
                        <label
                            htmlFor='profile-photo-upload'
                            className='w-full py-2 bg-transparent border-b outline-none focus:outline-none codefolio-white cursor-pointer flex items-center justify-between'
                        >
                            <span className='opacity-50'>{profilePhoto ? profilePhoto.name : 'Upload your Profile Photo'}</span>
                            <span className='py-2 px-4 codefoliobg-yellow rounded-md text-center flex items-center justify-center text-black'>Browse</span>
                        </label>
                    </div>
                    <input
                        placeholder='Full Name'
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                    />
                    <input
                        placeholder='Password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                    />
                    <label className='text-lg codefolio-white mb-2'>Location</label>
                    <div className='flex justify-between'>
                        <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className='w-5/12 py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                        >
                            <option value="" disabled>Select your country</option>
                            <option value="tr">Türkiye</option>
                            <option value="us">United States</option>
                        </select>
                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className='w-5/12 py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                        >
                            <option value="" disabled>Select your region</option>
                            <option value="region1">Region 1</option>
                            <option value="region2">Region 2</option>
                        </select>
                    </div>
                    <div className='relative mb-4'>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setCv(e.target.files[0])}
                            className='hidden'
                            id='cv-upload'
                        />
                        <label
                            htmlFor='cv-upload'
                            className='w-full py-2 bg-transparent border-b outline-none focus:outline-none codefolio-white cursor-pointer flex items-center justify-between'
                        >
                            <span className='opacity-50'>{cv ? cv.name : 'Upload your CV'}</span>
                            <span className='py-2 px-4 codefoliobg-yellow rounded-md text-center flex items-center justify-center text-black'>Browse</span>
                        </label>
                    </div>
                    <input
                        placeholder='GitHub Profile Link'
                        type="url"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                    />
                    <input
                        placeholder='Medium Profile Link'
                        type="url"
                        value={medium}
                        onChange={(e) => setMedium(e.target.value)}
                        className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                    />
                    <button
                        type="submit"
                        className='w-full py-4 my-2 font-semibold codefoliobg-yellow rounded-md text-center flex items-center justify-center'
                    >
                        Save Settings
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Settings;*/