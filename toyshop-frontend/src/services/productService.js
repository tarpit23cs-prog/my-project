
const API = import.meta.env.VITE_API_URL;
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/products`;
export const getProducts = async () => {
  const res = await fetch(`${API}/api/products`);
  return res.json();
};
