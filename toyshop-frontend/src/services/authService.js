const BASE_URL = "https://my-project-xxxx.onrender.com/api/auth";

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const signupUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
};
export const updateProfile = async (userId, name, address) => {
  const res = await fetch(`https://my-project-xxxx.onrender.com/api/auth/update-profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, name, address })
  });
  return res.json();
};
