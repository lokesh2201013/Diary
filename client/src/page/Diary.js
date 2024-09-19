import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Diary = () => {
  const params = useParams();
  const [apiData, setApiData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API}/${params.id}`;
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          setApiData(response?.data?.record);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [params.id]);

  // Inline styles
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginTop: '20px'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333',
      textAlign: 'center'
    },
    post: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      marginBottom: '20px',
      color: '#555',
      textAlign: 'justify'
    },
    date: {
      fontSize: '0.9rem',
      color: '#888',
      textAlign: 'center'
    }
  };

  return (
    <Container style={styles.container}>
      <Row>
        <Col xs="12">
          <h1 style={styles.title}>{apiData.title}</h1>
        </Col>
        <Col xs="12">
          <p style={styles.post}>{apiData.post}</p>
        </Col>
        <Col xs="12">
          <p style={styles.date}>{apiData.date}/{apiData.month}/{apiData.year}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Diary;
