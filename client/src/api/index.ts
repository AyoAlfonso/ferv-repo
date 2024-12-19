import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Proxy handles requests starting with /api
});

export const fetchMessage = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
};

export default api;
