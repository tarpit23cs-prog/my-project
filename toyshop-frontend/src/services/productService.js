const BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const getProducts = async () => {
  const res = await fetch(`${API}/api/products`);
  return res.json();
};
