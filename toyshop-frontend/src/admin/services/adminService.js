const BASE_URL = "http://localhost:5000/api/products";

export const getAllProducts = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addProduct = async (product) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user._id,
      ...product
    })
  });

  return res.json();
};

export const updateProduct = async (id, data) => {
  const res = await fetch(
    `http://localhost:5000/api/products/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }
  );
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(
    `http://localhost:5000/api/products/delete/${id}`,
    {
      method: "DELETE"
    }
  );
  return res.json();
};

// export const deleteProduct = async (id) => {
//   const res = await fetch(`${BASE_URL}/${id}`, {
//     method: "DELETE"
//   });
//   return res.json();
// };

// export const updateProduct = async (id, product) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const res = await fetch(`${BASE_URL}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       userId: user._id,
//       ...product
//     })
//   });

//   return res.json();
// };
export const getAllOrders = async () => {
  const res = await fetch("http://localhost:5000/api/orders");
  return res.json();
};

