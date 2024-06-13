import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {            
            const response = await axios.post('http://localhost:5000/api/users/register', { email, password });
            setSuccessMessage('Registration successful. Redirecting to home page...');
            setTimeout(() => {
                navigate('/');
            }, 2000); // Redirect after 2 seconds
        } catch (err) {
            setError('User already exists');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
               <div>
                    <h1 className="text-center text-2xl font-bold text-gray-900 mb-5">Register</h1>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mt-3"
                                placeholder="Password"
                                value={password}
                                minLength={8}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
                    {successMessage && <p className="mt-2 text-center text-sm text-indigo-600">{successMessage}</p>}

                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                            >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
