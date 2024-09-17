import React from 'react'
import axios from 'axios'
import { useEffect, useState } from "react";
import {Col,Container,Row} from "react-bootstrap";
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
const Home = () => {
    const [apiData,setApiData]=useState(false)
    const [loading,setLoading]=useState(true)
    useEffect(() => {
      const fetchData=async()=>{
        
        try{
          const apiUrl=process.env.REACT_APP_API
        const response=await axios.get(apiUrl)
        if (response.status===200){
            setApiData(response?.data?.diary_records)
          }
         setLoading(false)
        }catch(error){
          setLoading(false)
          console.log(error.response)
        }
      };
    fetchData();
      return () => {
       
      }
    }, [])
    console.log(apiData)
    if(loading){
      return(
        <>
        <Container className='spinner'>
        <Spinner animation="grow"/>
        </Container></>
      )
    }
  return (
    <Container>
    <Row>
      <h3>
        <Link to="add" className='btn btn-primary'>Add New</Link>
      </h3>
      <Col xs="12" className="py-2">
      <h1 className="text-center">Diary Records</h1>
      </Col>
      {apiData &&(apiData.map((record,index)=>(
        <Col key={index} xs="4" className="py-5 box">
          <div className="title">
            <Link to={`/diary/${record.id}`}>{record.title}</Link>
            </div>
          <div>{record.post}</div>
          <div>{record.day}/{record.month}/{record.year}</div>
        </Col>
      )))}
    </Row>
  </Container>
  )
}

export default Home