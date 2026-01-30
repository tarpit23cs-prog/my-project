const BASE_URL = "https://my-project-xxxx.onrender.com/api/products";

export const getProducts = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};
