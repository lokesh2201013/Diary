import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const saveForm = async (data) => {
        setLoading(true);
    
        // Get the current date
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; // getMonth() is zero-based
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();
    
        // Create a FormData object to hold the form fields and the file
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("post", data.post);
        formData.append("year", year);
        formData.append("month", month);
        formData.append("day", day);
    
        // Append the image file if it exists
        if (data.image && data.image[0]) {
            formData.append("file", data.image[0]); // Use "file" to match the server-side field name
        }
    
        try {
            const apiUrl = process.env.REACT_APP_API;
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            if (response.status === 200) {
                navigate("/"); // Navigate back to the home page after successful submission
            }
        } catch (error) {
            console.log("Error response:", error.response);
        } finally {
            setLoading(false);
        }
    };

    // Display a loading spinner while the form is being submitted
    if (loading) {
        return (
            <Container className="spinner">
                <Spinner animation="border" variant="primary" />
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
                            className={`form-control ${errors.title ? "is-invalid" : ""}`}
                            placeholder="Please enter title"
                            {...register("title", {
                                required: "Title is required.",
                                minLength: {
                                    value: 3,
                                    message: "Title should be minimum 3 characters."
                                }
                            })}
                        />
                        {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                    </Col>
                    <Col xs="12" className="py-3">
                        <label>Post Content</label>
                        <textarea
                            className={`form-control ${errors.post ? "is-invalid" : ""}`}
                            placeholder="Please enter content"
                            rows="5" // Increase rows if necessary for better visibility
                            {...register("post", {
                                required: "Post Content is required."
                            })}
                        />
                        {errors.post && <div className="invalid-feedback">{errors.post.message}</div>}
                    </Col>
                    <Col xs="12" className="py-3">
                        <label>Image</label>
                        <input
                            type="file"
                            className={`form-control ${errors.image ? "is-invalid" : ""}`}
                            {...register("image")}
                        />
                    </Col>
                    <Col xs="12">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </Col>
                </Row>
            </form>
        </Container>
    );
};

export default Add;
