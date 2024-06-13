// frontend/src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../utils/auth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/home-page');         
        }catch (err)
            {
            setError('Invalid credentials');
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">                    
                        Login
                    </button>
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </form>
                <div className="mt-4 text-center">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 hover:underline" onClick={handleRegister}>
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
