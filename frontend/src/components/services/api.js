import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ERR_NETWORK') {
            console.error('Network Error: Is the backend running?');
        }
        return Promise.reject(error);
    }
);

// Artist API functions
export const getAllArtists = async () => {
    const response = await api.get('/artists');
    return response.data.data;
};

export const getArtistById = async (id) => {
    const response = await api.get(`/artists/${id}`);
    return response.data.data;
};

export const getArtistByName = async (name) => {
    const response = await api.get(`/artists/name/${encodeURIComponent(name)}`);
    return response.data.data;
};

export const getArtistsByTier = async (tier) => {
    const response = await api.get(`/artists/tier/${encodeURIComponent(tier)}`);
    return response.data.data;
};

export const createArtist = async (artistData) => {
    const response = await api.post('/artists', artistData);
    return response.data.data;
};

export const updateArtist = async (id, artistData) => {
    const response = await api.put(`/artists/${id}`, artistData);
    return response.data.data;
};

export const deleteArtist = async (id) => {
    const response = await api.delete(`/artists/${id}`);
    return response.data.data;
};

export const getAllBadges = async () => {
    const response = await api.get('/badges');
    return response.data.data;
};

export const getBadgeById = async (id) => {
    const response = await api.get(`/badges/${id}`);
    return response.data.data;
};

export const createBadge = async (badgeData) => {
    const response = await api.post('/badges', badgeData);
    return response.data.data;
};

export const updateBadge = async (id, badgeData) => {
    const response = await api.put(`/badges/${id}`, badgeData);
    return response.data.data;
};

export const deleteBadge = async (id) => {
    const response = await api.delete(`/badges/${id}`);
    return response.data.data;
};

// IMPORTANT: Export api as default
export default api;
