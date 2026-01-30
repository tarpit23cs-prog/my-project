import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/authService";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  const [name, setName] = useState(user.name || "");
  const [address, setAddress] = useState(user.address || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await updateProfile(user._id, name, address);

    if (res.success) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          name,
          address
        })
      );
      alert("Profile updated successfully 💪");
    } else {
      alert("Update failed 😑");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow-lg">
            <div className="card-header bg-warning text-dark text-center">
              <h4 className="mb-0">👤 My Profile</h4>
              <small>ToyShop Account Settings</small>
            </div>

            <div className="card-body">
              <form onSubmit={handleUpdate}>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={user.email}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Delivery Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your delivery address"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>

            <div className="card-footer text-center">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
