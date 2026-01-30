const BASE_URL = "http://localhost:5000/api/orders";

export const getOrdersByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}`);
  return res.json();
};
export const placeOrder = async (userId) => {
  const res = await fetch("http://localhost:5000/api/orders/place", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  });
  return res.json();
};
export const getInvoice = async (orderId) => {
  const res = await fetch(`http://localhost:5000/api/orders/invoice/${orderId}`);
  return res.json();
};
export const cancelOrder = async (orderId) => {
  const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
    method: "DELETE"
  });
  return res.json();
};
