import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Badge } from "react-bootstrap";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= LOAD PRODUCTS =================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await getProducts();
        if (res && res.success) {
          setProducts(res.data || []);
        } else {
          console.error("Product API failed", res);
        }
      } catch (err) {
        console.error("Error loading products", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // ================= ADD TO CART =================
  const handleAddToCart = async (productId) => {
    if (!user || !user._id) {
      alert("Login Please");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            productId: productId,
          }),
        }
      );

      // 🔥 SAFE RESPONSE HANDLING
      const text = await res.text();
      if (!text) {
        throw new Error("Empty response from server");
      }

      const data = JSON.parse(text);

      if (!res.ok || !data.success) {
        alert(data.message || "Add to cart failed");
        return;
      }

      alert("Added to cart 🛒");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Server error");
    }
  };

  // ================= UI =================
  return (
    <>
      {/* HERO */}
      <div className="bg-warning-subtle py-5 border-bottom m-5">
        <Container>
          <h1 className="fw-bold">ToyShop Store 🧸</h1>
          <p className="text-muted col-md-8">
            Discover fun, safe and educational toys curated for kids of all ages.
            Quality toys, honest pricing, fast delivery.
          </p>

          <div className="mt-3">
            <Badge bg="dark" className="me-2">Educational</Badge>
            <Badge bg="dark" className="me-2">Eco-Friendly</Badge>
            <Badge bg="dark">Best Sellers</Badge>
          </div>
        </Container>
      </div>

      {/* PRODUCTS */}
      <Container className="my-5">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
            <p className="mt-3 text-muted">Loading toys...</p>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted">
            No toys available right now 😕
          </p>
        ) : (
          <>
            <h4 className="mb-4 fw-semibold">Available Toys</h4>
            <Row className="g-4">
              {products.map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard
                    product={product}
                    isLoggedIn={!!user}
                    onAddToCart={handleAddToCart}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>

      {/* FOOTER HIGHLIGHTS */}
      <Container className="my-4">
        <Row className="text-center">
          <Col md={4}>
            <h6 className="fw-bold">🚚 Fast Delivery</h6>
            <p className="text-muted small">Quick & reliable shipping</p>
          </Col>
          <Col md={4}>
            <h6 className="fw-bold">🛡️ Safe for Kids</h6>
            <p className="text-muted small">Tested & child-friendly</p>
          </Col>
          <Col md={4}>
            <h6 className="fw-bold">💰 Affordable</h6>
            <p className="text-muted small">Best price guaranteed</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Products;
