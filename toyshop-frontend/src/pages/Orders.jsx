import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { getOrdersByUser, cancelOrder } from "../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await getOrdersByUser(user._id);
    if (res.success) {
      setOrders(res.data);
    }
  };

  const handleCancel = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    const res = await cancelOrder(orderId);

    if (res.success) {
      alert("Order cancelled successfully");
      loadOrders();
    } else {
      alert(res.message || "Unable to cancel order");
    }
  };

  return (
    <>
      {/* ================= PAGE HEADER ================= */}
      <div className="bg-light py-4 border-bottom m-5">
        <Container>
          <h1 className="fw-bold mb-1">My Orders 📦</h1>
          <p className="text-muted mb-0">
            Track your orders and manage your purchases.
          </p>
        </Container>
      </div>

      {/* ================= ORDERS LIST ================= */}
      <Container className="my-5">
        {orders.length === 0 ? (
          <div className="text-center">
            <h4>No orders found</h4>
            <p className="text-muted">
              You haven’t placed any orders yet.
            </p>
            <Button onClick={() => navigate("/products")}>
              Browse Toys
            </Button>
          </div>
        ) : (
          orders.map(order => (
            <Card key={order._id} className="mb-4 shadow-sm">
              <Card.Body>
                {/* ===== Order Header ===== */}
                <Row className="mb-3">
                  <Col md={8}>
                    <p className="mb-1">
                      <strong>Order ID:</strong> {order._id}
                    </p>
                    <p className="mb-1">
                      <strong>Delivery Date:</strong>{" "}
                      {new Date(order.deliveryDate).toDateString()}
                    </p>
                  </Col>

                  <Col
                    md={4}
                    className="text-md-end mt-2 mt-md-0"
                  >
                    <Badge
                      bg={
                        order.status === "Placed"
                          ? "success"
                          : order.status === "Cancelled"
                          ? "danger"
                          : "secondary"
                      }
                      className="px-3 py-2"
                    >
                      {order.status}
                    </Badge>
                  </Col>
                </Row>

                <hr />

                {/* ===== Order Items ===== */}
                {order.items.map(item => (
                  <Row key={item.id} className="mb-2">
                    <Col md={6}>
                      <strong>{item.name}</strong>
                    </Col>
                    <Col md={3}>
                      Qty: {item.quantity}
                    </Col>
                    <Col md={3}>
                      ₹{item.price}
                    </Col>
                  </Row>
                ))}

                <hr />

                {/* ===== Footer ===== */}
                <Row className="align-items-center">
                  <Col md={6}>
                    <h5 className="mb-0">
                      Total: ₹{order.totalAmount}
                    </h5>
                  </Col>

                  <Col
                    md={6}
                    className="text-md-end mt-3 mt-md-0"
                  >
                    {order.status === "Placed" && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleCancel(order._id)}
                      >
                        Cancel Order
                      </Button>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </>
  );
}

export default Orders;
