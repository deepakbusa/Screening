import axios from "axios";
import { getApiUrl } from "../config/api";

// Create axios instance with timeout and error handling
const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    console.log('API Base URL:', config.baseURL);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.config?.url, error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused. Please check if the backend is running.');
    }
    if (error.code === 'ENOTFOUND') {
      console.error('Host not found. Please check the API URL configuration.');
    }
    return Promise.reject(error);
  }
);

export const fetchFinancial = async () => {
  try {
    const res = await api.get('/financial/');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch financial data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Financial API Error: ${errorMessage}`);
  }
};

export const fetchHR = async () => {
  try {
    const res = await api.get('/hr/');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch HR data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`HR API Error: ${errorMessage}`);
  }
};

export const fetchRND = async () => {
  try {
    const res = await api.get('/rnd/');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch R&D data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`R&D API Error: ${errorMessage}`);
  }
};

export const fetchSecurity = async () => {
  try {
    const res = await api.get('/security/');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch security data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Security API Error: ${errorMessage}`);
  }
}; 