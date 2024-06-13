// frontend/src/utils/auth.js
import * as jwtDecode from 'jwt-decode';

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    const token = getToken();
    if (!token) {
        return false;
    }
    try {
        const { exp } = jwtDecode(token);
        if (exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const decodeToken = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwt.decode(token);
        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};