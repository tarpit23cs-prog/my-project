const BASE_URL = "https://my-project-xxxx.onrender.com/api/cart";

export const getCart = async (userId) => {
  const res = await fetch(`https://my-project-xxxx.onrender.com/api/cart/${userId}`);
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
