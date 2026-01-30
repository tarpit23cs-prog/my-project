import { Container, Row, Col } from "react-bootstrap";

function About() {
  return (
    <>
      {/* ===== Hero Section ===== */}
      <div
        className="container-fluid px-0"
        style={{
          background: "linear-gradient(135deg, #f97316, #fb923c)",
          color: "#fff",
          minHeight: "40vh",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Container>
          <h1 className="fw-bold mb-3">About ToyShop 🧸</h1>
          <p className="fs-5 mb-0">
            Where fun, learning, and happiness come together for kids.
          </p>
        </Container>
      </div>

      {/* ===== Main Content ===== */}
      <Container className="my-5">
        <Row className="mb-5">
          <Col md={6}>
            <h3 className="fw-bold mb-3">Who We Are</h3>
            <p className="text-muted">
              ToyShop is an online toy store built with a simple mission —
              to bring smiles to children and peace of mind to parents.
              We carefully curate toys that are fun, educational, and safe
              for kids of all age groups.
            </p>
            <p className="text-muted">
              From creative learning toys to fun playtime companions,
              our collection is designed to support a child’s imagination,
              curiosity, and growth.
            </p>
          </Col>

          <Col md={6}>
            <h3 className="fw-bold mb-3">Why ToyShop?</h3>
            <ul className="text-muted">
              <li>✔ Child-safe & quality-checked toys</li>
              <li>✔ Affordable pricing for parents</li>
              <li>✔ Easy ordering & fast delivery</li>
              <li>✔ Perfect options for gifting</li>
            </ul>
          </Col>
        </Row>

        {/* ===== Values Section ===== */}
        <Row className="text-center">
          <Col md={4}>
            <h5 className="fw-bold">🎯 Our Mission</h5>
            <p className="text-muted small">
              To make playtime meaningful by offering toys that educate,
              entertain, and inspire creativity.
            </p>
          </Col>

          <Col md={4}>
            <h5 className="fw-bold">👁️ Our Vision</h5>
            <p className="text-muted small">
              To become a trusted online destination for parents looking
              for safe and engaging toys for their children.
            </p>
          </Col>

          <Col md={4}>
            <h5 className="fw-bold">❤️ Our Promise</h5>
            <p className="text-muted small">
              Quality products, honest service, and a delightful shopping
              experience — every single time.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default About;
