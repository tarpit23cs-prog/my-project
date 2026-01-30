import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getProducts().then(res => {
      if (res.success) {
        setProducts(res.data);
      }
    });
  }, []);

  const handleAddToCart = (productId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    console.log("Add to cart:", productId);
  };

  return (
    <>
      {/* ================= HERO SECTION (FULL WIDTH) ================= */}
      {/* ================= FULL HERO CAROUSEL ================= */}
      <div className="container-xxl">
        <Carousel fade controls={false} indicators interval={3000}>
          {/* SLIDE 1 */}
          <Carousel.Item>
            <div
              style={{
                height: "75vh",
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dG95c3xlbnwwfHwwfHx8MA%3D%3D')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Container>
                <Row>
                  <Col md={7}>
                    <h1 className="fw-bold text-white mb-3">
                      Toys that bring <span style={{ color: "#fde047" }}>smiles</span> 😊
                    </h1>
                    <p className="text-white fs-5 mb-4">
                      Fun, safe & educational toys for every kid.
                    </p>
                    <Button
                      variant="warning"
                      onClick={() =>
                        document
                          .getElementById("products-section")
                          .scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Explore Toys
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>

          {/* SLIDE 2 */}
          <Carousel.Item>
            <div
              style={{
                height: "75vh",
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Container>
                <Row>
                  <Col md={7}>
                    <h1 className="fw-bold text-white mb-3">
                      Learn. Play. Grow.
                    </h1>
                    <p className="text-white fs-5 mb-4">
                      Smart toys that boost creativity & thinking.
                    </p>
                    <Button variant="warning">Shop Now</Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>

          {/* SLIDE 3 */}
          <Carousel.Item>
            <div
              style={{
                height: "75vh",
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1587654780291-39c9404d746b')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Container>
                <Row>
                  <Col md={7}>
                    <h1 className="fw-bold text-white mb-3">
                      Perfect Gifts for Kids 🎁
                    </h1>
                    <p className="text-white fs-5 mb-4">
                      Birthdays, surprises & happy moments.
                    </p>
                    <Button variant="warning">Browse Collection</Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* ================= PRODUCTS SECTION ================= */}
      <Container className="my-5" id="products-section">
        <h2 className="page-title text-center mb-4">
          Our Popular Toys 🧸
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-muted">
            No toys available right now.
          </p>
        ) : (
          <Row className="g-4">
            {products.map(product => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product._id)}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* ================= INFO STRIP ================= */}
      <div className="py-4 bg-light border-top">
        <Container>
          <Row className="text-center">
            <Col md={4}>
              <h5 className="fw-bold">🚚 Fast Delivery</h5>
              <p className="text-muted small">
                Safe and quick delivery at your doorstep.
              </p>
            </Col>

            <Col md={4}>
              <h5 className="fw-bold">🛡️ Safe & Certified</h5>
              <p className="text-muted small">
                Child-safe materials with strict quality checks.
              </p>
            </Col>

            <Col md={4}>
              <h5 className="fw-bold">🎁 Perfect for Gifting</h5>
              <p className="text-muted small">
                Birthdays, surprises, and happy moments.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
