import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { getCart, removeFromCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  if (!user) {
    navigate("/login");
    return;
  }
  loadCart();
}, [user, navigate]);


  const loadCart = async () => {
    const res = await getCart(user._id);
    if (res.success) {
      setCart(res.data);
    }
  };

  const handleRemove = async (productId) => {
    await removeFromCart(user._id, productId);
    loadCart();
  };

  const handleCheckout = async () => {
    const res = await placeOrder(user._id);

    if (res.success) {
      alert("Order placed successfully");
      navigate(`/invoice/${res.data.orderId}`);
    } else {
      alert("Failed to place order");
    }
  };

  if (!cart) {
    return (
      <Container className="my-5 text-center">
        <h4>Loading your cart...</h4>
      </Container>
    );
  }

  return (
    <>
      {/* ================= PAGE HEADER ================= */}
      <div className="bg-light py-4 border-bottom">
        <Container>
          <h1 className="fw-bold mb-1">My Cart 🛒</h1>
          <p className="text-muted mb-0">
            Review your items before placing the order.
          </p>
        </Container>
      </div>

      {/* ================= CART CONTENT ================= */}
      <Container className="my-5">
        {cart.items.length === 0 ? (
          <div className="text-center">
            <h4>Your cart is empty</h4>
            <p className="text-muted">
              Looks like you haven’t added anything yet.
            </p>
            <Button variant="primary" onClick={() => navigate("/products")}>
              Browse Toys
            </Button>
          </div>
        ) : (
          <Row>
            {/* ===== Cart Items ===== */}
            <Col md={8}>
              {cart.items.map(item => (
                <Card
                  key={item.productId._id}
                  className="mb-3 shadow-sm"
                >
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <h5 className="fw-bold mb-1">
                          {item.productId.name}
                        </h5>
                        <p className="text-muted mb-0">
                          Price: ₹{item.productId.price}
                        </p>
                        <small className="text-muted">
                          Quantity: {item.quantity}
                        </small>
                      </Col>

                      <Col md={3} className="mt-3 mt-md-0">
                        <strong>
                          ₹{item.productId.price * item.quantity}
                        </strong>
                      </Col>

                      <Col
                        md={3}
                        className="text-md-end mt-3 mt-md-0"
                      >
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() =>
                            handleRemove(item.productId._id)
                          }
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Col>

            {/* ===== Order Summary ===== */}
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="fw-bold mb-3">Order Summary</h5>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Total Items</span>
                    <span>{cart.items.length}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span>Total Amount</span>
                    <strong>₹{cart.totalAmount}</strong>
                  </div>

                  <p className="small text-muted mb-3">
                    Payment Mode: <strong>Cash on Delivery</strong>
                  </p>

                  <Button
                    className="btn-mst w-100"
                    onClick={handleCheckout}
                  >
                    Place Order
                  </Button>

                  <p className="text-center text-muted small mt-3 mb-0">
                    Thank you for shopping with us ❤️
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default Cart;
