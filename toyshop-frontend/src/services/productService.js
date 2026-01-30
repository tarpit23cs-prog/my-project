const BASE_URL = "http://localhost:5000/api/products";

export const getProducts = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};
