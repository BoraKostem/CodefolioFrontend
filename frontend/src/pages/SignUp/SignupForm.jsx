import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    
    const initialValues = {
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        fullName: Yup.string().required('Full Name is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSignup = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await fetch('https://qp6k69ftsi.execute-api.eu-central-1.amazonaws.com/prod/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                    name: values.fullName
                })
            });

            if (!response.ok) {
                throw new Error('Failed to sign up');
            }

            const data = await response.json();
            console.log('User created successfully:', data);
            navigate('/dashboard');
            resetForm();
            
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Failed to sign up, please try again.');
        }
        setSubmitting(false);
    };

    return (
        <div className="w-full h-screen flex flex-col codefoliobg-gray items-center">
            <div className='mt-10'>
                <h3 className='text-5xl text-center font-bold codefolio-yellow tracking-widest'>Codefolio</h3>
            </div>
            <div className='w-full p-20 sm:w-4/12 sm:p-0 justify-center'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSignup}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div>
                                <Field 
                                    type="email" 
                                    name="email"
                                    placeholder="Email"
                                    className="w-full py-4 my-2 bg-transparent border-b outline-none codefolio-white"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div>
                                <Field 
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    className="w-full py-4 my-2 bg-transparent border-b outline-none codefolio-white"
                                />
                                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='relative'>
                                <Field 
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="w-full py-4 my-2 bg-transparent border-b outline-none codefolio-white"
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-4 top-6 cursor-pointer codefolio-white'
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='relative'>
                                <Field 
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="w-full py-4 my-2 bg-transparent border-b outline-none codefolio-white"
                                />
                                <FontAwesomeIcon
                                    icon={showConfirmPassword ? faEyeSlash : faEye}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className='absolute right-4 top-6 cursor-pointer codefolio-white'
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full my-2 font-semibold codefoliobg-yellow rounded-md py-4 text-center flex items-center justify-center"
                                disabled={isSubmitting}
                            >
                                Sign up
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className='w-full'>
                    <p className='text-sm font-normal codefolio-white'>Already, have an account? <Link to="/login" className='font-semibold underline underline-offset-2 cursor-pointer codefolio-yellow'>Login</Link></p>
                </div>
                <button className='w-full my-2 font-semibold bg-transparent codefolio-yellow codefolio-yellow-border rounded-lg py-4 text-center flex items-center justify-center'>
                            Back to Home
                </button>
            </div>
        </div>
    );
};

export default SignupForm;
