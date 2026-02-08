import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8086/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ERR_NETWORK') {
            console.error('Network Error: Is the backend running?');
        }
        if (error.response?.status === 401) {
            // Don't redirect on 401 for now
            console.log('Unauthorized - check your credentials');
        }
        return Promise.reject(error);
    }
);

// Artist API functions
export const getAllArtists = async () => {
    const response = await api.get('/artists');
    return response.data;
};

export const getArtistById = async (id) => {
    const response = await api.get(`/artists/${id}`);
    return response.data;
};

export const getArtistByName = async (name) => {
    const response = await api.get(`/artists/name/${name}`);
    return response.data;
};

export const getArtistsByTier = async (tier) => {
    const response = await api.get(`/artists/tier/${tier}`);
    return response.data;
};

export const createArtist = async (artistData) => {
    const response = await api.post('/artists', artistData);
    return response.data;
};

export const updateArtist = async (id, artistData) => {
    const response = await api.put(`/artists/${id}`, artistData);
    return response.data;
};

export const deleteArtist = async (id) => {
    const response = await api.delete(`/artists/${id}`);
    return response.data;
};

// IMPORTANT: Export api as default
export default api;
