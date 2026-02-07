import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, //
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authtoken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Global Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ERR_NETWORK') {
            console.error('Network Error: Is the backend/database running?'); //
        }
        if (error.response?.status === 401) {
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const getAllArtists = async () => {
    try {
        const response = await api.get('/artists');
        return response.data;
    } catch (error) {
        console.error('Error fetching all artists:', error.message);
        throw error;
    }
};

export const getArtistById = async (id) => {
    try {
        const response = await api.get(`/artists/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching artist with ID ${id}:`, error.message);
        throw error;
    }
};

export const getArtistByName = async (name) => {
    try {
        const response = await api.get(`/artists/name/${name}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching artist named ${name}:`, error.message);
        throw error;
    }
};

export const getArtistsByTier = async (tier) => {
    try {
        const response = await api.get(`/artists/tier/${tier}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching artists in tier ${tier}:`, error.message);
        throw error;
    }
};

export const createArtist = async (artistData) => {
    try {
        const response = await api.post('/artists', artistData);
        return response.data;
    } catch (error) {
        console.error('Error creating artist:', error.response?.data || error.message);
        throw error;
    }
};

export const updateArtist = async (id, artistData) => {
    try {
        const response = await api.put(`/artists/${id}`, artistData);
        return response.data;
    } catch (error) {
        console.error(`Error updating artist ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export const deleteArtist = async (id) => {
    try {
        const response = await api.delete(`/artists/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting artist ${id}:`, error.message);
        throw error;
    }
};

export default api;
