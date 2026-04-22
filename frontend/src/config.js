// API base URL — reads from VITE_API_URL env variable (set in Vercel dashboard)
// Falls back to localhost:5000 for local development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_BASE_URL;
