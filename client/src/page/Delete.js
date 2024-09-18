import axios from "axios";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Delete = () => {
  const params = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API + "/" + params.id;

      const response = await axios.delete(apiUrl);

      if (response.status === 200) {
        navigate("/", {
          state: "Record deleted successfully.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Inline CSS styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9'
  };

  const headerStyle = {
    fontSize: '2rem',
    color: '#850c62',
    textAlign: 'center',
    marginBottom: '2rem'
  };

  const buttonStyle = {
    backgroundColor: '#e74c3c',
    border: 'none',
    color: 'white',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const buttonHoverStyle = {
    backgroundColor: '#c0392b'
  };

  return (
    <Container style={containerStyle}>
      <Row>
        <h1 style={headerStyle}>Are you sure you want to delete this record?</h1>
        <Col xs="12" className="py-5 text-center">
          <button
            style={buttonStyle}
            onClick={handleDelete}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Proceed
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default Delete;
