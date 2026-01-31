const BASE_URL = `${import.meta.env.VITE_API_URL}/api/cart`;

export const getCart = async (userId) => {
  const res = await fetch(`${BASE_URL}/api/cart/${userId}`);
  return res.json();
};


export const removeFromCart = async (userId, productId) => {
  const res = await fetch(`${BASE_URL}/remove`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId })
  });
  return res.json();
};
