const BASE_URL = `${import.meta.env.VITE_API_URL}/api/orders`;

export const getOrdersByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}`);
  return res.json();
};
export const placeOrder = async (userId) => {
  const res = await fetch(`${BASE_URL}/api/orders/place`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  });
  return res.json();
};
export const getInvoice = async (orderId) => {
  const res = await fetch(`${BASE_URL}/api/orders/invoice/${orderId}`);
  return res.json();
};
export const cancelOrder = async (orderId) => {
  const res = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
    method: "DELETE"
  });
  return res.json();
};
