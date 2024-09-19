import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#f8f9fa",
    padding: "20px 0",
  };

  const colStyle = {
    color: "#343a40",
  };

  const linkStyle = {
    color: "#007bff",
    textDecoration: "none",
  };

  const linkHoverStyle = {
    color: "#0056b3",
    textDecoration: "underline",
  };

  const socialLinksStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
  };

  const socialLinkStyle = {
    color: "#343a40",
    transition: "color 0.3s ease",
  };

  return (
    <Container fluid style={footerStyle} className="footer">
      <Row>
        <Col xs="6" style={colStyle}>
          <div className="col text-center text-lg-left pt-3">
            <a
              href="/contact/"
              style={linkStyle}
              onMouseOver={(e) => (e.currentTarget.style.color = "#0056b3")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#007bff")}
            >
              <h3>Connect With Us</h3>
            </a>
            <div className="social-links pt-1" style={socialLinksStyle}>
              <a
                target="_blank"
                href="https://www.youtube.com/@growyourskill1"
                className="youtube"
                title="Connect on Youtube"
                style={socialLinkStyle}
                onMouseOver={(e) => (e.currentTarget.style.color = "#007bff")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#343a40")}
              >
                <i className="fab fa-linkedin fa-3x"></i>
              </a>
              <a
                target="_blank"
                href="https://github.com/lokesh2201013g"
                className="Github"
                title="Connect on Github"
                style={socialLinkStyle}
                onMouseOver={(e) => (e.currentTarget.style.color = "#007bff")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#343a40")}
              >
                <i className="fab fa-github fa-3x"></i>
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
