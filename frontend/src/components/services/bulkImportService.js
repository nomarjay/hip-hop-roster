import api from './api';

export const importFromJSON = async (jsonData) => {
    try {
        const response = await api.post('/bulk/import-json', jsonData);
        return response.data;
    } catch (error) {
        console.error('Import error:', error);
        throw error;
    }
};

export const importFromCSV = async (csvContent) => {
    try {
        const response = await api.post('/bulk/import-csv', { csvContent });
        return response.data;
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
