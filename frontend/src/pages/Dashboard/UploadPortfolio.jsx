import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClockLoader from "react-spinners/ClockLoader";

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
            // Simulate the upload time with a delay of 10 seconds
            await delay(10000);
            setLoading(false);
            console.log("CV uploaded successfully (simulation)");

            // Uncomment below for real upload
            /*
            const response = await fetch(api, {
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
            */

            navigate('/profile');
        } catch (error) {
            console.error('Error:', error);
            alert("Failed to create portfolio. Try again...");
            setLoading(false);
        }
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
                                {/* Add more options as needed */}
                            </select>
                        </div>
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
                            Create Portfolio
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default UploadPortfolio;
