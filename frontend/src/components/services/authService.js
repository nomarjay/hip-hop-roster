import axios from 'axios';

const API_BASE_URL = '/api/auth';

export const login = async (username, password) => {
	const response = await axios.post(`${API_BASE_URL}/login`, {
		username,
		password,
	});

	if (response.data.token) {
		localStorage.setItem('authToken', response.data.token);
		localStorage.setItem('username', response.data.username);
		localStorage.setItem('role', response.data.role);
	}

	return response.data;
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
