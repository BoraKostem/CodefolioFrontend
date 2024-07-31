import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ChangePasswordPopup = ({ onClose }) => {
    const formik = useFormik({
        initialValues: {
            previousPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            previousPassword: Yup.string().required('Required'),
            newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('Required')
        }),
        onSubmit: (values) => {
            console.log('Password changed:', values);
            // Update password logic here
            // Example: axios.post('/api/user/change-password', values)
            onClose();
        }
    });

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='codefoliobg-gray p-6 rounded-md' style={{ width: '400px' }}>
                <h2 className='text-2xl codefolio-yellow mb-4'>Change Password</h2>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="password"
                        name="previousPassword"
                        placeholder='Previous Password'
                        value={formik.values.previousPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                    />
                    {formik.touched.previousPassword && formik.errors.previousPassword ? (
                        <div className='text-red-500'>{formik.errors.previousPassword}</div>
                    ) : null}

                    <input
                        type="password"
                        name="newPassword"
                        placeholder='New Password'
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                    />
                    {formik.touched.newPassword && formik.errors.newPassword ? (
                        <div className='text-red-500'>{formik.errors.newPassword}</div>
                    ) : null}

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder='Confirm New Password'
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='w-full py-2 mb-4 bg-transparent border-b outline-none focus:outline-none codefolio-white'
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className='text-red-500'>{formik.errors.confirmPassword}</div>
                    ) : null}

                    <button type="submit" className='w-full mt-2 py-2 codefoliobg-yellow rounded-md text-center text-black mb-2'>
                        Change Password
                    </button>
                    <button type="button" onClick={onClose} className='w-full py-2 codefolio-white-border rounded-md text-center'>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordPopup;
