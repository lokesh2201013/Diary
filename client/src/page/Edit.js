import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API + "/" + params.id;
        const response = await axios.get(apiUrl);

        if (response.status === 200 && response?.data.statusText === "Ok") {
          setApiData(response?.data?.record);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [params.id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveForm = async (data) => {
    setLoading(true);

    data.file = data.image[0];
    data.image = null;
    try {
      const apiUrl = process.env.REACT_APP_API + "/" + params.id;
      const response = await axios.put(apiUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      if (response.status === 200) {
        navigate("/", {
          state: "Saved successfully",
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const containerStyle = {
    marginTop: '2rem',
    marginBottom: '2rem'
  };

  const headerStyle = {
    fontSize: '2rem',
    color: '#850c62',
    marginBottom: '1rem'
  };

  const formStyle = {
    backgroundColor: '#f9f9f9',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginBottom: '1rem'
  };

  const errorStyle = {
    color: 'red',
    marginTop: '0.25rem'
  };

  const buttonStyle = {
    backgroundColor: '#850c62',
    border: 'none',
    color: 'white',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const buttonHoverStyle = {
    backgroundColor: '#a63a79'
  };

  if (loading) {
    return (
      <Container className="spinner" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner animation="grow" />
      </Container>
    );
  }

  return (
    <Container style={containerStyle}>
      <h1 style={headerStyle}>Edit Post</h1>
      {apiData && (
        <form onSubmit={handleSubmit(saveForm)} style={formStyle}>
          <Row>
            <Col xs="12" className="py-3">
              <label>Post Title</label>
              <input
                defaultValue={apiData.title}
                style={inputStyle}
                placeholder="Please enter title"
                {...register("title", {
                  required: { value: true, message: "Title is required." },
                  minLength: {
                    value: 3,
                    message: "Title should be minimum 3 characters.",
                  },
                })}
              />
              {errors.title && <div style={errorStyle}>{errors.title.message}</div>}
            </Col>
            <Col xs="12" className="py-3">
              <label>Post Content</label>
              <input
                defaultValue={apiData.post}
                style={inputStyle}
                placeholder="Please enter content"
                {...register("post", {
                  required: {
                    value: true,
                    message: "Post Content is required.",
                  },
                })}
              />
              {errors.post && <div style={errorStyle}>{errors.post.message}</div>}
            </Col>
            <Col xs="12" className="py-3">
              <label>Image</label>
              <input
                type="file"
                style={inputStyle}
                {...register("image")}
              />
            </Col>
            <Col>
              <button
                type="submit"
                style={buttonStyle}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
              >
                Save
              </button>
            </Col>
          </Row>
        </form>
      )}
    </Container>
  );
};

export default Edit;
