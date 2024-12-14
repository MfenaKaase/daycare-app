import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";


const DaycareWebsite = () => {
  return (
    <div>
      {/* Navbar Section */}
      <header className="bg-light py-3">
        <Container>
          <Row className="align-items-center">
            <Col>
              <h1 className="text-primary">BE KIDS.</h1>
            </Col>
            <Col>
              <nav className="d-flex justify-content-end">
                <ul className="list-unstyled d-flex gap-4 mb-0">
                  <li>Home</li>
                  <li>About</li>
                  <li>Classes</li>
                  <li>Teachers</li>
                  <li>Blog</li>
                  <li>Contact</li>
                </ul>
                <Button variant="primary" className="ms-3">Join Now</Button>
              </nav>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="hero bg-light py-5 text-center">
        <Container>
          <h1>Excellence in Early Childhood Education</h1>
          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
          <Button variant="primary" className="me-2">Learn More</Button>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features bg-white py-5">
        <Container>
          <h2 className="text-center mb-4">Providing Good Qualities For Your Loving Kids</h2>
          <Row>
            <Col md={3} className="text-center">
              <img src="bus-icon.png" alt="Bus Services" className="mb-3" />
              <h5>Bus Services</h5>
            </Col>
            <Col md={3} className="text-center">
              <img src="sports-icon.png" alt="Sports Training" className="mb-3" />
              <h5>Sports Training</h5>
            </Col>
            <Col md={3} className="text-center">
              <img src="music-icon.png" alt="Music Training" className="mb-3" />
              <h5>Music Training</h5>
            </Col>
            <Col md={3} className="text-center">
              <img src="teachers-icon.png" alt="Best Teachers" className="mb-3" />
              <h5>Best Teachers</h5>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="statistics bg-light py-5 text-center">
        <Container>
          <Row>
            <Col md={3}>
              <h3>45</h3>
              <p>Qualified Teachers</p>
            </Col>
            <Col md={3}>
              <h3>25</h3>
              <p>Years Of Experience</p>
            </Col>
            <Col md={3}>
              <h3>564</h3>
              <p>Students Enrolled</p>
            </Col>
            <Col md={3}>
              <h3>22</h3>
              <p>Total Groups</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Classes Section */}
      <section className="classes bg-white py-5">
        <Container>
          <h2 className="text-center mb-4">Take The Classes & Start Learning From Today</h2>
          <Row>
            <Col md={4}>
              <Card className="mb-3">
                <Card.Img variant="top" src="math-class.jpg" />
                <Card.Body>
                  <Card.Title>Mathematics Class</Card.Title>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3">
                <Card.Img variant="top" src="online-class.jpg" />
                <Card.Body>
                  <Card.Title>Online Class</Card.Title>

Sylvester Adah, [12/13/2024 5:42 PM]
<Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3">
                <Card.Img variant="top" src="drawing-class.jpg" />
                <Card.Body>
                  <Card.Title>Drawing Class</Card.Title>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="contact bg-light py-5">
        <Container>
          <h2 className="text-center mb-4">Join Our Fun with Cutie Kids</h2>
          <Row>
            <Col md={6}>
              <Form>
                <Form.Group controlId="phoneNumber" className="mb-3">
                  <Form.Control type="text" placeholder="Phone Number" />
                </Form.Group>
                <Form.Group controlId="emailAddress" className="mb-3">
                  <Form.Control type="email" placeholder="Email Address" />
                </Form.Group>
                <Form.Group controlId="message" className="mb-3">
                  <Form.Control as="textarea" rows={3} placeholder="Message" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col md={4}>
              <h5>Details Info</h5>
              <p>123 New Street, Touch Road, New York, USA</p>
              <p>+1234 4567 8910</p>
            </Col>
            <Col md={4}>
              <h5>News Feed</h5>
              <p>How Drugs Alter The Brain</p>
            </Col>
            <Col md={4}>
              <h5>Contact Us</h5>
              <p>Email: info@bekids.com</p>
              <p>Opening Hours: Mon-Fri, 8:00 - 18:00</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default DaycareWebsite;