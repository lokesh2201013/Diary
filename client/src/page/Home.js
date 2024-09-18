import React from 'react'
import axios from 'axios'
import { useEffect, useState } from "react";
import {Col,Container,Row} from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
const Home = () => {
    const [apiData,setApiData]=useState(false)
    const [loading,setLoading]=useState(true)
    const location=useLocation()
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
    <h5>{location.state && location.state}</h5>
      <Col xs="12" className="py-2">
      <h1 className="text-center">Diary Records</h1>
      </Col>

      <h3>
        <Link to="add" className='btn btn-primary'>Add New</Link>
      </h3>

      {apiData &&(apiData.map((record,index)=>(
        <Col key={index} xs="4" className="py-5 box">
          <div className="img-box justify-content-center py-2 mb-3">
                <img width="150" height="150" src={`${process.env.REACT_APP_API_ROOT}/${record.image}`} />
              </div>

          <div className="title">
            <Link to={`/diary/${record.id}`}>{record.title}</Link>
            </div>
            
            <div>
                <Link to={`edit/${record.id}`}>
                  <i className="fa fa-solid fa-pencil fa-2x" />
                </Link>
                &nbsp;
                <Link to={`delete/${record.id}`}>
                  <i className="fa fa-solid fa-trash fa-2x" />
                </Link>
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