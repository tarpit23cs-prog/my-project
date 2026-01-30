import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await loginUser(email, password);

    if (res.success) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          role: res.data.user.role,
          address: res.data.user.address || ""
        })
      );
      navigate("/products");
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
          <small className="text-dark">Welcome back</small>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
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
          <small className="text-muted">
            New user?{" "}
            <span className="fw-semibold">
              <Link to="/signup" style={{ color: "#000", textDecoration: "none" }}>
                Register first
              </Link>
            </span>
          </small>
        </div>

      </div>
    </div>
  );
}

export default Login;
