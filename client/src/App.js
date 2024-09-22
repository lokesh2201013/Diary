import { Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import Diary from './page/Diary';
import About from './page/About';
import Contact from './page/Contact';
import Add from "./page/Add"
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Delete from './page/Delete';
import Edit from './page/Edit';
import Login from './page/Login';
import Logout from './page/Logout';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
 
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const timestamp = 1000 * 60 * 3 - 5;
    // const timestamp = 10000;

    let interval = setInterval(() => {
      if (token !== null) {
        updateToken();
      }
    }, timestamp);

    return () => {
      clearInterval(interval);
    };
  }, [token]);

  const updateToken = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_AUTH_API}/private/refreshtoken`;

      const response = await axios.get(apiUrl, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        const data = await response.data;

        window.localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.log(error);

      window.localStorage.removeItem("token");
    }

    console.log("Inside update token");
  };
  return (
    <>
    <Header/>
    <Routes>
    <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="/diary/:id" element={<Diary />} />
      {/*  <Route path='/logout' element={<Logout/>}/>*/}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
    </Routes> 
    <Footer/>
    </>  
  );
}

export default App;
