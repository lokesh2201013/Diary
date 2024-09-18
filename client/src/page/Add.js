import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveForm = async (data) => {
    setLoading(true);

    // Get the current date
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // getMonth() is zero-based
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    const formData = new FormData();
    formData.append("title", data.title); // Add title
    formData.append("post", data.post);   // Add post content
    formData.append("year", year);        // Add year
    formData.append("month", month);      // Add month
    formData.append("day", day);          // Add day

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]); // Add the image file if present
    }

    try {
      const apiUrl = process.env.REACT_APP_API;
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "json",
        },
      });

      if (response.status === 201) {
        console.log(response);
        navigate("/");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  if (loading) {
    return (
      <Container className="spinner">
        <Spinner animation="grow" />
      </Container>
    );
  }

  return (
    <Container>
      <h1>Add a New Post</h1>
      <form onSubmit={handleSubmit(saveForm)}>
        <Row>
          <Col xs="12" className="py-3">
            <label>Post Title</label>
            <input
              defaultValue=""
              className={`${errors.title ? "error" : ""}`} // Basic conditional class
              placeholder="Please enter title"
              {...register("title", {
                required: { value: true, message: "Title is required." },
                minLength: {
                  value: 3,
                  message: "Title should be minimum 3 characters.",
                },
              })}
            />
            {errors.title && (
              <div className="error">{errors.title.message}</div>
            )}
          </Col>
          <Col xs="12" className="py-3">
            <label>Post Content</label>
            <input
              defaultValue=""
              className={`${errors.post ? "error" : ""}`} // Basic conditional class
              placeholder="Please enter content"
              {...register("post", {
                required: {
                  value: true,
                  message: "Post Content is required.",
                },
              })}
            />
            {errors.post && (
              <div className="error">{errors.post.message}</div>
            )}
          </Col>
          <Col xs="12" className="py-3">
            <label>Image</label>
            <input
              type="file"
              className={`${errors.image ? "error" : ""}`} // Basic conditional class
              {...register("image")}
            />
          </Col>
          <Col xs="12">
            <button type="submit">Save</button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default Add;
