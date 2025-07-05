// API Configuration
// Update this URL with your deployed backend URL
export const API_CONFIG = {
  // For Railway deployment, use your Railway URL
  // Example: https://your-app-name.railway.app/api
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE || "https://screening-production.up.railway.app/api",
  
  // For local development
  LOCAL_URL: "http://localhost:8000/api",
  
  // Timeout in milliseconds
  TIMEOUT: 10000,
};

// Helper function to get the appropriate API URL
export const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: check if we're on localhost
    if (window.location.hostname === 'localhost') {
      return API_CONFIG.LOCAL_URL;
    }
  }
  return API_CONFIG.BASE_URL;
}; 