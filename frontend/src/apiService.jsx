import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Base URL for your backend

// Register User API
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Login User API
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Additional APIs can be added similarly as needed for your project