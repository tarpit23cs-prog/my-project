function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto">
      <div className="container py-4">
        <div className="row">

          {/* BRAND */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">ToyShop 🧸</h5>
            <p className="text-Light small">
              Quality toys for kids. Safe, fun and educational products at
              affordable prices.
            </p>
          </div>

          {/* LINKS */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li>Products</li>
              <li>My Profile</li>
              <li>Cart</li>
              <li>Login / Signup</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-md-4 mb-3 ">
            <h6 className="fw-semibold">Contact</h6>
            <p className="small text-Light mb-1">📧 support@toyshop.com</p>
            <p className="small text-Light mb-1">📞 +91 90000 00000</p>
            <p className="small text-Light">📍 India</p>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center small text-Light">
          © {new Date().getFullYear()} ToyShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
