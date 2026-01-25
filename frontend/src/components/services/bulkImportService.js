import axios from "axios";

const API_BASE_URL = "/api/bulk";

export const importFromJSON = async (jsonData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/import-json`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Import error:", error);
    throw error;
  }
};

export const importFromCSV = async (csvContent) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/import-csv`,
      { csvContent },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Import error:", error);
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
