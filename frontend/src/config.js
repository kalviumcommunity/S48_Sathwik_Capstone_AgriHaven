// Central API base URL — reads from Vercel env var VITE_API_URL at build time
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://s48-sathwik-capstone-agrihaven.onrender.com';

export default API_BASE_URL;

