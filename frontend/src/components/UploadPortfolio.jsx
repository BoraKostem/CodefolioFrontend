import { getIn } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClockLoader from "react-spinners/ClockLoader";
import { API_BASE_URL } from '../utils/config';

const UploadPortfolio = () => {
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [cv, setCv] = useState(null);
    const [github, setGithub] = useState('');
    const [medium, setMedium] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Function to simulate a delay
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Function to handle form submission
    const handleSubmit = async (e) => {
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
            const response = await fetch(`${API_BASE_URL}/profile/cv/upload`, {
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

             // Upload GitHub URL
             if(github){
             const githubResponse = await fetch('https://qp6k69ftsi.execute-api.eu-central-1.amazonaws.com/prod/api/profile/github', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ github_url: github })
            });
            console.log(githubResponse);
            if (!githubResponse.ok) {
                throw new Error('Failed to upload GitHub URL');
            }
            }
            setLoading(false);
            navigate('/profile');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to handle "Skip for now" click
    const handleSkip = () => {
        navigate('/'); // Or wherever you want to navigate
    };

    return (
        <div className='w-full h-full flex items-center justify-center'>
            {loading ? (
                <div className='flex flex-col p-20 mt-20'>
                    <div className='flex justify-center'>
                        <ClockLoader
                            color="#F4CE14"
                            loading={loading}
                            size={100}
                        />
                    </div>
                    <h1 className='codefolio-yellow font-bold p-10'>Preparing your Portfolio...</h1>
                </div>
            ) : (
                <div className='mt-20 lg:w-1/3 sm:w-1/2 h-auto flex flex-col p-10 justify-between codefoliobg-gray rounded-md'>
                    <h1 className='text-4xl text-center font-bold codefolio-yellow tracking-widest mb-6'>Upload Portfolio</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <div className='relative'>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setCv(e.target.files[0])}
                                className='hidden'
                                id='cv-upload'
                            />
                            <label
                                htmlFor='cv-upload'
                                className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white cursor-pointer flex items-center justify-between'
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
                        <button
                            type="submit"
                            className='w-full py-4 my-2 font-semibold codefoliobg-yellow rounded-md text-center flex items-center justify-center'
                        >
                            Create Portfolio
                        </button>
                    </form>
                    <button
                        onClick={handleSkip}
                        className='mt-6 px-2 py-1 text-sm font-semibold codefolio-white rounded-md text-center w-auto'
                    >
                        Skip for now
                    </button>
                </div>
            )}

        </div>
    );
}

export default UploadPortfolio;
