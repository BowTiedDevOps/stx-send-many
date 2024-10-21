import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const saveData = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/save`, data);
    return response.data;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

export const readData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/read`);
    return response.data;
  } catch (error) {
    console.error('Error reading data:', error);
    throw error;
  }
};
