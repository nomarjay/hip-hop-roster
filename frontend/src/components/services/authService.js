import axios from 'axios';

const API_BASE_URL = 'http://104.236.121.210:8086/api/auth';

export const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });

        if (response.data.token) {
            localStorage.setItem('authtoken', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('role', response.data.role);
        }
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        throw error; // Re-throw so your UI can show an error message
    }
};



export const logout = () => {
	localStorage.removeItem('authToken');
	localStorage.removeItem('username');
	localStorage.removeItem('role');
};

export const isAuthenticated = () => {
	return !!localStorage.getItem('authToken');
};

export const getAuthToken = () => {
	return localStorage.getItem('authToken');
};

export const getUsername = () => {
	return localStorage.getItem('username');
};
