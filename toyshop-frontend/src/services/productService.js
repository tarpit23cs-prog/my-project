
const API = import.meta.env.VITE_API_URL;
const BASE_URL = `${API}/api/products`;
export const getProducts = async () => {
  const res = await fetch(`${API}/api/products`);
  return res.json();
};
