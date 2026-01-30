import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <style>{`
        .custom-navbar {
          background: linear-gradient(135deg, #ff7a18, #ffb347);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .navbar-brand {
          font-size: 1.6rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .nav-link {
          color: #fff !important;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-link:hover {
          color: #000 !important;
        }

        .signup-btn {
          border-radius: 20px;
          font-weight: 600;
        }

        .icon {
          font-size: 0.95rem;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-4 fixed-top">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <i className="fa-solid fa-child-reaching"></i>
          ToyShop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-lg-3 align-items-lg-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fa-solid fa-house icon"></i> Home
              </Link>
            </li>
<li className="nav-item">
              <Link className="nav-link" to="/about">
                <i className="fa-solid fa-house icon"></i> About
              </Link>
            </li>
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fa-solid fa-right-to-bracket icon"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-dark signup-btn px-3" to="/signup">
                    <i className="fa-solid fa-user-plus"></i> Signup
                  </Link>
                </li>
              </>
            )}

            {user && user.role === "customer" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    <i className="fa-solid fa-box-open icon"></i> Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <i className="fa-solid fa-cart-shopping icon"></i> My Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">
                    <i className="fa-solid fa-receipt icon"></i> Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <i className="fa-solid fa-user icon"></i> Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                  </button>
                </li>
              </>
            )}

            {user && user.role === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/products">
                    <i className="fa-solid fa-boxes-stacked icon"></i> Admin Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/orders">
                    <i className="fa-solid fa-clipboard-list icon"></i> Admin Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/stock">
                    <i className="fa-solid fa-warehouse icon"></i> Stock
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <i className="fa-solid fa-user-shield icon"></i> Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                    <i className="fa-solid fa-power-off"></i> Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
