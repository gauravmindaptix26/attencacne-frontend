// Prefer an explicit Vite env var, fall back to local API in dev.
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "https://product-omha.vercel.app/api");

export default BASE_URL;
