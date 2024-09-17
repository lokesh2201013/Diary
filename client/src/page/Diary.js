import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from "react";
import { Col, Container, Row } from 'react-bootstrap';

const Diary = () => {
  const params=useParams()
  const[apiData,setApiData]=useState(false)
  useEffect(() => {
    const fetchData=async()=>{
      
      try{
        const apiUrl=process.env.REACT_APP_API+"/"+params.id
      const response=await axios.get(apiUrl)
      if (response.status===200){
          setApiData(response?.data?.record)
        }
       
      }catch(error){
        console.log(error.response)
      }
    };
  fetchData();
    return () => {
     
    }
  }, [])
  console.log(apiData)
  return (
    <Container>
      <Row>
        <Col xs="12"><h1>{apiData.title}</h1></Col>
        <Col xs="12"><p>{apiData.post}</p></Col>
      </Row>
    </Container>
  )
}

export default Diary