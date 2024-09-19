import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Row, Spinner, Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API;
                const response = await axios.get(apiUrl);
                if (response.status === 200) {
                    setApiData(response?.data?.diary_records || []);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error.response);
            }
        };
        fetchData();
    }, []);

    const handleDeleteClick = (record) => {
        setRecordToDelete(record);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        if (recordToDelete) {
            try {
                const apiUrl = process.env.REACT_APP_API + "/" + recordToDelete.id;
                const response = await axios.delete(apiUrl);

                if (response.status === 200) {
                    setApiData(apiData.filter(record => record.id !== recordToDelete.id));
                }
            } catch (error) {
                console.log(error.response);
            }
            setShowModal(false);
        }
    };

    // Inline styles
    const styles = {
        container: {
            padding: '20px',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh',
        },
        header: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '2.5rem',
            marginBottom: '20px',
            color: '#333'
        },
        addButton: {
            display: 'block',
            margin: '0 auto 20px auto',
            backgroundColor: '#007bff',
            borderColor: '#007bff',
            borderRadius: '50px',
            padding: '10px 20px',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            textDecoration: 'none',
            color: '#fff',
            textAlign: 'center',
        },
        addButtonHover: {
            backgroundColor: '#0056b3',
            transform: 'scale(1.05)',
        },
        card: {
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            transformStyle: 'preserve-3d',
        },
        cardHover: {
            transform: 'scale(1.05) rotateY(5deg)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
        },
        cardTitle: {
            fontWeight: 'bold',
            color: '#444'
        },
        cardText: {
            color: '#555',
            fontSize: '1rem',
            marginBottom: '15px',
        },
        footer: {
            backgroundColor: '#f1f1f1',
            borderTop: '1px solid #ddd',
            padding: '10px',
            textAlign: 'center',
        },
        button: {
            margin: '0 5px',
            transition: 'background-color 0.3s ease',
        },
        modalBody: {
            fontSize: '1.2rem',
            textAlign: 'center',
            color: '#555'
        },
        spinnerContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }
    };

    if (loading) {
        return (
            <Container style={styles.spinnerContainer}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container style={styles.container}>
            <Row>
                <Col xs="12" className="py-2">
                    <h1 style={styles.header}>Diary Records</h1>
                    <Link
                        to="add"
                        style={styles.addButton}
                        className='btn btn-primary mb-3'
                        onMouseEnter={(e) => e.currentTarget.style = {...styles.addButton, ...styles.addButtonHover}}
                        onMouseLeave={(e) => e.currentTarget.style = styles.addButton}
                    >
                        Add New
                    </Link>
                    {apiData.map((record) => (
                        <Col
                            key={record.id}
                            xs="12"
                            sm="6"
                            md="4"
                            className="mb-4"
                            onMouseEnter={(e) => e.currentTarget.children[0].style = {...styles.card, ...styles.cardHover}}
                            onMouseLeave={(e) => e.currentTarget.children[0].style = styles.card}
                        >
                            <Card style={styles.card}>
                                <Card.Img variant="top" src={`${process.env.REACT_APP_API}/${record.image}`} />
                                <Card.Body>
                                    <Card.Title style={styles.cardTitle}>{record.title || 'Untitled'}</Card.Title>
                                    <Card.Text style={styles.cardText}>{record.post}</Card.Text>
                                    <Card.Footer style={styles.footer}>
                                        {record.day}/{record.month}/{record.year}
                                        <div className="d-flex justify-content-between mt-2">
                                            <Link to={`/diary/${record.id}`} className='btn btn-info btn-sm' style={styles.button}>View</Link>
                                            <Link to={`edit/${record.id}`} className='btn btn-warning btn-sm' style={styles.button}>Edit</Link>
                                            <Button
                                                variant="danger"
                                                className='btn btn-danger btn-sm'
                                                style={styles.button}
                                                onClick={() => handleDeleteClick(record)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Col>
            </Row>

            {/* Delete Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body style={styles.modalBody}>Are you sure you want to delete this record?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Home;
