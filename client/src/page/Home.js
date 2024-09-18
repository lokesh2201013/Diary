import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Row, Spinner, Card, Button, Modal } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const location = useLocation();

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

    if (loading) {
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container>
            <Row>
                <Col xs="12" className="py-2">
                    <h1 style={{ textAlign: 'center' }}>Diary Records</h1>
                    <Link to="add" className='btn btn-primary mb-3'>Add New</Link>
                    {apiData.map((record) => (
                        <Col key={record.id} xs="12" sm="6" md="4" className="mb-4">
                            <Card className="shadow-sm card-transition">
                                <Card.Img variant="top" src={`${process.env.REACT_APP_API_ROOT}/${record.image}`} />
                                <Card.Body>
                                    <Card.Title>{record.title || 'Untitled'}</Card.Title>
                                    <Card.Text>{record.post}</Card.Text>
                                    <Card.Footer className="text-muted">
                                        {record.day}/{record.month}/{record.year}
                                        <div className="d-flex justify-content-between mt-2">
                                            <Link to={`/diary/${record.id}`} className='btn btn-info btn-sm'>View</Link>
                                            <Link to={`edit/${record.id}`} className='btn btn-warning btn-sm'>Edit</Link>
                                            <Button variant="danger" className='btn btn-danger btn-sm' onClick={() => handleDeleteClick(record)}>Delete</Button>
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
                <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
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
