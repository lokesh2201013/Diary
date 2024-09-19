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


function App() {
 
  return (
    <>
    <Header/>
    <Routes>
    <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="/diary/:id" element={<Diary />} />

        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
    </Routes> 
    <Footer/>
    </>  
  );
}

export default App;
