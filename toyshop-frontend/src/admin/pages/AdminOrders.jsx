import { useEffect, useState } from "react";
import { getAllOrders } from "../services/adminService";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    loadOrders();
  }, [navigate]);

  const loadOrders = async () => {
    try {
      const res = await getAllOrders();
      console.log("ADMIN ORDERS RESPONSE:", res);

      if (res?.success && Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Failed to load orders", err);
      setOrders([]);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 mt-5 pt-2">Admin – Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-warning">No orders found</div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div className="col-md-6 mb-4" key={order._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <p className="mb-1">
                    <b>Order ID:</b> <small>{order._id}</small>
                  </p>

                  <p className="mb-1">
                    <b>Customer:</b> {order.userId?.name || "N/A"}
                  </p>

                  <p className="mb-1">
                    <b>Status:</b>{" "}
                    <span
                      className={`badge ${
                        order.status === "Delivered"
                          ? "bg-success"
                          : order.status === "Cancelled"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </p>

                  <p className="fw-bold">
                    Total: ₹{order.totalAmount || 0}
                  </p>

                  <hr />

                  <h6>Items</h6>

                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {order.items.map((item) => (
                        <li
                          className="list-group-item px-0"
                          key={item._id}
                        >
                          {item.productId?.name || "Product removed"}
                          <span className="float-end">
                            Qty: {item.quantity || 0}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted small">
                      No items found for this order
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
