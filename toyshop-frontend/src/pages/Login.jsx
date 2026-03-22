import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await loginUser(email, password);

    if (res.success) {
      const userData = {
        _id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email,
        role: res.data.user.role,
        address: res.data.user.address || ""
      };

      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData); // 🔥 Important for instant navbar update

      if (userData.role === "admin") {
        navigate("/admin/products");
      } else {
        navigate("/products");
      }

    } else {
      alert(res.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0" style={{ width: "380px" }}>

        <div className="card-header bg-warning text-dark text-center py-4">
          <h3 className="fw-bold mb-0">ToyShop 🧸</h3>
          <small>Welcome back</small>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>
        </div>

        <div className="card-footer text-center bg-white border-0">
          <small>
            New user?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Register first
            </Link>
          </small>
        </div>

      </div>
    </div>
  );
}

export default Login;