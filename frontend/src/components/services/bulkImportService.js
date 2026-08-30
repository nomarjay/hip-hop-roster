import { createArtist } from './api';

const importArtists = async (artists) => {
    const results = await Promise.allSettled(artists.map(createArtist));
    const errorDetails = results.flatMap((result, index) => result.status === 'rejected'
        ? [result.reason.response?.data?.message || `Row ${index + 1} failed`]
        : []);

    return {
        success: results.filter(({ status }) => status === 'fulfilled').length,
        errors: errorDetails.length,
        errorDetails,
    };
};

export const importFromJSON = async (jsonData) => {
    try {
        return await importArtists(jsonData);
    } catch (error) {
        console.error('Import error:', error);
        throw error;
    }
};

export const importFromCSV = async (csvContent) => {
    try {
        const lines = csvContent.trim().split(/\r?\n/).filter(Boolean);
        const headers = lines.shift().split(',').map((value) => value.trim());
        const artists = lines.map((line) => {
            const values = line.split(',').map((value) => value.trim());
            return headers.reduce((artist, header, index) => {
                artist[header] = header === 'badges'
                    ? (values[index] || '').split(';').map((badge) => badge.trim()).filter(Boolean)
                    : values[index] || '';
                return artist;
            }, {});
        });
        return await importArtists(artists);
    } catch (error) {
        console.error('Import error:', error);
        throw error;
    }
};

// Function to read file content
export const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const text = e.target.result;
                resolve(text);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
};
