const BASE_URL = `${import.meta.env.VITE_API_URL}/api/cart`;

// ================= GET CART =================
export const getCart = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}`);

  const text = await res.text();
  if (!text) {
    throw new Error("Empty cart response");
  }

  return JSON.parse(text);
};

// ================= REMOVE FROM CART =================
export const removeFromCart = async (userId, productId) => {
  const res = await fetch(`${BASE_URL}/remove`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId }),
  });

  const text = await res.text();
  if (!text) {
    throw new Error("Empty remove response");
  }

  return JSON.parse(text);
};
