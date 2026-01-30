import { useState } from "react";
import { signupUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signupUser(name, email, password);

    if (res.success) {
      alert("Account created successfully 🎉");
      navigate("/login");
    } else {
      alert(res.message || "Signup failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0" style={{ width: "400px" }}>

        <div className="card-header bg-warning text-dark text-center py-4">
          <h3 className="fw-bold mb-0">ToyShop 🧸</h3>
          <small>Create your account</small>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Minimum 6 characters"
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
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>
        </div>

        <div className="card-footer bg-white text-center border-0">
          <small className="text-muted">
            Already have an account?{" "}
            <span
              className="fw-semibold text-decoration-underline"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </small>
        </div>

      </div>
    </div>
  );
}

export default Signup;
