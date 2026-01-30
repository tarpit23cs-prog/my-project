const BASE_URL = `${import.meta.env.VITE_API_URL}/api/products`;

export const getProducts = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};
