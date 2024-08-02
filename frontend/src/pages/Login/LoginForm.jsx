import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import background from "../../assets/background.png";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://ec2-18-159-106-239.eu-central-1.compute.amazonaws.com:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            localStorage.setItem('accessToken', data.access);
            console.log('accessToken:', data.access);
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Invalid credentials, please try again.');
        }
    };

    return (
        <div className='w-full h-full sm:flex items-start codefoliobg-gray'>
            <div className='h-full flex'>
                <img src={background} className='sm:w-full h-full sm:h-1/4' alt='background'/>
            </div>
            <div className='w-full sm:w-1/2 h-full flex flex-col p-20 justify-between '>
                <h1 className='text-5xl text-center font-bold codefolio-yellow tracking-widest'>Codefolio</h1>
                <div className='w-full flex flex-col '>
                    <div className='w-full flex flex-col mb-10'>
                        <h3 className='text-2xl font-semibold mb-4 codefolio-white'>Login</h3>
                        <p className='text-sm mb-3 codefolio-white'>Welcome Back! Please enter your details</p>
                    </div>
                    <div className='w-full flex flex-col'>
                        <form onSubmit={handleLogin}>
                            <input 
                                type="email" 
                                placeholder='Username, or Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full py-4 my-2 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                            />
                            <div className='relative'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full py-4 my-2 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-4 top-6 cursor-pointer codefolio-white'
                                />
                            </div>
                            <button type="submit" className='w-full my-2 font-semibold codefoliobg-yellow rounded-md py-4 text-center flex items-center justify-center'>
                                Log in
                            </button>
                        </form>
                        <button className='w-full my-2 font-semibold codefoliobg-white rounded-md py-4 text-center flex items-center justify-center'>
                            Sign up
                        </button>
                        <div className='w-full flex flex-row items-center justify-center relative py-2'>
                            <div className='w-1/2 h-[1px] codefoliobg-white'></div>
                            <p className='text-lg absolute codefolio-white'> or </p>
                            <div className='w-full h-[1px] codefoliobg-white'></div>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <p className='text-sm font-normal codefolio-white'>Don't have an account? <Link to="/signup" className='font-semibold underline underline-offset-2 cursor-pointer codefolio-yellow'>Sign up for free</Link></p>
                </div>
                <button className='w-full my-2 font-semibold bg-transparent codefolio-yellow codefolio-yellow-border rounded-lg py- text-center flex items-center justify-center'>
                            Back to Home
                </button>
            </div>
        </div>
    );
}

export default LoginForm;
